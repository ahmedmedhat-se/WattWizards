const { createConnection } = require("mysql2/promise");
const { createHash, timingSafeEqual, randomBytes } = require("crypto");
const jwt = require("jsonwebtoken");
const { join } = require("path");
const archiver = require("archiver");
const { unlink } = require("fs/promises");
const { createWriteStream } = require("fs");
const encrypt = (text) => createHash("sha256").update(text).digest("hex");
require("dotenv").config();

const CreateToken = (data) => {
  return jwt.sign(
    { randomness: randomBytes(10).toString("hex"), ...data },
    dotenv.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, dotenv.JWT_SECRET);
  } catch (error) {
    console.log(error);
    return false;
  }
};

let dotenv = process.env;
let connection = createConnection({
  host: dotenv.DB_HOST,
  database: "test",
  user: "root",
  password: "",
});

module.exports.mainProjectRout = async (MReq, MRes) => {
  let [projects] = await (
    await connection
  ).execute("SELECT name , id , projectLink FROM projects WHERE userID = ?", [
    MReq.user.id,
  ]);

  projects = await projects.map((project) => {
    return {
      ...project,
      projectLink: `${dotenv.APP_HOST}:${dotenv.APP_PORT}/project/${project.projectLink}`,
    };
  });

  MRes.json(projects);
};

module.exports.mainProjectRoutUpload = async (MReq, MRes) => {
  if (!MReq.files) {
    return MRes.status(400).send("error no file uploaded");
  }
  //   console.log(MReq.files, MReq.body, MReq.user);

  let projectLink = randomBytes(10).toString("hex");

  let [project] = await (
    await connection
  ).execute("INSERT INTO projects VALUES(NULL , ? , ? , ?)", [
    MReq.body.projectName,
    MReq.user.id,
    projectLink,
  ]);

  for (const file of MReq.files) {
    await (
      await connection
    ).query(
      "insert into projects_files values (null , ? , ? , ?)",
      [file.filename, file.originalname, project.insertId],
      (err, res) => {
        if (err) {
          console.log(err);
          return MRes.status(501);
        }
        console.log(index, file.filename, "uploaded");
      }
    );
  }

  MRes.json({
    projectLink: `${dotenv.APP_HOST}:${dotenv.APP_PORT}/project/${projectLink}`,
    id: project.insertId,
    name: MReq.body.projectName,
  });
};

module.exports.deleteProject = async (MReq, MRes) => {
  await (
    await connection
  ).execute("DELETE FROM projects WHERE id = ? AND userID = ?", [
    MReq.params.projectID,
    MReq.user.id,
  ]);

  let [files] = await (
    await connection
  ).execute("SELECT * FROM projects_files WHERE projectID = ? ", [
    MReq.params.projectID,
  ]);

  for (const file of files) {
    await (
      await connection
    ).execute("DELETE FROM projects_files WHERE projectID = ? ", [
      MReq.params.projectID,
    ]);
    await unlink(join(__dirname, `public/project_storage/${file.fileName}`));
  }

  MRes.status(200);
};

module.exports.downloadProject = async (MReq, MRes) => {
  let [projectID] = await (
    await connection
  ).execute("SELECT id , name FROM projects WHERE projectLink = ? ", [
    MReq.params.projectLink,
  ]);

  let [files] = await (
    await connection
  ).execute("SELECT * FROM projects_files WHERE projectID = ? ", [
    projectID[0].id,
  ]);

  let filesToZip = files.map((file) => {
    return {
      path: join(__dirname, `public/project_storage/${file.fileName}`),
      name: file.realFileName,
    };
  });

  const zipFilePath = join(
    __dirname,
    `public/project_storage/zip/${projectID[0].name}.zip`
  );

  const outputZip = createWriteStream(zipFilePath);

  console.log(filesToZip);

  const archive = archiver("zip", { zlib: { level: 9 } });

  MRes.attachment(`${projectID[0].name}.zip`);
  archive.pipe(MRes);
  archive.pipe(outputZip);

  filesToZip.forEach((file) => {
    console.log(file.name, file.path);

    archive.file(file.path, { name: file.name });
  });

  await archive.finalize();

  //   MRes.download();
};
