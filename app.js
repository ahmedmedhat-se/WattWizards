const express = require("express");
const helmet = require("helmet");
const multer = require("multer");
const { join, extname } = require("path");
const { createConnection } = require("mysql2");
const { createHash, timingSafeEqual, randomBytes } = require("crypto");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {
  login,
  signup,
  profile,
  DownloadFile,
  DeleteFile,
} = require("./userProfile");
const { MainMiddleware } = require("./middlewares");
const {
  MainSheetCalculation,
  OnlineSheetCalculation,
} = require("./CalculateSheets");
const { CircuitVaultArchive } = require("./CircuitVaultArchive");
const {
  mainProjectRout,
  mainProjectRoutUpload,
  downloadProject,
  deleteProject,
} = require("./ProjectManagement");
const app = express();
require("dotenv").config();
let dotenv = process.env;
const port = dotenv.APP_PORT;

// prepare database connection
let connection = createConnection({
  host: dotenv.DB_HOST,
  database: "wattwizards_db",
  user: "root",
  password: "",
});

connection.connect((err) => {
  if (!err) {
    // connection.query(
    //   "CREATE TABLE IF NOT EXIST `token` (`id` INT NOT NULL AUTO_INCREMENT , `token` TEXT NOT NULL , `userID` INT NOT NULL , PRIMARY KEY (`id`))"
    // );
    // connection.query(
    //   "CREATE TABLE IF NOT EXIST `users1` (`id` INT NOT NULL AUTO_INCREMENT , `name` TEXT NOT NULL , `email` TEXT NOT NULL , `password` TEXT NOT NULL , PRIMARY KEY (`id`))"
    // );
    return console.log("connected to db");
  }
  console.log(err.message);
});

// set upload file save in memory until use it
const encrypt = (text) => createHash("sha256").update(text).digest("hex");

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
    return false;
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/process_files"),
  filename: (req, file, cb) => {
    req.fileName = encrypt(file.originalname) + extname(file.originalname);
    return cb(null, req.fileName);
  },
  // filename: (req, file, cb) => cb(null, file.originalname),
});

const mainUpload = multer({
  storage: storage,
});

const vaultStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/main_storage"),
  filename: (req, file, cb) => {
    req.fileName = encrypt(file.originalname) + extname(file.originalname);
    return cb(null, req.fileName);
  },
});

const VaultUpload = multer({
  storage: vaultStorage,
});

const ProjectStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/project_storage"),
  filename: (req, file, cb) => {
    req.fileName =
      encrypt(randomBytes(10).toString("hex") + file.originalname) +
      extname(file.originalname);
    return cb(null, req.fileName);
  },
});

const ProjectUpload = multer({
  storage: ProjectStorage,
});

// set security headers

app.use(express.static(__dirname + "\\public"));

app.use(helmet());

app.use(
  helmet({
    xssFilter: true,
  })
);

app.use((MReq, MRes, next) => {
  // MRes.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  MRes.header("Access-Control-Allow-Origin", "http://localhost:5173");
  MRes.header("Access-Control-Allow-Credentials", "true");
  MRes.setHeader("xss-filter", true);
  MRes.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, X-Requested-With, *"
  );
  next();
});

// parse data

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// function middle(req, res, next) {
//   if (req.cookies.user) {
//     connection.query("SELECT * FROM users", (err, res) => {
//       var user = res.find((val) => {
//         return encrypt(`${val.id}`) === req.cookies.user;
//       });
//       req.user = user;
//       console.log(req.user);
//       next();
//     });
//   } else {
//     // res.cookie("user", encrypt("2"), { maxAge: 60 * 60 * 24 * 7 * 2 });
//     next();
//   }
// }
// handle root

app.get("/", (req, res) => {
  res.send(`done`);
});

// user actions handle

app.post("/signup", multer().none(), signup);

app.post("/login", multer().none(), login);

app.get("/profile", multer().none(), MainMiddleware, profile);

app.get("/check", multer().none(), (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No authentication token found" });
    }

    const decoded = verifyToken(token);

    connection.query(
      "select * from users1 where email = ?",
      [decoded.email],
      (err, result) => {
        if (result.length >= 1) {
          if (
            timingSafeEqual(
              Buffer.from(result[0].password),
              Buffer.from(decoded.password)
            )
          ) {
            return res.status(200).send({ token: CreateToken(result[0]) });
          }
          return res.status(404).send({ message: "password didn't match" });
        }
        return res.status(404).send({ message: "user not exist" });
      }
    );
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(401).json({
      message: "Invalid token",
    });
  }
});

// products API

app.get("/products", (MReq, MRes) => {
  connection.execute("SELECT * FROM products", (err, res) => {
    return MRes.json(res);
  });
});

// handle Calculation routes

app.post(
  "/CalculateFile",
  mainUpload.single("file"),
  MainMiddleware,
  MainSheetCalculation
);

app.post(
  "/CircuitVault",
  VaultUpload.array("file"),
  MainMiddleware,
  CircuitVaultArchive
);

app.post("/CalculateOnlineSheet", multer().none(), OnlineSheetCalculation);

// handle project routes

app.post(
  "/project",
  MainMiddleware,
  ProjectUpload.array("projectFiles"),
  mainProjectRoutUpload
);

app.get("/project", MainMiddleware, multer().none(), mainProjectRout);

app.get("/delete/project/:projectID", MainMiddleware, deleteProject);

// handle download project files

app.get("/project/:projectLink", downloadProject);

// handle delete vault files

app.get("/delete/files/:fileName", MainMiddleware, DeleteFile);

// handle download vault files

app.get("/files/:fileName", MainMiddleware, DownloadFile);

//download sample files

app.get("/download/CircuitBreakerSampleFile", MainMiddleware, (MReq, MRes) => {
  MRes.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  MRes.sendFile(
    join(__dirname, "public/samples/CircuitBreakerCalculateSample.xlsx")
  );
});

app.get(
  "/download/PowerFactorCorrectionSampleFile",
  MainMiddleware,
  (MReq, MRes) => {
    MRes.download(
      join(__dirname, "public/samples/PowerFactorCorrectionSample.xlsx")
    );
  }
);

app.get(
  "/download/ElectricConsumptionSampleFile",
  MainMiddleware,
  (MReq, MRes) => {
    MRes.download(
      join(__dirname, "public/samples/ElectricConsumptionSample.xlsx")
    );
  }
);

app.get("/download/AmpereToWattSampleFile", MainMiddleware, (MReq, MRes) => {
  MRes.download(join(__dirname, "public/samples/AmpereToWattSample.xlsx"));
});

app.get("/download/HorseToAmpereSampleFile", MainMiddleware, (MReq, MRes) => {
  MRes.download(join(__dirname, "public/samples/HorseToAmpereSample.xlsx"));
});

app.get(
  "/download/VoltAmpereToWattSampleFile",
  MainMiddleware,
  (MReq, MRes) => {
    MRes.download(
      join(__dirname, "public/samples/VoltAmpereToWattSample.xlsx")
    );
  }
);

app.get("/download/WattToAmpereSampleFile", MainMiddleware, (MReq, MRes) => {
  MRes.download(join(__dirname, "public/samples/WattToAmpereSample.xlsx"));
});

// handle wrong routs

app.use((MReq, MRes) => {
  MRes.send("error wrong url request");
});

app.listen(port, () =>
  console.log(`xlsx calculating app listening on port ${port}!`)
);
