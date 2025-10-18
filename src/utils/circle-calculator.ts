// circle-calculator.ts

/**
 * Calculator for circle measurements: area and perimeter.
 */
export class CircleCalculator {
    /**
     * Calculates the area of a circle.
     * @param radius - Radius of the circle (must be non-negative)
     * @throws Error if radius is negative
     * @returns Area of the circle (π * r^2)
     */
    area(radius: number): number {
        if (radius < 0) {
            throw new Error('Radius must be non-negative.');
        }
        return Math.PI * radius * radius;
    }

    /**
     * Calculates the perimeter (circumference) of a circle.
     * @param radius - Radius of the circle (must be non-negative)
     * @throws Error if radius is negative
     * @returns Perimeter of the circle (2 * π * r)
     */
    perimeter(radius: number): number {
        if (radius < 0) {
            throw new Error('Radius must be non-negative.');
        }
        return 2 * Math.PI * radius;
    }

    /**
     * Generic calculate method selecting between area or perimeter.
     * @param radius - Radius of the circle
     * @param type - 'area' or 'perimeter'
     * @throws Error if type is invalid
     * @returns Calculated value for the specified type
     */
    calculate(radius: number, type: 'area' | 'perimeter'): number {
        switch (type) {
            case 'area':
                return this.area(radius);
            case 'perimeter':
                return this.perimeter(radius);
            default:
                throw new Error(`Unsupported calculation type: ${type}`);
        }
    }
}
