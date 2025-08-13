import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Popover } from '../../../libs';
import { DateInput } from './Date_Input';
import { CalendarHeader } from './Calendar_Header';
import { CalendarGrid } from './Calendar_Grid';
import { CalendarFooter } from './Calendar_Footer';
import { useEthiopianDateLogic } from './useEthiopianDateLogic';
// import type { EthiopianDate } from '../../utils/dateUtils';

// Types
interface CustomEthiopianDatePickerProps {
    value: string | null | undefined;
    onChange: (gregorianDateString: string | null) => void;
    label?: React.ReactNode;
    placeholder?: string;
    error?: React.ReactNode;
    withAsterisk?: boolean;
    disabled?: boolean;
    size?: 'sm' | 'xs' | 'xxs';
    inputSize?: 'sm' | 'xs' | 'md' | 'lg' | 'xl';
    inputRadius?: string;
    mb?: number | string;
    width?: number | string;
    allowFutureDates?: boolean;
    initialCalendarViewOffsetDays?: number;
    disableDatesNewerThanDays?: number;
}

export interface SizingConfig {
    popoverWidth: number;
    headerSpacing: number | string;
    navIconSize: string;
    navIconInnerSize: string;
    dayButtonHeight: number;
    dayButtonPadding: number;
    dayGridGutter: number;
    footerSpacing: string;
    footerButtonSize: string;
    inputSize: string;
    monthSelectMinWidth: number;
    yearSelectMinWidth: number;
}

// Sizing Configuration
const getSizingConfig = (size: 'sm' | 'xs' | 'xxs' | undefined): SizingConfig => {
    switch (size) {
        case 'xxs':
            return {
                popoverWidth: 200,
                headerSpacing: 4,
                navIconSize: 'sm',
                navIconInnerSize: '0.875rem',
                dayButtonHeight: 22,
                dayButtonPadding: 2,
                dayGridGutter: 2,
                footerSpacing: 'xs',
                footerButtonSize: 'xs',
                inputSize: 'xs',
                monthSelectMinWidth: 70,
                yearSelectMinWidth: 60,
            };
        case 'xs':
            return {
                popoverWidth: 240,
                headerSpacing: 8,
                navIconSize: 'md',
                navIconInnerSize: '1rem',
                dayButtonHeight: 26,
                dayButtonPadding: 4,
                dayGridGutter: 2,
                footerSpacing: 'sm',
                footerButtonSize: 'xs',
                inputSize: 'xs',
                monthSelectMinWidth: 85,
                yearSelectMinWidth: 70,
            };
        default:
            return {
                popoverWidth: 320,
                headerSpacing: 'sm',
                navIconSize: 'lg',
                navIconInnerSize: '1.125rem',
                dayButtonHeight: 30,
                dayButtonPadding: 6,
                dayGridGutter: 4,
                footerSpacing: 'md',
                footerButtonSize: 'sm',
                inputSize: 'sm',
                monthSelectMinWidth: 100,
                yearSelectMinWidth: 75,
            };
    }
};

// Main Component
const EthiopianDatePicker: React.FC<CustomEthiopianDatePickerProps> = ({
    value,
    onChange,
    label = '',
    placeholder,
    error,
    withAsterisk = false,
    disabled = false,
    size = 'sm',
    inputSize,
    inputRadius,
    mb,
    width = '100',
    allowFutureDates = true,
    initialCalendarViewOffsetDays,
    disableDatesNewerThanDays,
}) => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language === 'am' ? 'am' : 'en';
    const sizing = getSizingConfig(size);
    const effectiveInputSize = inputSize || sizing.inputSize;

    const [opened, setOpened] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isSelectDropdownOpen, setIsSelectDropdownOpen] = useState(false);

    const {
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
    } = useEthiopianDateLogic({
        value,
        onChange,
        currentLanguage,
        allowFutureDates,
        initialCalendarViewOffsetDays,
        disableDatesNewerThanDays,
        togglePopover() {
            setOpened((o) => !o);
        },
    });

    return (
        <Box mb={mb} w={`${width}%`}>
            <Popover
                opened={opened}
                onChange={setOpened}
                withinPortal
                width={sizing.popoverWidth}
                // trapFocus={false}
                // keepMounted
                position="bottom"
                shadow="md"
                // closeOnClickOutside={opened}
                // closeOnClickOutside={true}
            >
                <Popover.Target>
                    <DateInput
                        inputValue={inputValue}
                        placeholder={placeholder || ''}
                        label={label}
                        withAsterisk={withAsterisk}
                        error={error}
                        disabled={disabled}
                        inputSize={effectiveInputSize}
                        inputRadius={inputRadius}
                        togglePopover={() => setOpened((o) => !o)}
                        t={t}
                    />
                </Popover.Target>
                <Popover.Dropdown>
                    <CalendarHeader
                        viewMonth={viewMonth}
                        viewYear={viewYear}
                        monthOptions={monthOptions}
                        yearOptions={yearOptions}
                        changeMonth={changeMonth}
                        handleMonthChange={handleMonthChange}
                        handleYearChange={handleYearChange}
                        isNextMonthNavDisabled={isNextMonthNavDisabled}
                        disabled={disabled}
                        sizing={sizing}
                        t={t}
                        setIsSelectDropdownOpen={setIsSelectDropdownOpen}
                    />
                    <CalendarGrid
                        dayHeaders={dayHeaders}
                        daysInMonth={daysInMonth}
                        firstDayWeekday={firstDayWeekday}
                        selectedECDate={selectedECDate}
                        tempSelectedDay={tempSelectedDay}
                        viewYear={viewYear}
                        viewMonth={viewMonth}
                        handleDayClick={handleDayClick}
                        isDayDisabled={isDayDisabled}
                        disabled={disabled}
                        sizing={sizing}
                    />
                    <CalendarFooter
                        handleSetDate={handleSetDate}
                        handleClearDate={handleClearDate}
                        tempSelectedDay={tempSelectedDay}
                        viewYear={viewYear}
                        viewMonth={viewMonth}
                        isDayDisabled={isDayDisabled}
                        disabled={disabled}
                        sizing={sizing}
                    />
                </Popover.Dropdown>
            </Popover>
        </Box>
    );
};

export default EthiopianDatePicker;