module.exports.electricConsumptionFunction = (row, callable) => {
  let Power = row["watt"];
  const Voltage = row["Voltage"];
  const PF = row["powerFactor"];
  const machines = row["MachineNum"];
  const workH = row["WorkingHours"];
  const workD = row["WorkingDays"];
  const powerUnit = row["WattUnit"].trim();
  const Phase = row["phases"].trim();

  if (powerUnit === "KW") {
    Power *= 1000;
  } else if (powerUnit === "MW") {
    Power *= 1000000;
  } else if (powerUnit === "milliWatt") {
    Power /= 1000;
  } else if (powerUnit === "HP") {
    Power *= 746;
  } else if (powerUnit === "Ampere") {
    Power = Power * Voltage * PF;
  }

  if (Phase === "three phases") {
    Power *= 1.732;
  }

  let KWPerDay = ((Power * workH) / 1000) * machines;
  let KWperMonth = KWPerDay * workD;

  callable(Power, `${KWPerDay} KW`, `${KWperMonth} KW`);
};
