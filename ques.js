/**
 * Returns the number of digits in the given integer.
 * @param {number} n - The integer for which the number of digits is to be calculated.
 * @returns {number} - The number of digits in the integer n.
 */

function noOfDigits(n) {
  if (n < 0) n = -n; // Handle negative numbers
  if (n === 0) return 1; // Special case for zero
  let count = 0;
  while (n > 0) {
    n = Math.floor(n / 10);
    count++;
  }
  return count;
}
function printNumber(n) {
  let count = noOfDigits(n) - 1;
  while (count >= 0) {
    let digit = Math.floor(n / 10 ** count);
    console.log(digit);
    n = n % 10 ** count;
    count--;
  }
}

// printNumber(45073);

/**
 * Finds the kth factor of a given number n.
 * @param {number} n - The number for which factors are to be found.
 * @param {number} k - The ordinal number of the factor to return.
 * @returns {number} - The kth factor of n, or -1 if n doesn't have at least k factors.
 */
function kthFactor(n, k) {
  let count = 0;
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      count++;
      if (count === k) return i;
    }
  }
  for (let i = Math.floor(Math.sqrt(n)); i > 0; i--) {
    if (n % i === 0 && i !== n / i) {
      count++;
      if (count === k) return n / i;
    }
  }
  return -1;
}

console.log(kthFactor(12, 8)); // Output: 3
