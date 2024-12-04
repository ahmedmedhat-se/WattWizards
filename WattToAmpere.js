module.exports.WattToAmpereFunction = (row, callable) => {
  let Watt = parseFloat(row["Watt"]);
  const CurrentType = row["CurrentType"].trim();
  const Voltage = parseFloat(row["Voltage"]);
  const Phases = row["phases"].trim();
  const PF =
    parseFloat(row["powerFactor"]) > 1
      ? parseFloat(row["powerFactor"]) / 10
      : parseFloat(row["powerFactor"]);
  let ampere;

  if (CurrentType === "DC") {
    ampere = Watt / Voltage;
  } else if (CurrentType === "AC" && Phases == "three phases") {
    ampere = Watt / (Voltage * PF * 1.732);
  } else if (CurrentType === "AC") {
    ampere = Watt / (PF * Voltage);
  }

  callable(ampere.toFixed(3));
};
