module.exports.powerFactorCorrectionFunction = (row, callable) => {
  let Power = +row["Power"];
  let Efficiency = row["Efficiency"] / 100;
  let powerUnit = row["Power unit"].trim();
  let oldPF =
    parseFloat(row["oldPF"]) > 1
      ? parseFloat(row["oldPF"]) / 10
      : parseFloat(row["oldPF"]);
  let newPF =
    parseFloat(row["newPF"]) > 1
      ? parseFloat(row["newPF"]) / 10
      : parseFloat(row["newPF"]);
  let Voltage = +row["Voltage"];
  let frequency = +row["Frequency"];
  let Phase = row["Phases"].trim();
  let VoltageSquare = Math.pow(row["Voltage"], 2);

  console.log(
    Power,
    Efficiency,
    powerUnit,
    oldPF,
    newPF,
    Voltage,
    frequency,
    Phase,
    VoltageSquare
  );

  let power2 = Power;

  if (
    powerUnit.toUpperCase() === "KW" &&
    Phase.toLowerCase() === "three phases"
  ) {
    power2 = (Power * 1000) / (Voltage * oldPF * 1.732);
  } else if (
    powerUnit.toUpperCase() === "HP" &&
    Phase.toLowerCase() === "three phases"
  ) {
    power2 = (Power * 746) / (Voltage * Efficiency * oldPF * 1.732);
  } else if (
    powerUnit.toUpperCase() === "MW" &&
    Phase.toLowerCase() === "three phases"
  ) {
    power2 = (Power * 1000000) / (Voltage * oldPF * 1.732);
  } else if (
    powerUnit === "milliWatt" &&
    Phase.toLowerCase() === "three phases"
  ) {
    power2 = Power / 1000 / (Voltage * oldPF * 1.732);
  } else if (powerUnit.toUpperCase() === "KW") {
    power2 = (Power * 1000) / (Voltage * oldPF);
  } else if (powerUnit.toUpperCase() === "HP") {
    power2 = (Power * 746) / (Voltage * oldPF * Efficiency);
  } else if (powerUnit.toUpperCase() === "MW") {
    power2 = (Power * 1000000) / (Voltage * oldPF);
  } else if (powerUnit.toLowerCase() === "milli watt") {
    power2 = Power / 1000 / (Voltage * oldPF);
  }

  console.log(power2);

  var activePower = (Voltage * power2 * oldPF) / 1000;
  var apparentPower = (Voltage * power2) / 1000;
  var reactivePower = Math.floor(
    Math.sqrt(Math.pow(apparentPower, 2) - Math.pow(activePower, 2))
  );

  let phiOld = Math.acos(oldPF);
  let tanOld = Math.tan(phiOld);

  let phiNew = Math.acos(newPF);
  let tanNew = Math.tan(phiNew);
  // let phiNew = Math.acos(newPF) * (180 / Math.PI);

  let tanMinus = tanOld - tanNew;
  let phiCapacitorReactive = activePower * tanMinus;
  let microC =
    (phiCapacitorReactive * Math.pow(10, 9)) /
    (2 * Math.PI * frequency * VoltageSquare);

  // microC /= 10;
  callable(
    activePower.toFixed(2),
    apparentPower.toFixed(2),
    reactivePower.toFixed(2),
    microC.toFixed(2)
  );
};
