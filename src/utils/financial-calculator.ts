// financial-calculator.ts

/**
 * When payments occur relative to each compounding period.
 * - 'end': ordinary annuity (payments at period end)
 * - 'begin': annuity due (payments at period start)
 */
export type PaymentTiming = 'end' | 'begin';

/**
 * A calculator for common financial mathematics (time value of money).
 *
 * Conventions:
 * - Rates are decimal (e.g., 5% => 0.05) and are per-period unless otherwise noted.
 * - Signs follow cash-flow convention: money you receive now (positive PV) implies
 *   negative payments returned by PMT, and vice versa.
 */
export class FinancialCalculator {
    /**
     * Simple interest earned over time.
     * Formula: I = P * r * t
     * @param principal - Present amount P
     * @param rate - Periodic interest rate r (decimal)
     * @param time - Number of periods t (non-negative)
     * @throws Error if time is negative
     * @returns Interest amount I (excludes the original principal)
     */
    simpleInterest(principal: number, rate: number, time: number): number {
        this.assertNonNegative(time, 'time');
        return principal * rate * time;
    }

    /**
     * Compound interest earned over time with optional compounding frequency.
     * Interest only (excludes the original principal).
     * Formula: I = P * ((1 + r/n)^(n*t) - 1)
     * @param principal - Present amount P
     * @param rate - Nominal annual rate r (decimal)
     * @param time - Number of years t (non-negative)
     * @param compoundsPerYear - Compounding frequency n (defaults to 1)
     * @throws Error if time is negative or compoundsPerYear is not positive
     * @returns Interest amount I
     */
    compoundInterest(
        principal: number,
        rate: number,
        time: number,
        compoundsPerYear = 1,
    ): number {
        this.assertNonNegative(time, 'time');
        this.assertPositive(compoundsPerYear, 'compoundsPerYear');
        const base = 1 + rate / compoundsPerYear;
        return principal * (Math.pow(base, compoundsPerYear * time) - 1);
    }

    /**
     * Future value of a present principal with compounding.
     * Formula: FV = P * (1 + r/n)^(n*t)
     * @param principal - Present amount P
     * @param rate - Nominal annual rate r (decimal)
     * @param time - Number of years t (non-negative)
     * @param compoundsPerYear - Compounding frequency n (defaults to 1)
     * @throws Error if time is negative or compoundsPerYear is not positive
     * @returns Future value FV
     */
    futureValue(
        principal: number,
        rate: number,
        time: number,
        compoundsPerYear = 1,
    ): number {
        this.assertNonNegative(time, 'time');
        this.assertPositive(compoundsPerYear, 'compoundsPerYear');
        const base = 1 + rate / compoundsPerYear;
        return principal * Math.pow(base, compoundsPerYear * time);
    }

    /**
     * Present value of a future amount with compounding.
     * Formula: PV = FV / (1 + r/n)^(n*t)
     * @param futureValue - Future amount FV
     * @param rate - Nominal annual rate r (decimal)
     * @param time - Number of years t (non-negative)
     * @param compoundsPerYear - Compounding frequency n (defaults to 1)
     * @throws Error if time is negative or compoundsPerYear is not positive
     * @returns Present value PV
     */
    presentValue(
        futureValue: number,
        rate: number,
        time: number,
        compoundsPerYear = 1,
    ): number {
        this.assertNonNegative(time, 'time');
        this.assertPositive(compoundsPerYear, 'compoundsPerYear');
        const base = 1 + rate / compoundsPerYear;
        return futureValue / Math.pow(base, compoundsPerYear * time);
    }

    /**
     * Future value of an annuity (equal payments each period).
     * Ordinary annuity when timing is 'end', annuity due when 'begin'.
     * @param payment - Payment per period (PMT)
     * @param rate - Rate per period r (decimal)
     * @param periods - Number of periods n (non-negative integer)
     * @param timing - Payment timing ('end' | 'begin'), default 'end'
     * @throws Error if periods is negative
     * @returns Future value of the annuity at the end of the last period
     */
    futureValueOfAnnuity(
        payment: number,
        rate: number,
        periods: number,
        timing: PaymentTiming = 'end',
    ): number {
        this.assertNonNegative(periods, 'periods');
        if (periods === 0) return 0;
        if (rate === 0) return payment * periods;
        const factor = (Math.pow(1 + rate, periods) - 1) / rate;
        const timingAdj = timing === 'begin' ? 1 + rate : 1;
        return payment * factor * timingAdj;
    }

    /**
     * Present value of an annuity (equal payments each period).
     * Ordinary annuity when timing is 'end', annuity due when 'begin'.
     * @param payment - Payment per period (PMT)
     * @param rate - Rate per period r (decimal)
     * @param periods - Number of periods n (non-negative integer)
     * @param timing - Payment timing ('end' | 'begin'), default 'end'
     * @throws Error if periods is negative
     * @returns Present value of the annuity at period 0
     */
    presentValueOfAnnuity(
        payment: number,
        rate: number,
        periods: number,
        timing: PaymentTiming = 'end',
    ): number {
        this.assertNonNegative(periods, 'periods');
        if (periods === 0) return 0;
        if (rate === 0) return payment * periods;
        const factor = (1 - Math.pow(1 + rate, -periods)) / rate;
        const timingAdj = timing === 'begin' ? 1 + rate : 1;
        return payment * factor * timingAdj;
    }

    /**
     * Periodic payment amount for a loan or investment.
     * Mirrors the Excel PMT function signature and sign-convention.
     * @param rate - Rate per period r (decimal)
     * @param periods - Number of periods n (> 0)
     * @param presentValue - Present value PV (positive means cash received now)
     * @param futureValue - Future value FV (default 0)
     * @param timing - Payment timing ('end' | 'begin'), default 'end'
     * @throws Error if periods <= 0 or timing invalid
     * @returns Payment per period (PMT), sign depends on cash-flow signs
     */
    pmt(
        rate: number,
        periods: number,
        presentValue: number,
        futureValue = 0,
        timing: PaymentTiming = 'end',
    ): number {
        this.assertPositive(periods, 'periods');
        const timingAdj = timing === 'begin' ? 1 + rate : 1;
        if (rate === 0) {
            return -(presentValue + futureValue) / periods;
        }
        const pow = Math.pow(1 + rate, periods);
        const numerator = -rate * (presentValue * pow + futureValue);
        const denominator = timingAdj * (pow - 1);
        return numerator / denominator;
    }

    /**
     * Net Present Value (NPV) of a series of cash flows at a constant rate.
     * cashflows[0] is CF at t=0, cashflows[1] at t=1, etc.
     * @param rate - Discount rate per period r (decimal), must be > -1
     * @param cashflows - Array of cash flows including CF0
     * @throws Error if rate <= -1 or cashflows is empty
     * @returns NPV value
     */
    npv(rate: number, cashflows: number[]): number {
        if (rate <= -1) {
            throw new Error('rate must be greater than -1');
        }
        if (!cashflows.length) {
            throw new Error('cashflows cannot be empty');
        }
        let total = 0;
        for (let t = 0; t < cashflows.length; t++) {
            total += cashflows[t] / Math.pow(1 + rate, t);
        }
        return total;
    }

    /**
     * Internal Rate of Return (IRR) for a series of cash flows.
     * Uses a hybrid Newton-Raphson with bisection fallback for robustness.
     * @param cashflows - Array of cash flows including CF0 at t=0
     * @param guess - Initial guess for the rate (default 0.1 = 10%)
     * @param tol - Convergence tolerance for absolute NPV and delta, default 1e-7
     * @param maxIter - Maximum iterations for Newton step, default 100
     * @throws Error if unable to converge to a solution
     * @returns IRR as a decimal (e.g., 0.1234 for 12.34%)
     */
    irr(cashflows: number[], guess = 0.1, tol = 1e-7, maxIter = 100): number {
        if (!cashflows.length) {
            throw new Error('cashflows cannot be empty');
        }
        // Newton-Raphson
        let r = guess;
        for (let i = 0; i < maxIter; i++) {
            const { npv, dnpv } = this.npvAndDerivative(r, cashflows);
            if (Math.abs(npv) < tol) return r;
            if (dnpv === 0) break;
            const rNext = r - npv / dnpv;
            if (!isFinite(rNext) || rNext <= -0.999999) break;
            if (Math.abs(rNext - r) < tol) return rNext;
            r = rNext;
        }
        // Bisection fallback on a reasonable bracket
        let low = -0.999999; // cannot go to -1 exactly
        let high = 10; // up to 1000% per period; adjust if needed
        let npvLow = this.npv(low, cashflows);
        let npvHigh = this.npv(high, cashflows);
        // Expand high if no sign change and magnitudes are large
        let expandCount = 0;
        while (npvLow * npvHigh > 0 && expandCount < 10) {
            high *= 2;
            npvHigh = this.npv(high, cashflows);
            expandCount++;
            if (!isFinite(high)) break;
        }
        if (npvLow * npvHigh > 0) {
            throw new Error('IRR did not converge: could not bracket the root');
        }
        for (let i = 0; i < 200; i++) {
            const mid = (low + high) / 2;
            const npvMid = this.npv(mid, cashflows);
            if (Math.abs(npvMid) < tol) return mid;
            if (npvLow * npvMid <= 0) {
                high = mid;
                npvHigh = npvMid;
            } else {
                low = mid;
                npvLow = npvMid;
            }
            if (Math.abs(high - low) < tol) return (low + high) / 2;
        }
        throw new Error('IRR did not converge');
    }

    // ----- helpers -----

    private assertNonNegative(value: number, name: string) {
        if (value < 0) {
            throw new Error(`${name} must be non-negative.`);
        }
    }

    private assertPositive(value: number, name: string) {
        if (!(value > 0)) {
            throw new Error(`${name} must be positive.`);
        }
    }

    private npvAndDerivative(rate: number, cashflows: number[]) {
        const onePlusR = 1 + rate;
        if (onePlusR <= 0) {
            // Extremely negative rate; derivative undefined for our use.
            return { npv: Number.POSITIVE_INFINITY, dnpv: 0 };
        }
        let npv = 0;
        let dnpv = 0;
        for (let t = 0; t < cashflows.length; t++) {
            const denom = Math.pow(onePlusR, t);
            npv += cashflows[t] / denom;
            if (t > 0) {
                dnpv += (-t * cashflows[t]) / (denom * onePlusR);
            }
        }
        return { npv, dnpv };
    }
}
