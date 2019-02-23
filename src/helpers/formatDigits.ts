export const formatDigits = (number, precision) => {
    return parseFloat(number.toString()).toFixed(precision);
}