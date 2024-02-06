// sum of 2 numbers
const sumTwoNumbers = (a, b) => {
  return a + b
}

// sum of 3 numbers

const sumThreeNumbers = (a, b, c) => {
  return a + b + c
}

// greater than 5

const greaterThanFive = a => {
  if (a > 5) {
    return true
  } else {
    return false
  }
}

// biggest num out of 2

const biggestNumOutOfTwo = (a, b) => {
  return a > b ? a : b
}

// biggest num out of 3
const biggestNumOutOfThree = (a, b, c) => {
  if (a >= b && a >= c) {
    return a
  } else if (b >= a && b >= c) {
    return b
  } else {
    return c
  }
}

// is first num bigger

const isFirstNumBigger = (a, b) => {
  return a > b
}

// is sum > 10

const isSumGreaterThan10 = (a, b) => {
  return a + b > 10
}

// functional sum

const functionalSum = (a, b) => {
  return () => {
    return a + b
  }
}

// functional 3 sum

const functionalThreeSum = (a, b) => {
  return c => {
    return a + b + c
  }
}

// functional sums - write a function that takes in 2 functions and returns the sum of the result of the 2 functions

const functionalFunctionSum = (func1, func2) => {
  return func1() + func2()
}
