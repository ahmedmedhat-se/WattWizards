const XLSX = require("xlsx");
const PDF = require("pdfkit-table");
const { join } = require("path");
const { CircuitBreakerFunction } = require("./CircuitBreakerApp");
const { powerFactorCorrectionFunction } = require("./powerFactorCorrection");
const { electricConsumptionFunction } = require("./electricConsumption");
const { HorseToAmpereConversionFunction } = require("./HorseToAmpere");
const { AmpereToWattFunction } = require("./AmpereToWatt");
const { WattToAmpereFunction } = require("./WattToAmpere");
const { VoltAmpereToWattFunction } = require("./VoltAmpereToWatt");
const { createWriteStream, unlink } = require("fs");

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

module.exports.MainSheetCalculation = async (MReq, MRes) => {
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
    MReq.body["file-type"] == "pdf"
      ? "application/pdf"
      : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  const outputFilePath = join(__dirname, "public/result_files", `${fileName}`);
  XLSX.writeFile(newWorkbook, outputFilePath);

  if (MReq.body["file-type"] == "pdf") {
    function addSheetToPdf(sheetData, sheetName, pdfDoc) {
      pdfDoc.fontSize(16).text(`Sheet: ${sheetName}`, { align: "left" });
      pdfDoc.moveDown();

      if (!sheetData || sheetData.length === 0) {
        pdfDoc
          .fontSize(12)
          .text("No data found in this sheet.", { align: "left" });
        pdfDoc.moveDown();
        return;
      }

      const keyCounts = sheetData.map((obj) => Object.keys(obj).length);

      const maxKeys = Math.max(...keyCounts);

      const allKeys = [
        ...new Set(sheetData.flatMap((obj) => Object.keys(obj))),
      ];

      const correctOrder = [];
      sheetData.forEach((obj) => {
        Object.keys(obj).forEach((key) => {
          if (!correctOrder.includes(key)) {
            correctOrder.push(key);
          }
        });
      });

      const headers = correctOrder.map((key) => ({
        label: key,
        align: "center",
        width: null,
        padding: 5,
      }));

      const rows = sheetData.map((obj) => {
        return correctOrder.map((key) => obj[key] || 0);
      });

      const filledData = sheetData.map((obj) => {
        const filledRow = {};
        allKeys.forEach((key) => {
          filledRow[key] = obj[key] || "undefined";
        });
        return filledRow;
      });

      const columnCount = headers.length;

      const maxTableLength =
        pdfDoc.page.width -
        pdfDoc.page.margins.left -
        pdfDoc.page.margins.right;

      const columnWidth = maxTableLength / columnCount;

      headers.forEach((header) => {
        header.width = columnWidth;
      });

      pdfDoc.table(
        {
          title: sheetName,
          headers,
          rows,
        },
        {
          prepareHeader: () => pdfDoc.font("Helvetica-Bold").fontSize(12),
          prepareRow: (row, index) => pdfDoc.font("Helvetica").fontSize(12),
          wrap: true,
          columnSpacing: 5,
          padding: 5,
          divider: {
            header: { disabled: false, width: 1, color: "#000" },
            horizontal: { disabled: false, width: 0.5, color: "#000" },
          },
        }
      );

      pdfDoc.moveDown();
    }

    const pdfFilePath = join(
      __dirname,
      `public/result_files/PDF/${fileName.split(".")[0]}.pdf`
    );
    const pdfDoc = new PDF({ size: "A4", layout: "landscape" });
    pdfDoc.fontSize(20).text("WattWizards", { align: "center" });
    pdfDoc.moveDown(2);

    const sheetNames = Object.keys(workSheets);

    for (let i = 0; i < sheetNames.length; i++) {
      const sheetName = sheetNames[i];
      const sheetData = workSheets[sheetName];

      addSheetToPdf(sheetData, sheetName, pdfDoc);

      if (i < sheetNames.length - 1) {
        pdfDoc.addPage({ size: "A4", layout: "landscape" });
      }
    }

    pdfDoc.pipe(createWriteStream(pdfFilePath));
    pdfDoc.pipe(MRes);
    pdfDoc.end();
    return;
  }

  MRes.sendFile(outputFilePath, (err) => {
    if (err) {
      console.log("Error sending the file: ", err);
    }
    unlink(filePath, (err) => {});
    // unlink(outputFilePath , (err)=>{});
  });
};

module.exports.OnlineSheetCalculation = async (MReq, MRes) => {
  try {
    const SheetJsonData = JSON.parse(MReq.body.data);

    let processedData = runMigration(SheetJsonData, MReq.body.type);

    console.log(processedData);

    let fileName =
      "results_" + MReq.body.type + "_online" + MReq.body["file-type"] == "pdf"
        ? ".pdf"
        : ".xlsx";

    const worksheet = XLSX.utils.json_to_sheet(processedData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "sheet1");

    let data = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    const outputFilePath = join(
      __dirname,
      "public/result_files",
      `${fileName}`
    );

    MRes.setHeader(
      "Content-Type",
      MReq.body["file-type"] == "pdf"
        ? "application/pdf"
        : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    if (MReq.body["file-type"] == "pdf") {
      function addSheetToPdf(sheetData, sheetName, pdfDoc) {
        pdfDoc.fontSize(16).text(`Sheet: ${sheetName}`, { align: "left" });
        pdfDoc.moveDown();

        if (!sheetData || sheetData.length === 0) {
          pdfDoc
            .fontSize(12)
            .text("No data found in this sheet.", { align: "left" });
          pdfDoc.moveDown();
          return;
        }

        const headers = Object.keys(sheetData[0]).map((key) => ({
          label: key,
          align: "center",
          width: null,
        }));

        const rows = sheetData.map((row) => Object.values(row));

        const columnCount = headers.length;

        const maxTableLength =
          pdfDoc.page.width -
          pdfDoc.page.margins.left -
          pdfDoc.page.margins.right;

        const columnWidth = maxTableLength / columnCount;

        headers.forEach((header) => {
          header.width = columnWidth;
        });

        pdfDoc.table(
          {
            title: sheetName,
            headers,
            rows,
          },
          {
            prepareHeader: () => pdfDoc.font("Helvetica-Bold").fontSize(12),
            prepareRow: (row, index) => pdfDoc.font("Helvetica").fontSize(12),
            wrap: true,
            columnSpacing: 5,
            padding: 5,
            divider: {
              header: { disabled: false, width: 1, color: "#000" },
              horizontal: { disabled: false, width: 0.5, color: "#000" },
            },
          }
        );

        pdfDoc.moveDown();
      }

      const pdfFilePath = join(
        __dirname,
        `public/result_files/PDF/online_${fileName.split(".")[0]}.pdf`
      );
      const pdfDoc = new PDF({ size: "A4", layout: "landscape" });
      pdfDoc.fontSize(20).text("WattWizards", { align: "center" });
      pdfDoc.moveDown(2);

      addSheetToPdf(processedData, "sheet one", pdfDoc);

      pdfDoc.pipe(createWriteStream(pdfFilePath));
      pdfDoc.pipe(MRes);
      pdfDoc.end();
      return;
    }

    MRes.end(data);
  } catch (e) {
    console.log(e);
    MRes.status(404).send();
  }
};
