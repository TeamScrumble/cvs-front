export const toPositiveInt = (value: string | undefined) => {
  const num = Number(value);
  return Number.isInteger(num) && num > 0 ? num : 0;
};

export const formatLikeNumber = (value: number): string => {
  if (value < 1000) {
    return value.toString();
  }

  if (value < 10000) {
    const result = value / 1000;
    if (result >= 10) return "1만";
    return format(result) + "천";
  }

  return format(value / 10000) + "만";
};

const format = (num: number): string => {
  const fixed = num.toFixed(1);
  return fixed.endsWith(".0") ? fixed.slice(0, -2) : fixed;
};
