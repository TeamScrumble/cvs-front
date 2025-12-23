export const isBlank = (data: string) => data.trim().length === 0;
export const minLength = (data: string, minLength: number) =>
  data.length < minLength;
export const maxLength = (data: string, maxLength: number) =>
  data.length > maxLength;
export const isNotEmailForm = (data: string) =>
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data);
export const isNotEqual = (data1: string, data2: string) => data1 !== data2;
