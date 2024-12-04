const express = require("express");
const { default: helmet } = require("helmet");
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
const { createHash } = require("crypto");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8086;

// prepare database connection
// let connection = createConnection({
//   database: "wattwizard",
//   user: "root",
//   password: "",
// });
// set upload file save in memory until use it
const encrypt = (text) => createHash("sha256").update(text).digest("hex");
// console.log(encrypt("lol"));

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
  MRes.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  MRes.setHeader("Access-Control-Alow-Credentials", "true");
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

function createPowerFactorCorrectionTests() {
  let currentProcess = "PowerFactorCorrection";
  let outPut = join(__dirname, "public/test-cases/", currentProcess);
  let sheet1 = [
    [
      "power",
      "powerUnit",
      "Efficiency",
      "oldPF",
      "newPF",
      "frequency",
      "Voltage",
      "phases",
      "active power",
      "apparent power",
      "reactive power",
      "capacitor size",
    ],
  ];

  for (let rowNumber = 0; rowNumber < 100; rowNumber++) {
    let data = {
      power: (Math.random() * 100).toFixed(),
      Efficiency: 1,
      powerUnit: (Math.random() * 100).toFixed() % 2 == 0 ? "KW" : "A",
      Voltage: 220,
      phases:
        (Math.random() * 100).toFixed() % 2 == 0 ? "one phase" : "three phases",
      newPF: (Math.random() * 10).toFixed(1),
      oldPF: (Math.random() * 10).toFixed(1),
      frequency: (Math.random() * 100).toFixed(),
    };

    powerFactorCorrectionFunction(
      data,
      (activePower, apparentPower, reactivePower, microCapacitor) => {
        data["active power"] = activePower;
        data["apparent power"] = apparentPower;
        data["reactive power"] = reactivePower;
        data["capacitor size"] = microCapacitor;
      }
    );

    sheet1.push([
      data["power"],
      data["powerUnit"],
      data["Efficiency"],
      data["oldPF"],
      data["newPF"],
      data["frequency"],
      data["Voltage"],
      data["phases"],
      data["active power"],
      data["apparent power"],
      data["reactive power"],
      data["capacitor size"],
    ]);
  }
  var worksheet = XLSX.utils.aoa_to_sheet(sheet1);
  var workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, `sheet1`);
  XLSX.writeFile(workbook, outPut + ".xlsx");
  console.log("file created");
}

//createPowerFactorCorrectionTests();

// handle root

app.get("/", (req, res) => {
  res.send(`done`);
});

// handle Circuit Breaker Calculation

app.post("/CalculateFile", mainUpload.single("file"), (MReq, MRes) => {
  // return console.log(MReq.file.originalname);
  if (!MReq.file) {
    return MRes.status(400).send("error no file uploaded");
  }

  // set file name that will be used across all the process
  let fileName = "results_" + MReq.file.originalname;
  // let fileName = "results_" + ".xlsx";

  // set file path and read it
  const filePath = join(__dirname, "public/process_files", MReq.fileName);
  // const filePath = join(
  //   __dirname,
  //   "public/process_files/CircuitBreakerCalculateSample.xlsx"
  // );
  // return console.log(encrypt("ty"));
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
  const outputFilePath = join(__dirname, "public/result_files", `${fileName}`);
  XLSX.writeFile(newWorkbook, outputFilePath);
  MRes.download(outputFilePath, (err) => {
    if (err) {
      console.error("Error sending the file: ", err);
    }
    unlinkSync(filePath);
    // unlinkSync(outputFilePath);
  });
});

app.get("/download/CircuitBreakerSampleFile", (MReq, MRes) => {
  MRes.download(
    join(__dirname, "public/samples/CircuitBreakerCalculateSample.xlsx")
  );
});

app.get("/download/PowerFactorCorrectionSampleFile", (MReq, MRes) => {
  MRes.download(
    join(__dirname, "public/samples/PowerFactorCorrectionSample.xlsx")
  );
});

app.get("/download/ElectricConsumptionSampleFile", (MReq, MRes) => {
  MRes.download(
    join(__dirname, "public/samples/ElectricConsumptionSample.xlsx")
  );
});

app.get("/download/AmpereToWattSampleFile", (MReq, MRes) => {
  MRes.download(join(__dirname, "public/samples/AmpereToWattSample.xlsx"));
});

app.get("/download/HorseToAmpereSampleFile", (MReq, MRes) => {
  MRes.download(join(__dirname, "public/samples/HorseToAmpereSample.xlsx"));
});

app.get("/download/VoltAmpereToWattSampleFile", (MReq, MRes) => {
  MRes.download(join(__dirname, "public/samples/VoltAmpereToWattSample.xlsx"));
});

app.get("/download/WattToAmpereSampleFile", (MReq, MRes) => {
  MRes.download(join(__dirname, "public/samples/WattToAmpereSample.xlsx"));
});

// handle wrong routs

app.use((MReq, MRes) => {
  MRes.send("error wrong url request");
});

app.listen(port, () =>
  console.log(`xlsx calculating app listening on port ${port}!`)
);
