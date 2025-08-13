/**
 * Calculates the date of birth based on a given age.
 * @param ageInput The age as a number or string
 * @returns A date string in YYYY-MM-DD format, or null if invalid
 */
export function calculateDateOfBirth(ageInput: number | string | null | undefined): string | null {
    if (ageInput === null || ageInput === undefined || ageInput === '') {
        console.warn('calculateDateOfBirth: Age input is empty.');
        return null;
    }

    const age = typeof ageInput === 'string' ? parseInt(ageInput, 10) : ageInput;

    if (isNaN(age) || age < 0) {
        console.warn(`calculateDateOfBirth: Invalid age provided: '${ageInput}'. Must be a non-negative number.`);
        return null;
    }

    try {
        const currentDate = new Date();
        const birthYear = currentDate.getFullYear() - age;
        const estimatedBirthDate = new Date(
            Date.UTC(birthYear, currentDate.getUTCMonth(), currentDate.getUTCDate())
        );

        if (isNaN(estimatedBirthDate.getTime())) {
            console.error('calculateDateOfBirth: Failed to create a valid Date object.');
            return null;
        }

        return estimatedBirthDate.toISOString().split('T')[0];
    } catch (error) {
        console.error('calculateDateOfBirth: Error during calculation:', error);
        return null;
    }
}

/**
 * Calculates the current age based on a given date of birth.
 * @param dateOfBirth The date of birth as a Date object or string
 * @returns The calculated age, or null if invalid
 */
export function calculateAge(dateOfBirth: Date | string | null | undefined): number | null {
    if (!dateOfBirth) {
        console.warn('calculateAge: Date of Birth input is empty.');
        return null;
    }

    let birthDate: Date;

    try {
        if (dateOfBirth instanceof Date) {
            birthDate = dateOfBirth;
        } else {
            birthDate = new Date(dateOfBirth);
        }

        if (isNaN(birthDate.getTime())) {
            console.warn(`calculateAge: Invalid Date of Birth provided: '${dateOfBirth}'`);
            return null;
        }

        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return Math.max(0, age);
    } catch (error) {
        console.error('calculateAge: Error during calculation:', error);
        return null;
    }
}