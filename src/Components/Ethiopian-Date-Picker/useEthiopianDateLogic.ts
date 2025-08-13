/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useMemo, useCallback } from 'react';
// import {
//     gregorianToEthiopian,
//     ethiopianToGregorian,
//     getDaysInEthiopianMonth,
//     ETHIOPIAN_MONTHS_EN,
//     ETHIOPIAN_MONTHS_AM,
//     ETHIOPIAN_DAYS_EN,
//     ETHIOPIAN_DAYS_AM,
//     formatEthiopianDateForDisplay,
//     getEthiopianYearOptions,
//     getEthiopianFirstDayOfMonthWeekday,
//     type EthiopianDate,
//     type EthiopianDateInput,
// } from '../../utils/Date_Utils';

import type { EthiopianDate, EthiopianDateInput } from '../../utils/Date-Picker-Utils/Date_Types';
import { gregorianToEthiopian, ethiopianToGregorian } from '../../utils/Date-Picker-Utils/Date_Conversions';
import {
    getDaysInEthiopianMonth,
    ETHIOPIAN_MONTHS_EN,
    ETHIOPIAN_MONTHS_AM,
    ETHIOPIAN_DAYS_EN,
    ETHIOPIAN_DAYS_AM,
    formatEthiopianDateForDisplay,
    getEthiopianYearOptions,
    getEthiopianFirstDayOfMonthWeekday,
} from '../../utils/Date-Picker-Utils/Date_Picker_Utils';

interface UseEthiopianDateLogicProps {
    value: string | null | undefined;
    onChange: (gregorianDateString: string | null) => void;
    currentLanguage: 'am' | 'en';
    allowFutureDates?: boolean;
    initialCalendarViewOffsetDays?: number;
    disableDatesNewerThanDays?: number;
    togglePopover: () => void;
}

// interface EthiopianDate {
//     year: number;
//     month: number;
//     day: number;
//     monthName: string;
// }

const isEthiopianDateBefore = (
    date1: EthiopianDate | null | undefined,
    date2: EthiopianDate | null | undefined
): boolean => {
    if (!date1 || !date2) return false;
    if (date1.year < date2.year) return true;
    if (date1.year > date2.year) return false;
    if (date1.month < date2.month) return true;
    if (date1.month > date2.month) return false;
    return date1.day < date2.day;
};

export const useEthiopianDateLogic = ({
    value,
    onChange,
    currentLanguage,
    allowFutureDates,
    initialCalendarViewOffsetDays,
    disableDatesNewerThanDays,
    togglePopover
}: UseEthiopianDateLogicProps) => {
    const [viewYear, setViewYear] = useState<number>(0);
    const [viewMonth, setViewMonth] = useState<number>(1);
    const [tempSelectedDay, setTempSelectedDay] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState('');

    // Date Calculations
    const todayAtStartOfDay = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    const currentEthDate = useMemo(
        () => gregorianToEthiopian(todayAtStartOfDay),
        [todayAtStartOfDay]
    );

    const todayEcYear = currentEthDate?.year ?? new Date(todayAtStartOfDay).getFullYear() - 8;
    const todayEcMonth = currentEthDate?.month ?? 1;

    const maxSelectableGregorianDate = useMemo(() => {
        if (disableDatesNewerThanDays !== undefined && disableDatesNewerThanDays >= 0) {
            const maxDate = new Date(todayAtStartOfDay);
            maxDate.setDate(todayAtStartOfDay.getDate() - disableDatesNewerThanDays);
            return maxDate;
        }
        if (!allowFutureDates) {
            return todayAtStartOfDay;
        }
        return null;
    }, [disableDatesNewerThanDays, allowFutureDates, todayAtStartOfDay]);

    const maxSelectableEthDate = useMemo(() => {
        if (!maxSelectableGregorianDate) return null;
        try {
            return gregorianToEthiopian(maxSelectableGregorianDate);
        } catch (e) {
            console.error('Error converting maxSelectableGregorianDate to EthiopianDate:', e);
            return null;
        }
    }, [maxSelectableGregorianDate]);

    const selectedECDate = useMemo(() => {
        if (!value) return null;
        try {
            const date = new Date(value);
            if (isNaN(date.getTime())) return null;
            return gregorianToEthiopian(date);
        } catch (e) {
            console.error("Error converting prop 'value' to EthiopianDate:", e);
            return null;
        }
    }, [value]);

    // Effects
    useEffect(() => {
        let newViewYear = selectedECDate?.year ?? todayEcYear;
        let newViewMonth = selectedECDate?.month ?? todayEcMonth;

        if (initialCalendarViewOffsetDays !== undefined && initialCalendarViewOffsetDays >= 0) {
            const offsetDateG = new Date(todayAtStartOfDay);
            offsetDateG.setDate(todayAtStartOfDay.getDate() - initialCalendarViewOffsetDays);
            const offsetDateEC = gregorianToEthiopian(offsetDateG);
            newViewYear = offsetDateEC?.year ?? todayEcYear;
            newViewMonth = offsetDateEC?.month ?? todayEcMonth;
        }

        if (maxSelectableEthDate) {
            if (
                newViewYear > maxSelectableEthDate.year ||
                (newViewYear === maxSelectableEthDate.year && newViewMonth > maxSelectableEthDate.month)
            ) {
                newViewYear = maxSelectableEthDate.year;
                newViewMonth = maxSelectableEthDate.month;
            }
        }

        setViewYear(newViewYear);
        setViewMonth(newViewMonth);
        setTempSelectedDay(
            selectedECDate?.year === newViewYear && selectedECDate?.month === newViewMonth
                ? selectedECDate.day
                : null
        );
    }, [selectedECDate, initialCalendarViewOffsetDays, maxSelectableEthDate, todayEcYear, todayEcMonth, todayAtStartOfDay]);

    useEffect(() => {
        setInputValue(selectedECDate ? formatEthiopianDateForDisplay(selectedECDate, currentLanguage) : '');
    }, [selectedECDate, currentLanguage]);

    // Callbacks
    const isDayDisabled = useCallback(
        (day: number, checkYear: number, checkMonth: number): boolean => {
            const targetEthDate: EthiopianDate = { year: checkYear, month: checkMonth, day, monthName: '' };
            return maxSelectableEthDate ? isEthiopianDateBefore(maxSelectableEthDate, targetEthDate) : false;
        },
        [maxSelectableEthDate]
    );

    const handleDayClick = useCallback(
        (day: number) => {
            if (!isDayDisabled(day, viewYear, viewMonth)) {
                setTempSelectedDay(day);
            }
        },
        [viewYear, viewMonth, isDayDisabled]
    );

    const handleMonthChange = useCallback(
        (newMonthStr: string | null) => {
            if (!newMonthStr) return;
            const newMonth = Number(newMonthStr);
            let clampedMonth = newMonth;
            if (maxSelectableEthDate && viewYear === maxSelectableEthDate.year && newMonth > maxSelectableEthDate.month) {
                clampedMonth = maxSelectableEthDate.month;
            }
            setViewMonth(clampedMonth);
            setTempSelectedDay(null);
        },
        [viewYear, maxSelectableEthDate]
    );

    const handleYearChange = useCallback(
        (newYearStr: string | null) => {
            if (!newYearStr) return;
            const newYear = Number(newYearStr);
            let finalYear = newYear;
            let finalMonth = viewMonth;

            if (maxSelectableEthDate) {
                if (newYear > maxSelectableEthDate.year) {
                    finalYear = maxSelectableEthDate.year;
                    finalMonth = Math.min(viewMonth, maxSelectableEthDate.month);
                } else if (newYear === maxSelectableEthDate.year && viewMonth > maxSelectableEthDate.month) {
                    finalMonth = maxSelectableEthDate.month;
                }
            }

            setViewYear(finalYear);
            setViewMonth(finalMonth);
            setTempSelectedDay(null);
        },
        [viewMonth, maxSelectableEthDate]
    );

    const changeMonth = useCallback(
        (offset: number) => {
            let newViewMonth = viewMonth + offset;
            let newViewYear = viewYear;

            if (newViewMonth > 13) {
                newViewMonth = 1;
                newViewYear++;
            } else if (newViewMonth < 1) {
                newViewMonth = 13;
                newViewYear--;
            }

            if (
                maxSelectableEthDate &&
                (newViewYear > maxSelectableEthDate.year ||
                    (newViewYear === maxSelectableEthDate.year && newViewMonth > maxSelectableEthDate.month))
            ) {
                return;
            }

            setViewYear(newViewYear);
            setViewMonth(newViewMonth);
            setTempSelectedDay(null);
        },
        [viewMonth, viewYear, maxSelectableEthDate]
    );

    const handleSetDate = useCallback(() => {
        if (tempSelectedDay === null || isDayDisabled(tempSelectedDay, viewYear, viewMonth)) return;

        try {
            const ethInput: EthiopianDateInput = { day: tempSelectedDay, month: viewMonth, year: viewYear };
            const gregorianDate = ethiopianToGregorian(ethInput);
            if (gregorianDate && !isNaN(gregorianDate.getTime())) {
                const year = gregorianDate.getUTCFullYear();
                const month = (gregorianDate.getUTCMonth() + 1).toString().padStart(2, '0');
                const dayStr = gregorianDate.getUTCDate().toString().padStart(2, '0');
                onChange(`${year}-${month}-${dayStr}`);
            }
            togglePopover()
        } catch (error) {
            togglePopover()
            console.error('Error in handleSetDate:', error);
        }
    }, [tempSelectedDay, viewMonth, viewYear, onChange, isDayDisabled]);

    const handleClearDate = useCallback(() => {
        onChange(null);
        setTempSelectedDay(null);
    }, [onChange]);

    // Options
    const yearOptions = useMemo(() => {
        const pastYearsRange = 100;
        const futureYearsRange = todayEcYear - (todayEcYear - 100) + 10;
        return getEthiopianYearOptions(todayEcYear, pastYearsRange, futureYearsRange, currentLanguage).filter(
            (opt) => !maxSelectableEthDate || Number(opt.value) <= maxSelectableEthDate.year
        );
    }, [todayEcYear, currentLanguage, maxSelectableEthDate]);

    const monthOptions = useMemo(() => {
        const months = currentLanguage === 'am' ? ETHIOPIAN_MONTHS_AM : ETHIOPIAN_MONTHS_EN;
        return months.map((name: string, index: number) => {
            const monthNumber = index + 1;
            const isDisabled =
                maxSelectableEthDate &&
                (viewYear > maxSelectableEthDate.year ||
                    (viewYear === maxSelectableEthDate.year && monthNumber > maxSelectableEthDate.month));
            return { value: String(monthNumber), label: name, disabled: !!isDisabled };
        });
    }, [currentLanguage, viewYear, maxSelectableEthDate]);

    const dayHeaders = useMemo(
        () => (currentLanguage === 'am' ? ETHIOPIAN_DAYS_AM : ETHIOPIAN_DAYS_EN),
        [currentLanguage]
    );

    const daysInMonth = useMemo(() => {
        try {
            return getDaysInEthiopianMonth(viewYear, viewMonth);
        } catch (e) {
            return 0;
        }
    }, [viewYear, viewMonth]);

    const firstDayWeekday = useMemo(() => {
        try {
            return getEthiopianFirstDayOfMonthWeekday(viewYear, viewMonth);
        } catch (e) {
            return 0;
        }
    }, [viewYear, viewMonth]);

    const isNextMonthNavDisabled = useMemo(() => {
        if (!maxSelectableEthDate) return false;
        const nextMonth = viewMonth + 1 > 13 ? 1 : viewMonth + 1;
        const nextYear = viewMonth + 1 > 13 ? viewYear + 1 : viewYear;
        return (
            nextYear > maxSelectableEthDate.year ||
            (nextYear === maxSelectableEthDate.year && nextMonth > maxSelectableEthDate.month)
        );
    }, [viewMonth, viewYear, maxSelectableEthDate]);

    return {
        viewYear,
        viewMonth,
        tempSelectedDay,
        inputValue,
        selectedECDate,
        monthOptions,
        yearOptions,
        dayHeaders,
        daysInMonth,
        firstDayWeekday,
        isNextMonthNavDisabled,
        isDayDisabled,
        handleDayClick,
        handleMonthChange,
        handleYearChange,
        changeMonth,
        handleSetDate,
        handleClearDate,
    };
};