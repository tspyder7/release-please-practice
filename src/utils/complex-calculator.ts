// complex-calculator.ts

import { Operator } from './calculator';

/**
 * Immutable Complex number representation a + bi.
 */
export class Complex {
    /** Real part */
    readonly re: number;
    /** Imaginary part */
    readonly im: number;

    /**
     * Construct a complex number.
     * @param re - Real part
     * @param im - Imaginary part
     */
    constructor(re: number, im: number) {
        this.re = re;
        this.im = im;
    }

    /**
     * Return a string representation of the complex number.
     * Examples: "3 + 4i", "3 - 4i", "0 + 0i"
     * @returns The string representation
     */
    toString(): string {
        const sign = this.im >= 0 ? '+' : '-';
        const imAbs = Math.abs(this.im);
        return `${this.re} ${sign} ${imAbs}i`;
    }

    /**
     * True when both real and imaginary parts are exactly zero.
     * @returns Whether the complex number is zero
     */
    isZero(): boolean {
        return this.re === 0 && this.im === 0;
    }

    /**
     * Conjugate of the complex number.
     * @returns A new Complex equal to re - im i
     */
    conjugate(): Complex {
        return new Complex(this.re, -this.im);
    }

    /**
     * Squared magnitude (|z|^2) of the complex number.
     * Useful to avoid a sqrt when comparing or dividing.
     * @returns The squared magnitude
     */
    magnitudeSquared(): number {
        return this.re * this.re + this.im * this.im;
    }

    /**
     * Magnitude (modulus) of the complex number.
     * @returns The magnitude |z|
     */
    magnitude(): number {
        return Math.sqrt(this.magnitudeSquared());
    }
}

/**
 * A calculator for Complex numbers that mirrors the original Calculator API.
 * Use instance methods instead of static methods.
 */
export class ComplexCalculator {
    /**
     * Create a ComplexCalculator.
     * No internal state is required; creating an instance keeps the API consistent with non-static usage.
     */
    constructor() {}

    /**
     * Add two complex numbers.
     * @param a - First complex operand
     * @param b - Second complex operand
     * @returns The sum a + b
     */
    add(a: Complex, b: Complex): Complex {
        return new Complex(a.re + b.re, a.im + b.im);
    }

    /**
     * Subtract one complex number from another.
     * @param a - Minuend complex operand
     * @param b - Subtrahend complex operand
     * @returns The result a - b
     */
    subtract(a: Complex, b: Complex): Complex {
        return new Complex(a.re - b.re, a.im - b.im);
    }

    /**
     * Multiply two complex numbers.
     * Formula: (a + bi) * (c + di) = (ac - bd) + (ad + bc)i
     * @param a - First complex operand
     * @param b - Second complex operand
     * @returns The product a * b
     */
    multiply(a: Complex, b: Complex): Complex {
        const re = a.re * b.re - a.im * b.im;
        const im = a.re * b.im + a.im * b.re;
        return new Complex(re, im);
    }

    /**
     * Divide one complex number by another.
     * Formula: (a + bi) / (c + di) = [(a+bi)(c-di)] / (c^2 + d^2)
     * Throws Error when dividing by zero-complex.
     * @param a - Dividend complex operand
     * @param b - Divisor complex operand
     * @throws Error if divisor is zero (both real and imaginary parts are zero)
     * @returns The quotient a / b
     */
    divide(a: Complex, b: Complex): Complex {
        if (b.isZero()) {
            throw new Error('Division by zero complex number is not allowed.');
        }
        const denom = b.magnitudeSquared();
        // multiply numerator by conjugate of denominator
        const numRe = a.re * b.re + a.im * b.im; // a.re * b.re - a.im * (-b.im)
        const numIm = a.im * b.re - a.re * b.im; // a.im * b.re + a.re * (-b.im)
        return new Complex(numRe / denom, numIm / denom);
    }

    /**
     * Conjugate of a complex number.
     * @param a - Complex operand
     * @returns The conjugate of a
     */
    conjugate(a: Complex): Complex {
        return a.conjugate();
    }

    /**
     * Modulus (magnitude) of a complex number.
     * @param a - Complex operand
     * @returns The magnitude |a|
     */
    modulus(a: Complex): number {
        return a.magnitude();
    }

    /**
     * Generic calculate method that mirrors the primitive Calculator signature.
     * Accepts Operator from the original calculator.
     * @param a - First complex operand
     * @param b - Second complex operand
     * @param operator - One of '+', '-', '*', '/'
     * @returns The result of applying operator to a and b
     */
    calculate(a: Complex, b: Complex, operator: Operator): Complex {
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
}
