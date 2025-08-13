/* eslint-disable @typescript-eslint/no-unused-vars */
import type { EthiopianDate, EthiopianDateInput } from './Date_Types';
import { isEthiopianLeap } from './Date_Conversions';
import { ethiopianToGregorian } from './Date_Conversions';

// Ethiopian month and day names
export const ETHIOPIAN_MONTHS_EN: Readonly<string[]> = [
    'Meskerem', 'Tekemt', 'Hedar', 'Tahsas', 'Ter', 'Yekatit',
    'Megabit', 'Miyazya', 'Genbot', 'Sene', 'Hamle', 'Nehase', 'Pagumen',
];

export const ETHIOPIAN_MONTHS_AM: Readonly<string[]> = [
    'መስከረም', 'ጥቅምት', 'ኅዳር', 'ታኅሣሥ', 'ጥር', 'የካቲት',
    'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜን',
];

export const ETHIOPIAN_DAYS_EN: Readonly<string[]> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const ETHIOPIAN_DAYS_AM: Readonly<string[]> = ['እሑ', 'ሰኞ', 'ማክ', 'ረቡ', 'ሐሙ', 'ዓር', 'ቅዳ'];

/**
 * Gets the number of days in a specific Ethiopian month and year.
 * @param year Ethiopian year
 * @param month Ethiopian month (1-13)
 * @returns Number of days (30, 5, or 6)
 * @throws Error if month is invalid
 */
export function getDaysInEthiopianMonth(year: number, month: number): number {
    if (month < 1 || month > 13) {
        throw new Error(`Invalid Ethiopian month: ${month}`);
    }
    if (month <= 12) {
        return 30;
    }
    return isEthiopianLeap(year) ? 6 : 5;
}

/**
 * Gets the name of the Ethiopian month based on its number and language.
 * @param month Ethiopian month number (1-13)
 * @param lang Language ('en' or 'am')
 * @returns The month name, or an empty string if invalid
 */
export function getEthiopianMonthName(month: number, lang: 'am' | 'en' = 'en'): string {
    if (month < 1 || month > 13) return '';
    const names = lang === 'am' ? ETHIOPIAN_MONTHS_AM : ETHIOPIAN_MONTHS_EN;
    return names[month - 1];
}

/**
 * Formats an Ethiopian date object into a display string.
 * @param ecDate Object with Ethiopian day, month, year
 * @param lang Language ('en' or 'am')
 * @returns Formatted date string, or empty string if input is invalid
 */
export function formatEthiopianDateForDisplay(
    ecDate: EthiopianDateInput | EthiopianDate | null | undefined,
    lang: 'am' | 'en' = 'en'
): string {
    if (!ecDate) return '';
    const monthName = getEthiopianMonthName(ecDate.month, lang);
    return `${ecDate.day} ${monthName} ${ecDate.year}`;
}

/**
 * Generates select options for a range of Ethiopian years.
 * @param currentEthYear The current Ethiopian year
 * @param yearsBefore Number of years before the current year
 * @param yearsAfter Number of years after the current year
 * @param lang Language ('en' or 'am')
 * @returns Array of select options
 */
export function getEthiopianYearOptions(
    currentEthYear: number,
    yearsBefore = 100,
    yearsAfter = 10,
    lang: 'am' | 'en' = 'en'
): { value: string; label: string }[] {
    const startYear = currentEthYear - yearsBefore;
    const endYear = currentEthYear + yearsAfter;
    const options: { value: string; label: string }[] = [];

    for (let year = endYear; year >= startYear; year--) {
        const yearStr = String(year);
        options.push({ value: yearStr, label: yearStr });
    }
    return options;
}

/**
 * Calculates the weekday of the first day of a given Ethiopian month.
 * @param year Ethiopian year
 * @param month Ethiopian month (1-13)
 * @returns Weekday number (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
 */
export function getEthiopianFirstDayOfMonthWeekday(year: number, month: number): number {
    try {
        const firstDayOfMonthEC: EthiopianDateInput = { year, month, day: 1 };
        const firstDayGC = ethiopianToGregorian(firstDayOfMonthEC);
        if (firstDayGC && !isNaN(firstDayGC.getTime())) {
            return firstDayGC.getUTCDay();
        }
        console.error(`Failed to convert EC date ${year}-${month}-1 to Gregorian.`);
        return 0;
    } catch (error) {
        console.error(`Error calculating first day weekday for ${year}-${month}:`, error);
        return 0;
    }
}