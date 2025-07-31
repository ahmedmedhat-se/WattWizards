module.exports.CircuitBreakerFunction = (row, callable) => {
  // set total values
  let AllWatt = 0;
  let AllPF = 0;
  let powerUnit = row["Power unit"];
  let PF =
    parseFloat(row["Power factor"]) > 1
      ? parseFloat(row["Power factor"]) / 10
      : parseFloat(row["Power factor"]);

  //   set main values
  let current;
  let circuitBreaker;
  let cableThickness;

  var CurrentWatt = row["Power"] * row["Machines number"];
  // console.log(PF, PF.trim() == "KW");
  if (powerUnit.trim().toUpperCase() === "KW") {
    CurrentWatt = parseFloat(CurrentWatt) * 1000;
  } else if (powerUnit.trim().toUpperCase() === "MW") {
    CurrentWatt = parseFloat(CurrentWatt) * 1000000;
  } else if (powerUnit.trim().toUpperCase() === "HP") {
    CurrentWatt = parseFloat(CurrentWatt) * 746;
  } else if (powerUnit.trim().toLowerCase() === "milli watt") {
    CurrentWatt = parseFloat(CurrentWatt) / 1000;
  }

  // set all values to add every time
  AllWatt += parseFloat(CurrentWatt);

  AllPF += PF;

  // calculate the current intensity
  if (row["Phases"].toLowerCase() === "three phases") {
    current = +CurrentWatt / (row["Voltage"] * PF * 1.73);
  } else {
    current = +CurrentWatt / (row["Voltage"] * PF);
  }
  // done current

  // calculate the circuit breaker
  let CB = current * 1.25;

  const BreakerData = {
    6: `6A`,
    10: `10A`,
    16: `16A`,
    20: `20A`,
    25: `25A`,
    32: `32A`,
    40: `40A`,
    50: `50A`,
    63: `63A`,
    80: `80A`,
    100: `100A`,
    125: `125A`,
    160: `160A`,
    200: `200A`,
    250: `250A`,
    400: `400A`,
    630: `630A`,
    800: `800A`,
    1000: `1000A`,
    1250: `1250A`,
    1600: `1600A`,
    2000: `2000A`,
    2500: `2500A`,
    3200: `3200A`,
    4000: `4000A`,
    5000: `5000A`,
    6000: `6000A`,
    6300: `6300A`,
  };

  let CBB = parseInt(CB.toFixed(2));
  while (!BreakerData[CBB.toFixed()] && CBB <= 6300) {
    CBB += 1;
  }

  if (BreakerData[CBB.toFixed()] && CBB.toFixed(2) <= 6300) {
    circuitBreaker = BreakerData[CBB];
  } else {
    circuitBreaker = "unknown";
  }
  // done circuitBreaker

  // calculate cable thickness
  const CableData = {
    6: 1,
    10: 1.5,
    16: 2.5,
    20: 4,
    32: 6,
    40: 10,
    60: 16,
    80: 25,
    100: 35,
    125: 50,
    160: 60,
    200: 95,
    250: 150,
    300: 185,
  };

  let CBC = parseFloat(CBB);
  while (CBC <= 300 && !CableData[CBC.toFixed()]) {
    CBC += 1;
  }

  if (CableData[CBC.toFixed()] && CBC <= 300) {
    cableThickness = CableData[CBC];
  } else {
    cableThickness = "unknown";
  }
  // done cableThickness
  callable(current.toFixed(2), circuitBreaker, cableThickness);
};
