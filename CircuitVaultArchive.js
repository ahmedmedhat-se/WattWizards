const { createConnection } = require("mysql2");
require("dotenv").config();
let dotenv = process.env;

let connection = createConnection({
  host: dotenv.DB_HOST,
  database: "test",
  user: "root",
  password: "",
});

module.exports.CircuitVaultArchive = async (MReq, MRes) => {
  if (!MReq.files) {
    return MRes.status(400).send("error no file uploaded");
  }
  console.log(MReq.files);

  MReq.files.forEach((file, index) => {
    connection.query(
      "insert into vaul values (null , ? , ? , ?)",
      [file.filename, file.originalname, MReq.user.id],
      (err, res) => {
        if (err) {
          console.log(err);
          return MRes.status(501).send();
        }
        console.log(index, file.filename, "uploaded");
        return MRes.status(200).send();
      }
    );
  });
};
