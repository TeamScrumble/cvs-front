export function toPositiveInt(value: string | undefined) {
  const num = Number(value);
  return Number.isInteger(num) && num > 0 ? num : null;
}