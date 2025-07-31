module.exports.WattToAmpereFunction = (row, callable) => {
  let Watt = parseFloat(row["Power"]);
  const CurrentType = row["Current type"].trim();
  const Voltage = parseFloat(row["Voltage"]);
  const Phases = row["Phases"].trim();
  const PF =
    parseFloat(row["Power factor"]) > 1
      ? parseFloat(row["Power factor"]) / 10
      : parseFloat(row["Power factor"]);
  let ampere;

  if (CurrentType.toUpperCase() === "DC") {
    ampere = Watt / Voltage;
  } else if (
    CurrentType.toUpperCase() === "AC" &&
    Phases.toLowerCase() == "three phases"
  ) {
    ampere = Watt / (Voltage * PF * 1.732);
  } else if (CurrentType.toUpperCase() === "AC") {
    ampere = Watt / (PF * Voltage);
  }

  callable(ampere.toFixed(2));
};
