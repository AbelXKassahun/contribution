import React from 'react';
import { Group, Button } from '../../../libs';
import { IconCheck, IconTrash } from '../../../libs';
import type { SizingConfig } from './Ethiopian_Date_Picker';

interface CalendarFooterProps {
    handleSetDate: () => void;
    handleClearDate: () => void;
    tempSelectedDay: number | null;
    viewYear: number;
    viewMonth: number;
    isDayDisabled: (day: number, year: number, month: number) => boolean;
    disabled: boolean;
    sizing: SizingConfig;
}

export const CalendarFooter: React.FC<CalendarFooterProps> = ({
    handleSetDate,
    handleClearDate,
    tempSelectedDay,
    viewYear,
    viewMonth,
    isDayDisabled,
    disabled,
    sizing,
}) => (
    <Group mt={sizing.footerSpacing} grow>
        <Button
            onClick={handleSetDate}
            disabled={
                disabled ||
                tempSelectedDay === null ||
                (tempSelectedDay !== null && isDayDisabled(tempSelectedDay, viewYear, viewMonth))
            }
            size={sizing.footerButtonSize}
        >
            <IconCheck />
        </Button>
        <Button
            onClick={handleClearDate}
            variant="light"
            color="red"
            size={sizing.footerButtonSize}
            disabled={disabled}
        >
            <IconTrash />
        </Button>
    </Group>
);