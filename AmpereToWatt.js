module.exports.AmpereToWattFunction = (row, callable) => {
  let Ampere = +row["Ampere"];
  const CurrentType = row["CurrentType"].trim();
  const Voltage = row["Voltage"];
  const Phases = row["phases"].trim();
  const PF = row["powerFactor"];
  let KW;

  if (CurrentType === "DC") {
    KW = Ampere * Voltage;
  } else if (CurrentType === "AC" && Phases === "three phases") {
    KW = Ampere * Voltage * PF * 1.732;
  } else if (CurrentType === "AC") {
    KW = Ampere * PF * Voltage;
  }

  KW = +(KW / 1000);

  callable(KW.toFixed(3));
};
