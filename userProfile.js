const { createConnection } = require("mysql2/promise");
const { createHash, timingSafeEqual, randomBytes } = require("crypto");
const jwt = require("jsonwebtoken");
const { join } = require("path");
const { unlink } = require("fs/promises");
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
  database: "wattwizards_db",
  user: "root",
  password: "",
});

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  let [user] = await (
    await connection
  ).execute("select * from users1 where email = ?", [email]);
  if (user.length >= 1) {
    if (
      timingSafeEqual(
        Buffer.from(user[0].password),
        Buffer.from(encrypt(password))
      )
    ) {
      let newToken = CreateToken({
        password: user[0].password,
        email: user[0].email,
        id: user[0].id,
      });

      let [token] = await (
        await connection
      ).execute("select * from token where userID = ?", [user[0].id]);

      if (token.length >= 1) {
        await (
          await connection
        ).execute(`UPDATE token SET token = ? WHERE id =  ?`, [
          newToken,
          token[0].id,
        ]);

        return res.status(200).send({ token: newToken });
      } else {
        await (
          await connection
        ).execute("INSERT INTO token VALUES (NULL, ?, ?)", [
          newToken,
          user[0].id,
        ]);

        return res.status(200).send({ token: newToken });
      }
    } else {
      return res.status(404).send({ message: "password didn't match" });
    }
  } else {
    return res.status(404).send({ message: "user not exist" });
  }
};

module.exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format!" });
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters!" });
    }

    let [checkUser] = await (
      await connection
    ).execute("select * from users1 where email = ?", [email]);

    if (checkUser.length >= 1) {
      return res.status(409).json({ message: "User already exists!" });
    }

    let hashedPassword = encrypt(password);

    let [user] = await (
      await connection
    ).execute("INSERT INTO users1 VALUES (null , ?, ?)", [
      email,
      hashedPassword,
    ]);

    let newToken = CreateToken({
      password: hashedPassword,
      email: email,
      id: user.insertId,
    });

    await (
      await connection
    ).execute("INSERT INTO token VALUES (null , ?, ?)", [
      newToken,
      user.insertId,
    ]);

    res.status(200).json({
      message: "User created successfully!",
      token: newToken,
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.profile = async (req, res) => {
  let newToken = CreateToken({
    password: req.user.password,
    email: req.user.email,
    id: req.user.id,
  });

  let [result2] = await (
    await connection
  ).execute("select * from token where userID = ?", [req.user.id]);

  if (result2.length >= 1) {
    let [files] = await (
      await connection
    ).execute("SELECT realFileName FROM vaul WHERE userID = ?", [
      result2[0].userID,
    ]);

    files = files.map((fileName) => {
      return {
        name: fileName.realFileName,
      };
    });

    await (
      await connection
    ).execute(`UPDATE token SET token = ? WHERE id =  ?`, [
      newToken,
      req.user.id,
    ]);

    return res
      .status(200)
      .send({ token: newToken, email: req.user.email, files });
  } else {
    await (
      await connection
    ).execute("INSERT INTO token VALUES (NULL, ?, ?)", [newToken, req.user.id]);

    return res
      .status(200)
      .send({ token: newToken, email: req.user.email, files });
  }
};

module.exports.DownloadFile = async (MReq, MRes) => {
  let [file] = await (
    await connection
  ).execute("SELECT * FROM vaul WHERE userID = ? AND realFileName = ?", [
    MReq.user.id,
    MReq.params.fileName,
  ]);

  if (file.length == 0) {
    MRes.status(404);
  }
  MRes.download(
    join(__dirname, `public/main_storage/${file[0].fileName}`),
    file[0].realFileName
  );
};

module.exports.DeleteFile = async (MReq, MRes) => {
  let [file] = await (
    await connection
  ).execute("SELECT * FROM vaul WHERE userID = ? AND realFileName = ?", [
    MReq.user.id,
    MReq.params.fileName,
  ]);

  if (file.length == 0) {
    return MRes.status(404).send();
  }

  await (
    await connection
  ).execute("delete FROM vaul WHERE userID = ? AND realFileName = ?", [
    MReq.user.id,
    MReq.params.fileName,
  ]);

  unlink(join(__dirname, `public/main_storage/${file[0].fileName}`));

  console.log(file[0].realFileName, "deleted");

  MRes.status(200).send();
};
