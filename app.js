const express = require("express");
const helmet = require("helmet");
const multer = require("multer");
const { unlinkSync } = require("fs");
const { join, extname } = require("path");
const XLSX = require("xlsx");
const { createConnection } = require("mysql2");
const { CircuitBreakerFunction } = require("./CircuitBreakerApp");
const { powerFactorCorrectionFunction } = require("./powerFactorCorrection");
const { electricConsumptionFunction } = require("./electricConsumption");
const { HorseToAmpereConversionFunction } = require("./HorseToAmpere");
const { AmpereToWattFunction } = require("./AmpereToWatt");
const { WattToAmpereFunction } = require("./WattToAmpere");
const { VoltAmpereToWattFunction } = require("./VoltAmpereToWatt");
const { createHash, timingSafeEqual } = require("crypto");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
const port = 8086;
require("dotenv").config();
let dotenv = process.env;

// prepare database connection
let connection = createConnection({
  host: dotenv.DB_HOST,
  database: "test",
  user: "root",
  password: "",
});

// connection.connect((err) => {
//   if (!err) {
//     connection.query(
//       "CREATE TABLE IF NOT EXIST `token` (`id` INT NOT NULL AUTO_INCREMENT , `token` TEXT NOT NULL , `userID` INT NOT NULL , PRIMARY KEY (`id`))"
//     );
//     connection.query(
//       "CREATE TABLE IF NOT EXIST `users1` (`id` INT NOT NULL AUTO_INCREMENT , `name` TEXT NOT NULL , `email` TEXT NOT NULL , `password` TEXT NOT NULL , PRIMARY KEY (`id`))"
//     );
//     return console.log("connected to db");
//   }
//   console.error(err.message);
// });

// set upload file save in memory until use it
const encrypt = (text) => createHash("sha256").update(text).digest("hex");

const CreateToken = (data) => {
  return jwt.sign(data, dotenv.JWT_SECRET, { expiresIn: "1d" });
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
  MRes.setHeader("Access-Control-Allow-Headers", "*");
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

const MainMiddleware = (req, res, next) => {
  try {
    if (req.cookies && req.cookies.token) {
      const user = verifyToken(req.cookies.token);
      if (user) {
        connection.query(
          "SELECT * FROM users1 WHERE email = ? AND password = ?",
          [user.email, user.password],
          (err, result) => {
            if (err) {
              console.error("Database query error:", err.message);
              return res.status(500).send({ message: "Internal server error" });
            }
            if (result.length >= 1) {
              req.user = user;
              return next();
            } else {
              return res
                .status(401)
                .send({ message: "User not found or unauthorized" });
            }
          }
        );
      } else {
        return res.status(401).send({ message: "Invalid token" });
      }
    } else {
      return res.status(401).send({ message: "No token provided" });
    }
  } catch (err) {
    console.error("Error verifying token:", err.message);
    return res.status(401).send({ message: "Unauthorized" });
  }
};

// handle root

app.get("/", (req, res) => {
  res.send(`done`);
});

// user actions handle

app.post("/signup", multer().none(), MainMiddleware, (req, res) => {
  try {
    const { email, password } = req.body;

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format!" });
    }

    // Password Validation
    if (!password || typeof password !== "string" || password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters!" });
    }

    // Check if the user already exists
    connection.query(
      "select * from users1 where email = ?",
      [email],
      (err, result) => {
        if (result.length >= 1) {
          return res.status(409).json({ message: "User already exists!" });
        }

        let hashedPassword = encrypt(password);

        connection.query(
          "INSERT INTO users1 VALUES (null , ?, ?)",
          [email, hashedPassword],
          (err, result2) => {
            let token = CreateToken({ email, password });
            connection.query(
              "INSERT INTO token VALUES (null , ?, ?)",
              [token, result2.insertId],
              (err, result3) => {
                res.status(200).json({
                  message: "User created successfully!",
                  token: token,
                });
              }
            );
          }
        );
      }
    );
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", multer().none(), MainMiddleware, (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "select * from users1 where email = ?",
    [email],
    (err, result) => {
      if (result.length >= 1) {
        if (
          timingSafeEqual(
            Buffer.from(result[0].password),
            Buffer.from(encrypt(password))
          )
        ) {
          return res.status(200).send({ token: CreateToken(result[0]) });
        }
        return res.status(404).send({ message: "password didn't match" });
      }
      return res.status(404).send({ message: "user not exist" });
    }
  );
});

// handle Circuit Breaker Calculation

app.post(
  "/CalculateFile",
  mainUpload.single("file"),
  MainMiddleware,
  (MReq, MRes) => {
    // return console.log(MReq.file.originalname);
    if (!MReq.file) {
      return MRes.status(400).send("error no file uploaded");
    }

    // set file name that will be used across all the process
    let fileName = "results_" + MReq.file.originalname;

    // set file path and read it
    const filePath = join(__dirname, "public/process_files", MReq.fileName);
    const workbook = XLSX.readFile(filePath);

    // loop for sheets
    const workSheets = {};
    workbook.SheetNames.forEach((sheet) => {
      let worksheet = workbook.Sheets[sheet];

      // get data from the sheets
      let data = XLSX.utils.sheet_to_json(worksheet);

      let processedData = data.map((row) => {
        if (MReq.body.type == "CircuitBreaker") {
          CircuitBreakerFunction(
            row,
            (result, circuitBreaker, cableThickness) => {
              row["Current Intensity"] = result;
              row["circuit breaker"] = circuitBreaker;
              row["cable thickness"] = cableThickness;
            }
          );
        } else if (MReq.body.type == "PowerFactorCorrection") {
          powerFactorCorrectionFunction(
            row,
            (activePower, apparentPower, reactivePower, microCapacitor) => {
              row["active power"] = activePower;
              row["apparent power"] = apparentPower;
              row["reactive power"] = reactivePower;
              row["capacitor size"] = microCapacitor;
            }
          );
        } else if (MReq.body.type == "ElectricConsumption") {
          electricConsumptionFunction(row, (power, KWperD, KWperM) => {
            row["power"] = power;
            row["KW per day"] = KWperD;
            row["KW per month"] = KWperM;
          });
        } else if (MReq.body.type == "HorseToAmpere") {
          HorseToAmpereConversionFunction(row, (result) => {
            row["result"] = result;
          });
        } else if (MReq.body.type == "AmpereToWatt") {
          AmpereToWattFunction(row, (KW) => {
            row["result in KW"] = KW;
          });
        } else if (MReq.body.type == "WattToAmpere") {
          WattToAmpereFunction(row, (Ampere) => {
            row["ampere"] = Ampere;
          });
        } else if (MReq.body.type == "VoltAmpereToWatt") {
          VoltAmpereToWattFunction(row, (watt) => {
            row["Watt"] = watt;
          });
        }
        return row;
      });

      workSheets[sheet] = data;
      console.log(`${sheet}: `, workSheets[sheet], "\n");
    });

    const newWorkbook = XLSX.utils.book_new();

    workbook.SheetNames.forEach((sheet) => {
      var newWorksheet = XLSX.utils.json_to_sheet(workSheets[sheet]);
      XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, sheet);
    });

    // MRes.setHeader(
    //   "Content-Type",
    //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    // );
    const outputFilePath = join(
      __dirname,
      "public/result_files",
      `${fileName}`
    );
    XLSX.writeFile(newWorkbook, outputFilePath);
    MRes.download(outputFilePath, (err) => {
      if (err) {
        console.error("Error sending the file: ", err);
      }
      unlinkSync(filePath);
      // unlinkSync(outputFilePath);
    });
  }
);

app.get("/download/CircuitBreakerSampleFile", MainMiddleware, (MReq, MRes) => {
  MRes.download(
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
