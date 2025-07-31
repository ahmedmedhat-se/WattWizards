module.exports.electricConsumptionFunction = (row, callable) => {
  let Power = parseFloat(row["Power"]);
  const Voltage = row["Voltage"];
  const PF =
    parseFloat(row["Power factor"]) > 1
      ? parseFloat(row["Power factor"]) / 10
      : parseFloat(row["Power factor"]);
  const machines = row["Machines number"];
  const workH = row["WorkingHours"];
  const workD = row["WorkingDays"];
  const powerUnit = row["Power unit"].trim();
  const Phase = row["Phases"].trim();

  if (powerUnit.toUpperCase() === "KW") {
    Power *= 1000;
  } else if (powerUnit.toUpperCase() === "MW") {
    Power *= 1000000;
  } else if (powerUnit.toLowerCase() === "milli watt") {
    Power /= 1000;
  } else if (powerUnit.toUpperCase() === "HP") {
    Power *= 746;
  } else if (powerUnit.toLowerCase() === "ampere") {
    Power = Power * Voltage * PF;
  }

  if (Phase.toLowerCase() === "three phases") {
    Power *= 1.732;
  }

  let KWPerDay = ((Power * workH) / 1000) * machines;
  let KWperMonth = KWPerDay * workD;

  callable(
    Power.toFixed(2),
    `${KWPerDay.toFixed(2)} KW`,
    `${KWperMonth.toFixed(2)} KW`
  );
};
