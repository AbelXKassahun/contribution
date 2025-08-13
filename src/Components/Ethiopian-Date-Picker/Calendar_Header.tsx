import React from 'react';
import { Group, Select, ActionIcon } from '../../../libs';
import { IconChevronLeft, IconChevronRight } from '../../../libs';
import type { SizingConfig } from './Ethiopian_Date_Picker';

interface CalendarHeaderProps {
    viewMonth: number;
    viewYear: number;
    monthOptions: { value: string; label: string; disabled: boolean }[];
    yearOptions: { value: string; label: string }[];
    changeMonth: (offset: number) => void;
    handleMonthChange: (month: string | null) => void;
    handleYearChange: (year: string | null) => void;
    isNextMonthNavDisabled: boolean;
    disabled: boolean;
    sizing: SizingConfig;
    t: (key: string, defaultValue: string) => string;
    setIsSelectDropdownOpen: (open: boolean) => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
    viewMonth,
    viewYear,
    monthOptions,
    yearOptions,
    changeMonth,
    handleMonthChange,
    handleYearChange,
    isNextMonthNavDisabled,
    disabled,
    sizing,
    t,
    setIsSelectDropdownOpen,
}) => (
    <Group justify="space-between" mb={sizing.headerSpacing}>
        <ActionIcon
            onClick={() => changeMonth(-1)}
            variant="light"
            size={sizing.navIconSize}
            aria-label={t('previous_month', 'Previous month')}
            disabled={disabled}
        >
            <IconChevronLeft size={sizing.navIconInnerSize} />
        </ActionIcon>
        <Group gap="xs" grow preventGrowOverflow={false} wrap="nowrap">
            <Select
                size="xs"
                aria-label={t('select_month', 'Select month')}
                data={monthOptions}
                value={String(viewMonth)}
                onChange={handleMonthChange}
                style={{ flex: '1 1 60%', minWidth: sizing.monthSelectMinWidth }}
                searchable={monthOptions.length > 7}
                nothingFoundMessage={t('no_options_found', 'Not found')}
                disabled={disabled || monthOptions.every(opt => opt.disabled)}
                onDropdownOpen={() => setIsSelectDropdownOpen(true)}
                onDropdownClose={() => setIsSelectDropdownOpen(false)}
            />
            <Select
                size="xs"
                aria-label={t('select_year', 'Select year')}
                data={yearOptions}
                value={String(viewYear)}
                onChange={handleYearChange}
                style={{ flex: '1 1 40%', minWidth: sizing.yearSelectMinWidth }}
                searchable
                nothingFoundMessage={t('no_options_found', 'Not found')}
                disabled={disabled}
                onDropdownOpen={() => setIsSelectDropdownOpen(true)}
                onDropdownClose={() => setIsSelectDropdownOpen(false)}
            />
        </Group>
        <ActionIcon
            onClick={() => changeMonth(1)}
            variant="light"
            size={sizing.navIconSize}
            aria-label={t('next_month', 'Next month')}
            disabled={isNextMonthNavDisabled}
        >
            <IconChevronRight size={sizing.navIconInnerSize} />
        </ActionIcon>
    </Group>
);