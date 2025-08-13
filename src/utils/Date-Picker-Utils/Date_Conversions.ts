import type { EthiopianDate, EthiopianDateInput } from './Date_Types';

/**
 * Determines if a Gregorian year is a leap year.
 * @param year Gregorian year
 * @returns True if leap year, false otherwise
 */
export function isGregorianLeap(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Gets the Gregorian day of the Ethiopian New Year (Meskerem 1).
 * @param gregYear Gregorian year
 * @returns 11 or 12, depending on leap year status
 */
export function getEthiopianNewYearDayGC(gregYear: number): 11 | 12 {
    return isGregorianLeap(gregYear + 1) ? 12 : 11;
}

/**
 * Determines if an Ethiopian year is a leap year.
 * @param ethYear Ethiopian year
 * @returns True if leap year, false otherwise
 */
export function isEthiopianLeap(ethYear: number): boolean {
    return (ethYear + 1) % 4 === 0;
}

/**
 * Converts a Gregorian date to its Ethiopian calendar equivalent.
 * Uses UTC internally to avoid timezone issues.
 * @param gregorianDate The Gregorian date to convert. Can be null or undefined.
 * @returns An EthiopianDate object or null if input is invalid.
 * @throws Error if the date calculation results in an invalid state.
 */
export function gregorianToEthiopian(gregorianDate: Date | null | undefined): EthiopianDate | null {
    if (!gregorianDate || isNaN(gregorianDate.getTime())) {
        return null;
    }

    const gregYear = gregorianDate.getUTCFullYear();
    const gregMonth = gregorianDate.getUTCMonth();
    const gregDay = gregorianDate.getUTCDate();
    const inputDateUTC = Date.UTC(gregYear, gregMonth, gregDay);

    let ethiopianYear: number;
    let startOfEthiopianYearUTC: number;

    const currentNewYearDayGC = getEthiopianNewYearDayGC(gregYear);
    const potentialNewYearUTC = Date.UTC(gregYear, 8, currentNewYearDayGC);

    if (inputDateUTC < potentialNewYearUTC) {
        ethiopianYear = gregYear - 8;
        const prevGregYear = gregYear - 1;
        const previousNewYearDayGC = getEthiopianNewYearDayGC(prevGregYear);
        startOfEthiopianYearUTC = Date.UTC(prevGregYear, 8, previousNewYearDayGC);
    } else {
        ethiopianYear = gregYear - 7;
        startOfEthiopianYearUTC = potentialNewYearUTC;
    }

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const dayOfEthiopianYear = Math.floor((inputDateUTC - startOfEthiopianYearUTC) / millisecondsPerDay) + 1;

    let ethiopianMonth: number;
    let ethiopianDay: number;

    const isEthLeap = isEthiopianLeap(ethiopianYear);
    const daysInPagumen = isEthLeap ? 6 : 5;
    const daysInFirst12Months = 12 * 30;

    if (dayOfEthiopianYear > daysInFirst12Months) {
        ethiopianMonth = 13;
        ethiopianDay = dayOfEthiopianYear - daysInFirst12Months;
        if (ethiopianDay < 1 || ethiopianDay > daysInPagumen) {
            throw new Error(
                `Calculated day (${ethiopianDay}) is invalid for Pagumen (${daysInPagumen} days) in Ethiopian year ${ethiopianYear}. Input: ${gregorianDate.toISOString()}`
            );
        }
    } else {
        ethiopianMonth = Math.floor((dayOfEthiopianYear - 1) / 30) + 1;
        ethiopianDay = ((dayOfEthiopianYear - 1) % 30) + 1;
    }

    if (ethiopianMonth < 1 || ethiopianMonth > 13) {
        throw new Error(
            `Calculated month (${ethiopianMonth}) is invalid. Input: ${gregorianDate.toISOString()}`
        );
    }

    return {
        day: ethiopianDay,
        month: ethiopianMonth,
        monthName: '', // Month name to be set by UI utilities
        year: ethiopianYear,
    };
}

/**
 * Converts an Ethiopian date to its Gregorian calendar equivalent.
 * @param ethDate The Ethiopian date to convert. Can be null or undefined.
 * @returns A Date object or null if input is invalid.
 * @throws Error if the date is logically impossible.
 */
export function ethiopianToGregorian(ethDate: EthiopianDateInput | null | undefined): Date | null {
    if (!ethDate) {
        return null;
    }

    const { day: ethDay, month: ethMonth, year: ethYear } = ethDate;

    if (ethMonth < 1 || ethMonth > 13) {
        throw new Error(`Invalid Ethiopian month: ${ethMonth}. Month must be between 1 and 13.`);
    }
    if (ethDay < 1) {
        throw new Error(`Invalid Ethiopian day: ${ethDay}. Day must be 1 or greater.`);
    }

    const isLeap = isEthiopianLeap(ethYear);
    const daysInPagumen = isLeap ? 6 : 5;

    if (ethMonth <= 12 && ethDay > 30) {
        throw new Error(`Invalid Ethiopian day: ${ethDay} for month ${ethMonth}. Months 1-12 have 30 days.`);
    }
    if (ethMonth === 13 && ethDay > daysInPagumen) {
        throw new Error(
            `Invalid Ethiopian day: ${ethDay} for Pagumen (Month 13) in year ${ethYear}. This year's Pagumen has ${daysInPagumen} days.`
        );
    }

    const gregYearOfNewYear = ethYear + 7;
    const newYearGregorianDay = getEthiopianNewYearDayGC(gregYearOfNewYear);
    const startOfEthiopianYearUTC = Date.UTC(gregYearOfNewYear, 8, newYearGregorianDay);

    let dayOffset: number;
    if (ethMonth === 1) {
        dayOffset = ethDay - 1;
    } else if (ethMonth <= 12) {
        dayOffset = (ethMonth - 1) * 30 + (ethDay - 1);
    } else {
        dayOffset = 12 * 30 + (ethDay - 1);
    }

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const targetGregorianUTCms = startOfEthiopianYearUTC + dayOffset * millisecondsPerDay;

    const resultDate = new Date(targetGregorianUTCms);
    if (isNaN(resultDate.getTime())) {
        throw new Error(
            `Failed to calculate a valid Gregorian date from Ethiopian date: ${ethYear}-${ethMonth}-${ethDay}.`
        );
    }

    return resultDate;
}