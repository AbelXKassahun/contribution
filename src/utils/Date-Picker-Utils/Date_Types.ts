/**
 * Represents an Ethiopian date.
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