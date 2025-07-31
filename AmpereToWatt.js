module.exports.AmpereToWattFunction = (row, callable) => {
  let Ampere = +row["Ampere"];
  const CurrentType = row["Current type"].trim();
  const Voltage = row["Voltage"];
  const Phases = row["Phases"].trim();
  const PF =
    parseFloat(row["Power factor"]) > 1
      ? parseFloat(row["Power factor"]) / 10
      : parseFloat(row["Power factor"]);
  let KW;

  if (CurrentType.toUpperCase() === "DC") {
    KW = Ampere * Voltage;
  } else if (
    CurrentType.toUpperCase() === "AC" &&
    Phases.toLowerCase() === "three phases"
  ) {
    KW = Ampere * Voltage * PF * 1.732;
  } else if (CurrentType.toUpperCase() === "AC") {
    KW = Ampere * PF * Voltage;
  }

  KW = +(KW / 1000);

  callable(KW.toFixed(2));
};
