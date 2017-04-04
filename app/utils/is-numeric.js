// from http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
export default function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
