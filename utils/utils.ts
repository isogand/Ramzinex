export const convertToPersianDigits = (text: string | number) => {
  const persianDigits: string[] = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  if (typeof text === 'string' || typeof text === 'number') {
    return String(text).replace(/\d/g, (digit: string) => persianDigits[parseInt(digit)]);
  }

  return text;
};
