module.exports.VoltAmpereToWattFunction = (row, callable) => {
  const Voltage = parseFloat(row["Voltage"]);
  let Ampere = parseFloat(row["Ampere"]);
  const PF =
    parseFloat(row["powerFactor"]) > 1
      ? parseFloat(row["powerFactor"]) / 10
      : parseFloat(row["powerFactor"]);

  let VoltAmpere = Voltage * Ampere;

  let Watt = +((VoltAmpere * PF * 1000).toFixed(3) / 1000);

  callable(Watt.toFixed());
};
