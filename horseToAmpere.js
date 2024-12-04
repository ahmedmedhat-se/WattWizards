module.exports.HorseToAmpereConversionFunction = (row, callable) => {
  const hoursPower = row["HorsePower"];
  const Efficiency =
    row["Efficiency"] > 1 ? row["Efficiency"] / 100 : row["Efficiency"];
  const CurrentType = row["CurrentType"].trim();
  const Phases = row["phases"].trim();
  const PF = row["powerFactor"];
  const Voltage = row["Voltage"];

  let result;
  if (CurrentType === "DC") {
    result = (hoursPower * 746) / (Efficiency * Voltage);
  } else if (CurrentType === "AC" && Phases === "three phases") {
    result = (hoursPower * 746) / (Efficiency * Voltage * PF * 1.732);
  } else if (CurrentType === "AC") {
    result = (hoursPower * 746) / (Efficiency * Voltage * PF);
  }
  callable(result.toFixed(2));
};
