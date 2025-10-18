// calculator.ts

/**
 * Supported arithmetic operators
 */
export type Operator = "+" | "-" | "*" | "/";

/**
 * A simple calculator class with basic arithmetic operations.
 */
export class Calculator {
  /**
   * Adds two numbers.
   * @param a - First number
   * @param b - Second number
   * @returns The sum of `a` and `b`
   */
  add(a: number, b: number): number {
    return a + b;
  }

  /**
   * Subtracts one number from another.
   * @param a - First number
   * @param b - Second number
   * @returns The result of `a - b`
   */
  subtract(a: number, b: number): number {
    return a - b;
  }

  /**
   * Multiplies two numbers.
   * @param a - First number
   * @param b - Second number
   * @returns The product of `a` and `b`
   */
  multiply(a: number, b: number): number {
    return a * b;
  }

  /**
   * Divides one number by another.
   * @param a - Dividend
   * @param b - Divisor
   * @throws Error if divisor is zero
   * @returns The quotient of `a / b`
   */
  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("Division by zero is not allowed.");
    }
    return a / b;
  }

  /**
   * Performs a calculation based on the provided operator.
   * @param a - First number
   * @param b - Second number
   * @param operator - Operator (`+`, `-`, `*`, `/`)
   * @returns The result of the operation
   */
  calculate(a: number, b: number, operator: Operator): number {
    switch (operator) {
      case "+":
        return this.add(a, b);
      case "-":
        return this.subtract(a, b);
      case "*":
        return this.multiply(a, b);
      case "/":
        return this.divide(a, b);
    }
  }
}
