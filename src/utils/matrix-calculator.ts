// matrix-calculator.ts

import { Operator } from './calculator';

/**
 * A numeric matrix represented as a 2D array.
 */
export type Matrix = number[][];

/**
 * A calculator for numeric matrices, supporting basic operations.
 */
export class MatrixCalculator {
    constructor() {}

    /**
     * Element-wise addition of two matrices.
     * @param a - First matrix
     * @param b - Second matrix
     * @throws Error if dimensions do not match
     * @returns Sum of a and b
     */
    add(a: Matrix, b: Matrix): Matrix {
        this.assertSameDimensions(a, b);
        return a.map((row, i) => row.map((val, j) => val + b[i][j]));
    }

    /**
     * Element-wise subtraction of two matrices.
     * @param a - Minuend matrix
     * @param b - Subtrahend matrix
     * @throws Error if dimensions do not match
     * @returns a - b
     */
    subtract(a: Matrix, b: Matrix): Matrix {
        this.assertSameDimensions(a, b);
        return a.map((row, i) => row.map((val, j) => val - b[i][j]));
    }

    /**
     * Matrix multiplication (dot product) of two matrices.
     * @param a - Left matrix
     * @param b - Right matrix
     * @throws Error if inner dimensions do not match
     * @returns Product a * b
     */
    multiply(a: Matrix, b: Matrix): Matrix {
        const aRows = a.length;
        const aCols = a[0]?.length || 0;
        const bRows = b.length;
        const bCols = b[0]?.length || 0;
        if (aCols !== bRows) {
            throw new Error(
                `Cannot multiply: columns of A (${aCols}) must equal rows of B (${bRows}).`,
            );
        }
        const result: Matrix = Array.from({ length: aRows }, () =>
            Array(bCols).fill(0),
        );
        for (let i = 0; i < aRows; i++) {
            for (let j = 0; j < bCols; j++) {
                let sum = 0;
                for (let k = 0; k < aCols; k++) {
                    sum += a[i][k] * b[k][j];
                }
                result[i][j] = sum;
            }
        }
        return result;
    }

    /**
     * Element-wise division of two matrices.
     * @param a - Dividend matrix
     * @param b - Divisor matrix
     * @throws Error if dimensions do not match or division by zero
     * @returns Element-wise quotient a / b
     */
    divide(a: Matrix, b: Matrix): Matrix {
        this.assertSameDimensions(a, b);
        return a.map((row, i) =>
            row.map((val, j) => {
                if (b[i][j] === 0) {
                    throw new Error(
                        'Division by zero at position [' + i + '][' + j + '].',
                    );
                }
                return val / b[i][j];
            }),
        );
    }

    /**
     * Generic calculate method matching primitive Calculator signature.
     * Supports '+', '-', '*', '/'.
     * @param a - First matrix
     * @param b - Second matrix
     * @param operator - Operation to perform
     * @returns Result matrix
     */
    calculate(a: Matrix, b: Matrix, operator: Operator): Matrix {
        switch (operator) {
            case '+':
                return this.add(a, b);
            case '-':
                return this.subtract(a, b);
            case '*':
                return this.multiply(a, b);
            case '/':
                return this.divide(a, b);
        }
    }

    /**
     * Verify that two matrices have the same shape.
     * @param a - First matrix
     * @param b - Second matrix
     * @throws Error if dimensions differ
     */
    private assertSameDimensions(a: Matrix, b: Matrix) {
        if (a.length !== b.length || a[0]?.length !== b[0]?.length) {
            throw new Error(
                `Matrix dimensions must match. A is ${a.length}x${a[0]?.length}, B is ${b.length}x${b[0]?.length}`,
            );
        }
    }
}
