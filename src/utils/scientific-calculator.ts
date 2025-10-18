// scientific-calculator.ts

/**
 * Scientific calculator providing trigonometric operations.
 * Includes sine, cosine and tangent functions.
 */
export class ScientificCalculator {
    /**
     * Calculates the sine of an angle.
     * @param x - Angle value; interpreted as radians by default
     * @param inDegrees - When true, interpret x as degrees (default: false)
     * @returns The sine of the angle (sin(x))
     */
    sin(x: number, inDegrees: boolean = false): number {
        const radians = inDegrees ? (x * Math.PI) / 180 : x;
        return Math.sin(radians);
    }

    /**
     * Calculates the cosine of an angle.
     * @param x - Angle value; interpreted as radians by default
     * @param inDegrees - When true, interpret x as degrees (default: false)
     * @returns The cosine of the angle (cos(x))
     */
    cos(x: number, inDegrees: boolean = false): number {
        const radians = inDegrees ? (x * Math.PI) / 180 : x;
        return Math.cos(radians);
    }

    /**
     * Calculates the tangent of an angle.
     * @param x - Angle value; interpreted as radians by default
     * @param inDegrees - When true, interpret x as degrees (default: false)
     * @returns The tangent of the angle (tan(x))
     */
    tan(x: number, inDegrees: boolean = false): number {
        const radians = inDegrees ? (x * Math.PI) / 180 : x;
        return Math.tan(radians);
    }
}
