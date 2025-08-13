import React from 'react';
import { Grid, Center, Text, Button } from '../../../libs';
import type { SizingConfig } from './Ethiopian_Date_Picker';
import type { EthiopianDate } from '../../utils/Date-Picker-Utils/Date_Types';

interface CalendarGridProps {
    dayHeaders: readonly (string | number)[];
    daysInMonth: number;
    firstDayWeekday: number;
    selectedECDate: EthiopianDate | null;
    tempSelectedDay: number | null;
    viewYear: number;
    viewMonth: number;
    handleDayClick: (day: number) => void;
    isDayDisabled: (day: number, year: number, month: number) => boolean;
    disabled: boolean;
    sizing: SizingConfig;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
    dayHeaders,
    daysInMonth,
    firstDayWeekday,
    selectedECDate,
    tempSelectedDay,
    viewYear,
    viewMonth,
    handleDayClick,
    isDayDisabled,
    disabled,
    sizing,
}) => (
    <>
        <Grid columns={7} gutter={4} mb={4}>
            {dayHeaders.map((day) => (
                <Grid.Col span={1} key={day}>
                    <Center>
                        <Text size="xs" c="dimmed" fw={500}>
                            {day}
                        </Text>
                    </Center>
                </Grid.Col>
            ))}
        </Grid>
        <Grid columns={7} gutter={sizing.dayGridGutter}>
            {Array.from({ length: firstDayWeekday }).map((_, index) => (
                <Grid.Col span={1} key={`empty-${index}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNumber = i + 1;
                const isConfirmedSelected =
                    selectedECDate?.year === viewYear &&
                    selectedECDate?.month === viewMonth &&
                    selectedECDate?.day === dayNumber;
                const isTemporarilySelected = tempSelectedDay === dayNumber;
                const buttonVariant = isConfirmedSelected ? 'filled' : isTemporarilySelected ? 'outline' : 'subtle';
                const buttonColor = isConfirmedSelected || isTemporarilySelected ? 'blue' : 'gray';
                const dayIsEffectivelyDisabled = isDayDisabled(dayNumber, viewYear, viewMonth);

                return (
                    <Grid.Col span={1} key={dayNumber}>
                        <Button
                            variant={buttonVariant}
                            color={buttonColor}
                            onClick={() => handleDayClick(dayNumber)}
                            size="xs"
                            fullWidth
                            disabled={disabled || dayIsEffectivelyDisabled}
                            styles={{
                                root: {
                                    padding: `${sizing.dayButtonPadding}px`,
                                    height: `${sizing.dayButtonHeight}px`,
                                    minHeight: `${sizing.dayButtonHeight}px`,
                                    fontWeight: isConfirmedSelected ? 600 : 400,
                                },
                                label: { whiteSpace: 'nowrap' },
                            }}
                            aria-pressed={isConfirmedSelected || isTemporarilySelected}
                            aria-disabled={disabled || dayIsEffectivelyDisabled}
                        >
                            {dayNumber}
                        </Button>
                    </Grid.Col>
                );
            })}
        </Grid>
    </>
);