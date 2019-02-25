export const formatDigits = (number: number, precision: number): string => {
    return parseFloat(number.toString()).toFixed(precision);
}