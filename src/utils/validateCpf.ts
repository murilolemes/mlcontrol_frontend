export function validateCpf(cpf: string): boolean {
  const cleaned = cpf.replace(/\D/g, "");

  if (cleaned.length !== 11) return false;
  if (/^(\d)\1+$/.test(cleaned)) return false;

  const calculateDigit = (base: string, factor: number): number => {
    const sum = base
      .split("")
      .reduce(
        (acc, digit, index) => acc + Number(digit) * (factor - index),
        0,
      );

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const base = cleaned.slice(0, 9);
  const firstDigit = calculateDigit(base, 10);
  const secondDigit = calculateDigit(`${base}${firstDigit}`, 11);

  return cleaned === `${base}${firstDigit}${secondDigit}`;
}
