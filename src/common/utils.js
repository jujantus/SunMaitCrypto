export const lessThanTenMinutes = milliseconds =>
  Date.now() - milliseconds < 600000;

export const calculatePercentageVariation = (value, percentage) => {
  const parsedPercentage = parseInt(percentage, 10);
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedPercentage)) {
    return parsedValue;
  }
  return parsedValue * ((100 + parsedPercentage) / 100);
};
