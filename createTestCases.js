//! =========== HORSE TO AMPERE ==================
function createHorseToAmpereTests() {
  let currentProcess = "HorseToAmpere";
  let outPut = join(__dirname, "public/test-cases/", currentProcess);
  let sheet1 = [
    [
      "HorsePower",
      "Efficiency",
      "CurrentType",
      "phases",
      "powerFactor",
      "Voltage",
      "result",
    ],
  ];

  for (let rowNumber = 0; rowNumber < 100; rowNumber++) {
    let data = {
      HorsePower: (Math.random() * 100).toFixed(),
      Efficiency: (Math.random() * 100).toFixed(),
      CurrentType: (Math.random() * 100).toFixed() % 2 == 0 ? "DC" : "AC",
      phases:
        (Math.random() * 100).toFixed() % 2 == 0 ? "one phase" : "three phases",
      powerFactor: (Math.random() * 10).toFixed(1),
      Voltage: 220,
    };

    HorseToAmpereConversionFunction(data, (result) => {
      data["result"] = result;
    });

    sheet1.push([
      data["HorsePower"],
      data["Efficiency"],
      data["CurrentType"],
      data["phases"],
      data["powerFactor"],
      data["Voltage"],
      data["result"],
    ]);
  }
  var worksheet = XLSX.utils.aoa_to_sheet(sheet1);
  var workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, `sheet1`);
  XLSX.writeFile(workbook, outPut + ".xlsx");
  console.log("file created");
}

//! =========== AMPERE TO WATT ==================

function createAmpereToWattTests() {
  let currentProcess = "AmpereToWatt";
  let outPut = join(__dirname, "public/test-cases/", currentProcess);
  let sheet1 = [
    ["Ampere", "CurrentType", "Voltage", "powerFactor", "phases", "result"],
  ];

  for (let rowNumber = 0; rowNumber < 100; rowNumber++) {
    let data = {
      Ampere: (Math.random() * 100).toFixed(),
      CurrentType: (Math.random() * 100).toFixed() % 2 == 0 ? "DC" : "AC",
      phases:
        (Math.random() * 100).toFixed() % 2 == 0 ? "one phase" : "three phases",
      powerFactor: (Math.random() * 10).toFixed(1),
      Voltage: 220,
    };

    AmpereToWattFunction(data, (result) => {
      data["result"] = result;
    });

    sheet1.push([
      data["Ampere"],
      data["CurrentType"],
      data["Voltage"],
      data["powerFactor"],
      data["phases"],
      data["result"],
    ]);
  }
  var worksheet = XLSX.utils.aoa_to_sheet(sheet1);
  var workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, `sheet1`);
  XLSX.writeFile(workbook, outPut + ".xlsx");
  console.log("file created");
}

//! =========== VOLT TO AMPERE ==================

function createVoltToAmpereTests() {
  let currentProcess = "VoltToAmpere";
  let outPut = join(__dirname, "public/test-cases/", currentProcess);
  let sheet1 = [["Voltage", "Ampere", "powerFactor", "Watt"]];

  for (let rowNumber = 0; rowNumber < 100; rowNumber++) {
    let data = {
      Voltage: (Math.random() * 100).toFixed(),
      Ampere: (Math.random() * 100).toFixed(),
      powerFactor: (Math.random() * 10).toFixed(1),
    };

    VoltAmpereToWattFunction(data, (watt) => {
      data["Watt"] = watt;
    });

    sheet1.push([
      data["Voltage"],
      data["Ampere"],
      data["powerFactor"],
      data["Watt"],
    ]);
  }
  var worksheet = XLSX.utils.aoa_to_sheet(sheet1);
  var workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, `sheet1`);
  XLSX.writeFile(workbook, outPut + ".xlsx");
  console.log("file created");
}

//! =========== WATT TO AMPERE ==================

function createWattToAmpereTests() {
  let currentProcess = "WattToAmpere";
  let outPut = join(__dirname, "public/test-cases/", currentProcess);
  let sheet1 = [
    ["Watt", "CurrentType", "Voltage", "powerFactor", "phases", "ampere"],
  ];

  for (let rowNumber = 0; rowNumber < 100; rowNumber++) {
    let data = {
      Watt: (Math.random() * 100).toFixed(),
      CurrentType: (Math.random() * 100).toFixed() % 2 == 0 ? "DC" : "AC",
      Voltage: 220,
      powerFactor: (Math.random() * 10).toFixed(1),
      phases:
        (Math.random() * 100).toFixed() % 2 == 0 ? "one phase" : "three phases",
    };

    WattToAmpereFunction(data, (Ampere) => {
      data["ampere"] = Ampere;
    });

    sheet1.push([
      data["Watt"],
      data["CurrentType"],
      data["Voltage"],
      data["powerFactor"],
      data["phases"],
      data["ampere"],
    ]);
  }
  var worksheet = XLSX.utils.aoa_to_sheet(sheet1);
  var workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, `sheet1`);
  XLSX.writeFile(workbook, outPut + ".xlsx");
  console.log("file created");
}

//! =========== CIRCUIT BREAKER ==================
//* =========== PREMIUM ==================

function createCircuitBreakerTests() {
  let currentProcess = "CircuitBreaker";
  let outPut = join(__dirname, "public/test-cases/", currentProcess);
  let sheet1 = [
    [
      "MachineNum",
      "watt",
      "WattUnit",
      "Voltage",
      "powerFactor",
      "phases",
      "current",
      "circuitBreaker",
      "cableThickness",
    ],
  ];

  for (let rowNumber = 0; rowNumber < 100; rowNumber++) {
    let data = {
      MachineNum: (Math.random() * 10).toFixed(),
      watt: (Math.random() * 10).toFixed(),
      WattUnit: (Math.random() * 10).toFixed() % 2 == 0 ? "KW" : "W",
      Voltage: 220,
      phases:
        (Math.random() * 100).toFixed() % 2 == 0 ? "one phase" : "three phases",
      powerFactor: `0.${(Math.random() * 10).toFixed()}`,
    };

    CircuitBreakerFunction(data, (current, circuitBreaker, cableThickness) => {
      data["current"] = current;
      data["circuitBreaker"] = circuitBreaker;
      data["cableThickness"] = cableThickness;
    });

    sheet1.push([
      data["MachineNum"],
      data["watt"],
      data["WattUnit"],
      data["Voltage"],
      data["powerFactor"],
      data["phases"],
      data["current"],
      data["circuitBreaker"],
      data["cableThickness"],
    ]);
  }
  var worksheet = XLSX.utils.aoa_to_sheet(sheet1);
  var workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, `sheet1`);
  XLSX.writeFile(workbook, outPut + ".xlsx");
  console.log("file created");
}

//! =========== ELECTRIC CONSUMPTION ==================
//* =========== PREMIUM ==================

function createElectricConsumptionTests() {
  let currentProcess = "ElectricConsumption";
  let outPut = join(__dirname, "public/test-cases/", currentProcess);
  let sheet1 = [
    [
      "MachineNum",
      "watt",
      "WattUnit",
      "Voltage",
      "WorkingHours",
      "WorkingDays",
      "powerFactor",
      "phases",
      "power",
      "KW per day",
      "KW per month",
    ],
  ];

  for (let rowNumber = 0; rowNumber < 100; rowNumber++) {
    let data = {
      MachineNum: (Math.random() * 100).toFixed(),
      watt: (Math.random() * 100).toFixed(),
      WattUnit: (Math.random() * 100).toFixed() % 2 == 0 ? "KW" : "HP",
      Voltage: 220,
      phases:
        (Math.random() * 100).toFixed() % 2 == 0 ? "one phase" : "three phases",
      powerFactor: (Math.random() * 10).toFixed(1),
      WorkingHours: (Math.random() * 10).toFixed() % 24,
      WorkingDays: (Math.random() * 10).toFixed() % 30,
    };

    electricConsumptionFunction(data, (power, KWperD, KWperM) => {
      data["power"] = power;
      data["KW per day"] = KWperD;
      data["KW per month"] = KWperM;
    });

    sheet1.push([
      data["MachineNum"],
      data["watt"],
      data["WattUnit"],
      data["Voltage"],
      data["WorkingHours"],
      data["WorkingDays"],
      data["powerFactor"],
      data["phases"],
      data["power"],
      data["KW per day"],
      data["KW per month"],
    ]);
  }
  var worksheet = XLSX.utils.aoa_to_sheet(sheet1);
  var workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, `sheet1`);
  XLSX.writeFile(workbook, outPut + ".xlsx");
  console.log("file created");
}

//! =========== POWER FACTOR CORRECTION ==================
//* =========== PREMIUM ==================

// function createPowerFactorCorrectionTests() {
//   let currentProcess = "PowerFactorCorrection";
//   let outPut = join(__dirname, "public/test-cases/", currentProcess);
//   let sheet1 = [
//     [
//       "power",
//       "powerUnit",
//       "Efficiency",
//       "oldPF",
//       "newPF",
//       "frequency",
//       "Voltage",
//       "phases",
//       "active power",
//       "apparent power",
//       "reactive power",
//       "capacitor size",
//     ],
//   ];

//   for (let rowNumber = 0; rowNumber < 100; rowNumber++) {
//     let data = {
//       power: (Math.random() * 100).toFixed(),
//       Efficiency: 1,
//       powerUnit: (Math.random() * 100).toFixed() % 2 == 0 ? "KW" : "A",
//       Voltage: 220,
//       phases:
//         (Math.random() * 100).toFixed() % 2 == 0 ? "one phase" : "three phases",
//       newPF: (Math.random() * 10).toFixed(1),
//       oldPF: (Math.random() * 10).toFixed(1),
//       frequency: (Math.random() * 100).toFixed(),
//     };

//     powerFactorCorrectionFunction(
//       data,
//       (activePower, apparentPower, reactivePower, microCapacitor) => {
//         data["active power"] = activePower;
//         data["apparent power"] = apparentPower;
//         data["reactive power"] = reactivePower;
//         data["capacitor size"] = microCapacitor;
//       }
//     );

//     sheet1.push([
//       data["power"],
//       data["powerUnit"],
//       data["Efficiency"],
//       data["oldPF"],
//       data["newPF"],
//       data["frequency"],
//       data["Voltage"],
//       data["phases"],
//       data["active power"],
//       data["apparent power"],
//       data["reactive power"],
//       data["capacitor size"],
//     ]);
//   }
//   var worksheet = XLSX.utils.aoa_to_sheet(sheet1);
//   var workbook = XLSX.utils.book_new();

//   XLSX.utils.book_append_sheet(workbook, worksheet, `sheet1`);
//   XLSX.writeFile(workbook, outPut + ".xlsx");
//   console.log("file created");
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
// createHorseToAmpereTests();
// createAmpereToWattTests();
// createVoltToAmpereTests();
// createWattToAmpereTests();

//! PREMIUM
// createCircuitBreakerTests();
// createElectricConsumptionTests();
// createPowerFactorCorrectionTests();
