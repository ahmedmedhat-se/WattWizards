module.exports.HorseToAmpereConversionFunction = (row, callable) => {
  const hoursPower = row["Horse power"];
  const Efficiency =
    row["Efficiency"] > 1 ? row["Efficiency"] / 100 : row["Efficiency"];
  const CurrentType = row["Current type"].trim();
  const Phases = row["Phases"].trim();
  const PF =
    parseFloat(row["Power factor"]) > 1
      ? parseFloat(row["Power factor"]) / 10
      : parseFloat(row["Power factor"]);
  const Voltage = row["Voltage"];

  let result;
  if (CurrentType.toUpperCase() === "DC") {
    result = (hoursPower * 746) / (Efficiency * Voltage);
  } else if (
    CurrentType.toUpperCase() === "AC" &&
    Phases.toLowerCase() === "three phases"
  ) {
    result = (hoursPower * 746) / (Efficiency * Voltage * PF * 1.732);
  } else if (CurrentType.toUpperCase() === "AC") {
    result = (hoursPower * 746) / (Efficiency * Voltage * PF);
  }
  callable(result.toFixed(2));
};
