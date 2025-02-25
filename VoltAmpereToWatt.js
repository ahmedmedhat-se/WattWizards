module.exports.VoltAmpereToWattFunction = (row, callable) => {
  const Voltage = parseFloat(row["Voltage"]);
  let Ampere = parseFloat(row["Ampere"]);
  const PF =
    parseFloat(row["Power factor"]) > 1
      ? parseFloat(row["Power factor"]) / 10
      : parseFloat(row["Power factor"]);

  let VoltAmpere = Voltage * Ampere;

  let Watt = +((VoltAmpere * PF * 1000).toFixed(3) / 1000);

  callable(Watt.toFixed(2));
};
