/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Represents an Ethiopian date. (Added monthName back for compatibility if needed, but often derived)
 */
export interface EthiopianDate {
  day: number;
  month: number; // 1-based index (1=Meskerem, ..., 13=Pagumen)
  monthName: string; // Derived name based on month number and language
  year: number;
}

/**
* Input structure for Ethiopian date components.
*/
export interface EthiopianDateInput {
day: number;
month: number; // 1-based index (1=Meskerem, ..., 13=Pagumen)
year: number;
}

// Ethiopian month names (English)
export const ETHIOPIAN_MONTHS_EN: ReadonlyArray<string> = [
  'Meskerem', 'Tekemt', 'Hedar', 'Tahsas', 'Ter', 'Yekatit',
  'Megabit', 'Miyazya', 'Genbot', 'Sene', 'Hamle', 'Nehase', 'Pagumen',
];

// --- NEW: Amharic Month Names ---
export const ETHIOPIAN_MONTHS_AM: ReadonlyArray<string> = [
'መስከረም', 'ጥቅምት', 'ኅዳር', 'ታኅሣሥ', 'ጥር', 'የካቲት',
'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜን', // Adjusted spelling for Pagumen
];

// --- NEW: Day Names/Abbreviations (Used for calendar headers) ---
export const ETHIOPIAN_DAYS_EN: ReadonlyArray<string> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const ETHIOPIAN_DAYS_AM: ReadonlyArray<string> = ['እሑ', 'ሰኞ', 'ማክ', 'ረቡ', 'ሐሙ', 'ዓር', 'ቅዳ']; // Shortened for headers

// --- Existing Core Logic (isGregorianLeap, getEthiopianNewYearDayGC, isEthiopianLeap) ---

export function isGregorianLeap(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getEthiopianNewYearDayGC(gregYear: number): 11 | 12 {
  return isGregorianLeap(gregYear + 1) ? 12 : 11;
}

export function isEthiopianLeap(ethYear: number): boolean {
return (ethYear + 1) % 4 === 0;
}

// --- NEW: Helper Functions for Picker UI ---

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
  // Month 13 (Pagumen)
  return isEthiopianLeap(year) ? 6 : 5;
}

/**
* Gets the name of the Ethiopian month based on its number and language.
* @param month Ethiopian month number (1-13)
* @param lang Language ('en' or 'am')
* @returns The month name, or an empty string if invalid.
*/
export function getEthiopianMonthName(month: number, lang: 'am' | 'en' = 'en'): string {
if (month < 1 || month > 13) return '';
const names = lang === 'am' ? ETHIOPIAN_MONTHS_AM : ETHIOPIAN_MONTHS_EN;
return names[month - 1]; // Adjust for 0-based array index
}

/**
* Formats an Ethiopian date object into a display string.
* Example: "14 Miyazya 2016" or "14 ሚያዝያ 2016"
* @param ecDate Object with Ethiopian day, month, year
* @param lang Language ('en' or 'am')
* @returns Formatted date string, or empty string if input is null/undefined.
*/
export function formatEthiopianDateForDisplay(
ecDate: EthiopianDateInput | EthiopianDate | null | undefined,
lang: 'am' | 'en' = 'en'
): string {
if (!ecDate) return '';
const monthName = getEthiopianMonthName(ecDate.month, lang);
// Optional: Add Amharic numeral formatting here if needed
return `${ecDate.day} ${monthName} ${ecDate.year}`;
}


/**
* Generates select options for a range of Ethiopian years.
* @param currentEthYear The current Ethiopian year to center the range around.
* @param yearsBefore Number of years to show before the current year.
* @param yearsAfter Number of years to show after the current year.
* @param lang Language ('en' or 'am') - currently only affects label formatting if needed.
* @returns Array of { value: string; label: string } for Select components.
*/
export function getEthiopianYearOptions(
  currentEthYear: number,
  yearsBefore = 100,
  yearsAfter = 10,
  lang: 'am' | 'en' = 'en' // Placeholder for potential Amharic numeral formatting
): { value: string; label: string }[] {

  const startYear = currentEthYear - yearsBefore;
  const endYear = currentEthYear + yearsAfter;
  const options = [];

  for (let year = endYear; year >= startYear; year--) {
      // TODO: If Amharic numerals are desired for 'am' lang, format 'label' accordingly here.
      const yearStr = String(year);
      options.push({ value: yearStr, label: yearStr });
  }
  return options;
}


// --- Existing Core Conversion Functions (gregorianToEthiopian, ethiopianToGregorian) ---
// Keep your well-tested versions here. Only adding null checks for input Date.

/**
* Converts a Gregorian date to its Ethiopian calendar equivalent.
* Uses UTC internally to avoid timezone issues.
*
* @param gregorianDate The Gregorian date to convert. Can be null or undefined.
* @returns An object containing the Ethiopian day, month (1-based index), month name, and year, or null if input is null/invalid.
* @throws Error if the date calculation results in an invalid state (can be caught by caller).
*/
export function gregorianToEthiopian(gregorianDate: Date | null | undefined): EthiopianDate | null {
  if (!gregorianDate || isNaN(gregorianDate.getTime())) {
      return null; // Return null for invalid or null input
  }

  // Use UTC to avoid timezone and DST issues
  const gregYear = gregorianDate.getUTCFullYear();
  const gregMonth = gregorianDate.getUTCMonth(); // 0-11
  const gregDay = gregorianDate.getUTCDate();
  const inputDateUTC = Date.UTC(gregYear, gregMonth, gregDay);

  // --- Determine Ethiopian Year and Start Date ---
  let ethiopianYear: number;
  let startOfEthiopianYearUTC: number;

  const currentNewYearDayGC = getEthiopianNewYearDayGC(gregYear);
  const potentialNewYearUTC = Date.UTC(gregYear, 8, currentNewYearDayGC); // September is month 8

  if (inputDateUTC < potentialNewYearUTC) {
      ethiopianYear = gregYear - 8;
      const prevGregYear = gregYear - 1;
      const previousNewYearDayGC = getEthiopianNewYearDayGC(prevGregYear);
      startOfEthiopianYearUTC = Date.UTC(prevGregYear, 8, previousNewYearDayGC);
  } else {
      ethiopianYear = gregYear - 7;
      startOfEthiopianYearUTC = potentialNewYearUTC;
  }

  // --- Calculate Day Difference ---
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const dayOfEthiopianYear = Math.floor((inputDateUTC - startOfEthiopianYearUTC) / millisecondsPerDay) + 1;

  // --- Determine Ethiopian Month and Day ---
  let ethiopianMonth: number;
  let ethiopianDay: number;

  const isEthLeap = isEthiopianLeap(ethiopianYear);
  const daysInPagumen = isEthLeap ? 6 : 5;
  const daysInFirst12Months = 12 * 30;

  if (dayOfEthiopianYear > daysInFirst12Months) {
      ethiopianMonth = 13;
      ethiopianDay = dayOfEthiopianYear - daysInFirst12Months;
      if (ethiopianDay < 1 || ethiopianDay > daysInPagumen) {
          console.error("Calculation error details:", { /* ... */ }); // Keep your error logging
          throw new Error(`Calculated day (${ethiopianDay}) is invalid for Pagumen (${daysInPagumen} days) in Ethiopian year ${ethiopianYear}. Input: ${gregorianDate.toISOString()}`);
      }
  } else {
      ethiopianMonth = Math.floor((dayOfEthiopianYear - 1) / 30) + 1;
      ethiopianDay = ((dayOfEthiopianYear - 1) % 30) + 1;
  }

  // --- Get Month Name ---
  if (ethiopianMonth < 1 || ethiopianMonth > 13) {
       console.error("Calculation error details:", { /* ... */ }); // Keep your error logging
       throw new Error(`Calculated month (${ethiopianMonth}) is invalid. Input: ${gregorianDate.toISOString()}`);
  }
  // Derive month name using the new helper function (assuming English default if not specified)
  const ethiopianMonthName = getEthiopianMonthName(ethiopianMonth, 'en'); // Or pass lang if available

  return {
    day: ethiopianDay,
    month: ethiopianMonth,
    monthName: ethiopianMonthName, // Store derived name
    year: ethiopianYear,
  };
}

export function ethiopianToGregorian(ethDate: EthiopianDateInput | null | undefined): Date | null {
  if (!ethDate) {
      return null;
  }

  const { day: ethDay, month: ethMonth, year: ethYear } = ethDate;

  // --- Input Validation (Keep throwing for logically impossible dates) ---
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
      throw new Error(`Invalid Ethiopian day: ${ethDay} for Pagumen (Month 13) in year ${ethYear}. This year's Pagumen has ${daysInPagumen} days.`);
  }

  // --- Calculate Gregorian Date of Ethiopian New Year ---
  const gregYearOfNewYear = ethYear + 7;
  const newYearGregorianDay = getEthiopianNewYearDayGC(gregYearOfNewYear);
  const startOfEthiopianYearUTC = Date.UTC(gregYearOfNewYear, 8, newYearGregorianDay); // September is month 8

  // --- Calculate Offset in Days ---
  let dayOffset: number;
  if (ethMonth === 1) {
      dayOffset = ethDay - 1;
  } else if (ethMonth <= 12) {
      dayOffset = (ethMonth - 1) * 30 + (ethDay - 1);
  } else { // Pagumen (month 13)
      dayOffset = 12 * 30 + (ethDay - 1);
  }

  // --- Calculate Target Gregorian Date ---
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const targetGregorianUTCms = startOfEthiopianYearUTC + (dayOffset * millisecondsPerDay);

  const resultDate = new Date(targetGregorianUTCms);
  // Final check if date calculation resulted in a valid Date object
  if (isNaN(resultDate.getTime())) {
      console.error("Ethiopian to Gregorian calculation resulted in invalid date", { ethDate, targetGregorianUTCms });
      // This shouldn't happen if input validation and logic are correct, but as a safeguard:
      throw new Error("Failed to calculate a valid Gregorian date from the provided Ethiopian date.");
      // Alternatively, return null here if you prefer not to throw in this specific case
      // return null;
  }

  return resultDate;
}


/**
 * Calculates the weekday of the first day of a given Ethiopian month.
 * @param year Ethiopian year
 * @param month Ethiopian month (1-13)
 * @returns Weekday number (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
 *          Returns 0 if conversion fails.
 */
export const getEthiopianFirstDayOfMonthWeekday = (year: number, month: number): number => {
  try {
    const firstDayOfMonthEC: EthiopianDateInput = { year, month, day: 1 };
    const firstDayGC = ethiopianToGregorian(firstDayOfMonthEC);

    if (firstDayGC && !isNaN(firstDayGC.getTime())) {
      // Use getUTCDay() for consistency if dates are treated as UTC
      // Use getDay() if dates are treated as local time
      return firstDayGC.getUTCDay(); // 0 = Sunday, 1 = Monday, ...
    } else {
      console.error(`Failed to convert EC date ${year}-${month}-1 to Gregorian.`);
      return 0; // Default fallback
    }
  } catch (error) {
    console.error(`Error calculating first day weekday for ${year}-${month}:`, error);
    return 0; // Default fallback
  }
};


export const calculateDateOfBirth = (
  ageInput: number | string | null | undefined
): string | null => {
  if (ageInput === null || ageInput === undefined || ageInput === '') {
    console.warn('calculateDateOfBirth: Age input is empty.');
    return null;
  }

  const age = typeof ageInput === 'string' ? parseInt(ageInput, 10) : ageInput;

  if (isNaN(age) || age < 0) {
    console.warn(
      `calculateDateOfBirth: Invalid age provided: '${ageInput}'. Must be a non-negative number.`
    );
    return null;
  }

  try {
    const currentDate = new Date();
    // Simple calculation: Subtract age from current year, keep current month/day
    const birthYear = currentDate.getFullYear() - age;

    // Use UTC to avoid timezone offsets potentially shifting the date during formatting
    // Note: Months are 0-indexed in JavaScript Date objects (0 = January)
    const estimatedBirthDate = new Date(
      Date.UTC(birthYear, currentDate.getUTCMonth(), currentDate.getUTCDate())
    );

    // Check if the created date is valid (e.g., handles potential invalid inputs indirectly)
    if (isNaN(estimatedBirthDate.getTime())) {
        console.error('calculateDateOfBirth: Failed to create a valid Date object.');
        return null;
    }

    // Format to YYYY-MM-DD
    const dobString = estimatedBirthDate.toISOString().split('T')[0];
    return dobString;
  } catch (error) {
    console.error('calculateDateOfBirth: Error during calculation:', error);
    return null;
  }
};

/**
 * Calculates the current age based on a given Date of Birth.
 *
 * @param dateOfBirth The Date of Birth, either as a Date object or a string (e.g., 'YYYY-MM-DD').
 * @returns The calculated age as a number, or null if the input is invalid.
 */
export const calculateAge = (
  dateOfBirth: Date | string | null | undefined
): number | null => {
  if (!dateOfBirth) {
    console.warn('calculateAge: Date of Birth input is empty.');
    return null;
  }

  let birthDate: Date;

  try {
    // Attempt to create a Date object from the input
    if (dateOfBirth instanceof Date) {
      birthDate = dateOfBirth;
    } else if (typeof dateOfBirth === 'string') {
      // Try creating date from string. Be mindful of potential timezone issues
      // depending on string format. 'YYYY-MM-DD' is generally interpreted as UTC midnight.
      birthDate = new Date(dateOfBirth);
    } else {
        console.warn('calculateAge: Invalid input type for dateOfBirth.');
        return null; // Should not happen with TS typings but good safeguard
    }

    // Check if the resulting Date object is valid
    if (isNaN(birthDate.getTime())) {
      console.warn(`calculateAge: Invalid Date of Birth provided: '${dateOfBirth}'`);
      return null;
    }

    const today = new Date();

    // Basic age calculation
    let age = today.getFullYear() - birthDate.getFullYear();

    // Adjust age if the birthday hasn't occurred yet this year
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    // Ensure age is not negative (e.g., if DOB is in the future)
    return Math.max(0, age);

  } catch (error) {
    console.error('calculateAge: Error during calculation:', error);
    return null;
  }
};

// --- Example Usage (Optional: Can be removed or kept for testing) ---
/*
console.log("DOB from age 30:", calculateDateOfBirth(30)); // e.g., "1994-05-16" (depends on current date)
console.log("DOB from age '25':", calculateDateOfBirth('25'));
console.log("DOB from age 0:", calculateDateOfBirth(0));
console.log("DOB from invalid age:", calculateDateOfBirth(-5)); // null
console.log("DOB from null age:", calculateDateOfBirth(null)); // null

console.log("Age from '1990-01-15':", calculateAge('1990-01-15')); // e.g., 34 (depends on current date)
console.log("Age from Date object:", calculateAge(new Date(1985, 10, 5))); // (Nov 5, 1985) -> e.g., 38
console.log("Age from future date:", calculateAge('2050-01-01')); // 0
console.log("Age from invalid date string:", calculateAge('invalid-date')); // null
console.log("Age from null date:", calculateAge(null)); // null
*/