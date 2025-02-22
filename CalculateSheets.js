const XLSX = require("xlsx");
const { join } = require("path");
const { unlinkSync, writeFile } = require("fs");
const { CircuitBreakerFunction } = require("./CircuitBreakerApp");
const { powerFactorCorrectionFunction } = require("./powerFactorCorrection");
const { electricConsumptionFunction } = require("./electricConsumption");
const { HorseToAmpereConversionFunction } = require("./HorseToAmpere");
const { AmpereToWattFunction } = require("./AmpereToWatt");
const { WattToAmpereFunction } = require("./WattToAmpere");
const { VoltAmpereToWattFunction } = require("./VoltAmpereToWatt");

const runMigration = (theArray, type) => {
  let array2 = theArray.slice();
  array2.map((row) => {
    if (type == "CircuitBreaker") {
      CircuitBreakerFunction(row, (result, circuitBreaker, cableThickness) => {
        row["Current Intensity"] = result;
        row["circuit breaker"] = circuitBreaker;
        row["cable thickness"] = cableThickness;
      });
    } else if (type == "PowerFactorCorrection") {
      powerFactorCorrectionFunction(
        row,
        (activePower, apparentPower, reactivePower, microCapacitor) => {
          row["active power"] = activePower;
          row["apparent power"] = apparentPower;
          row["reactive power"] = reactivePower;
          row["capacitor size"] = microCapacitor;
        }
      );
    } else if (type == "ElectricConsumption") {
      electricConsumptionFunction(row, (power, KWperD, KWperM) => {
        row["power"] = power;
        row["KW per day"] = KWperD;
        row["KW per month"] = KWperM;
      });
    } else if (type == "HorseToAmpere") {
      HorseToAmpereConversionFunction(row, (result) => {
        row["result"] = result;
      });
    } else if (type == "AmpereToWatt") {
      AmpereToWattFunction(row, (KW) => {
        row["result in KW"] = KW;
      });
    } else if (type == "WattToAmpere") {
      WattToAmpereFunction(row, (Ampere) => {
        row["ampere"] = Ampere;
      });
    } else if (type == "VoltAmpereToWatt") {
      VoltAmpereToWattFunction(row, (watt) => {
        row["Watt"] = watt;
      });
    }
    return row;
  });
  return array2;
};

module.exports.MainSheetCalculation = (MReq, MRes) => {
  if (!MReq.file) {
    return MRes.status(400).send("error no file uploaded");
  }

  let fileName = "results_" + MReq.file.originalname;

  const filePath = join(__dirname, "public/process_files", MReq.fileName);
  const workbook = XLSX.readFile(filePath);

  const workSheets = {};
  workbook.SheetNames.forEach((sheet) => {
    let worksheet = workbook.Sheets[sheet];

    let data = XLSX.utils.sheet_to_json(worksheet);

    let processedData = runMigration(data, MReq.body.type);

    workSheets[sheet] = processedData;
    console.log(`${sheet}: `, workSheets[sheet], "\n");
  });

  const newWorkbook = XLSX.utils.book_new();

  workbook.SheetNames.forEach((sheet) => {
    var newWorksheet = XLSX.utils.json_to_sheet(workSheets[sheet]);
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, sheet);
  });

  MRes.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  const outputFilePath = join(__dirname, "public/result_files", `${fileName}`);
  XLSX.writeFile(newWorkbook, outputFilePath);
  MRes.sendFile(outputFilePath, (err) => {
    if (err) {
      console.log("Error sending the file: ", err);
    }
    unlinkSync(filePath);
    // unlinkSync(outputFilePath);
  });
};

module.exports.OnlineSheetCalculation = async (MReq, MRes) => {
  try {
    const SheetJsonData = JSON.parse(MReq.body.data);

    let processedData = runMigration(SheetJsonData, MReq.body.type);

    let fileName = "results_" + MReq.body.type + "_online" + ".xlsx";

    const worksheet = XLSX.utils.json_to_sheet(processedData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "sheet1");

    let data = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    const outputFilePath = join(
      __dirname,
      "public/result_files",
      `${fileName}`
    );

    await writeFile(outputFilePath, data, (err) => {
      if (err) {
        console.log("Error sending the file: ", err);
      }
    });

    // MRes.setHeader(
    //   "Content-Type",
    //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    // );

    MRes.sendFile(outputFilePath, async (err) => {
      if (err) {
        console.log("Error sending the file: ", err);
      }
    });
  } catch (e) {
    console.log(e);

    MRes.status(404).send();
  }
};
