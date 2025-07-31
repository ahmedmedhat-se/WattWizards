const { createConnection } = require("mysql2");
const { createHash, timingSafeEqual, randomBytes } = require("crypto");
const jwt = require("jsonwebtoken");
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

module.exports.MainMiddleware = (req, res, next) => {
  try {
    if (req.cookies?.token) {
      const user = verifyToken(req.cookies.token);
      // return console.log(verifyToken(req.cookies.token), req.cookies.token);
      if (user) {
        connection.query(
          "SELECT * FROM users1 WHERE email = ?",
          [user.email],
          (err, result) => {
            if (err) {
              console.log("Database query error:", err.message);
              return res.status(500).send({ message: "Internal server error" });
            }
            if (result.length >= 1) {
              if (
                timingSafeEqual(
                  Buffer.from(result[0].password),
                  Buffer.from(user.password)
                )
              ) {
                req.user = user;
                return next();
              } else {
                console.log("w-00");
                return res
                  .status(401)
                  .send({ message: "password didn't match" });
              }
            } else {
              console.log("w-0");
              return res
                .status(401)
                .send({ message: "User not found or unauthorized" });
            }
          }
        );
      } else {
        console.log("w1");
        // return next();
      }
    } else {
      console.log("w2");
      // return next();
    }
  } catch (err) {
    console.log("Error verifying token:", err.message);
    return res.status(401).send({ message: "Unauthorized" });
  }
};
