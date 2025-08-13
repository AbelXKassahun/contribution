import React from 'react';
import { TextInput, ActionIcon, Text } from '../../../libs';
import { IconCalendarMonth } from '../../../libs';

interface DateInputProps {
    inputValue: string;
    placeholder: string;
    label: React.ReactNode;
    withAsterisk: boolean;
    error: React.ReactNode;
    disabled: boolean;
    inputSize: string;
    inputRadius: string | undefined;
    togglePopover: () => void;
    t: (key: string, defaultValue: string) => string;
}

// DateInput doesn’t forward a reference to the underlying DOM element, the popover falls back to (0,0) (top-left).
// hence why DateInput is a forwardRef, 
// otherwise the Popover.Dropdown won’t work and will display on top left of the page

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
    (
        {
            inputValue,
            placeholder,
            label,
            withAsterisk,
            error,
            disabled,
            inputSize,
            inputRadius,
            togglePopover,
            t,
        },
        ref // ← this comes from Popover.Target
    ) => {
        return (
            <div ref={ref} >
                {label && (
                    <Text size="sm" fw={500} mb={3}>
                        {label} {withAsterisk && <span style={{ color: 'red' }}>*</span>}
                    </Text>
                )}
                <TextInput
                    readOnly
                    value={inputValue}
                    placeholder={placeholder || t('select_date_placeholder', 'Select a date')}
                    onClick={() => !disabled && togglePopover()}
                    rightSection={
                        <ActionIcon
                            variant="subtle"
                            color="gray"
                            onClick={() => !disabled && togglePopover()}
                            disabled={disabled}
                        >
                            <IconCalendarMonth />
                        </ActionIcon>
                    }
                    error={!!error}
                    disabled={disabled}
                    aria-label={typeof label === 'string' ? label : t('decision_date_label', 'Decision Date')}
                    size={inputSize}
                    radius={inputRadius}
                />
                {error && (
                    <Text c="red" size="xs" mt={5}>
                        {error}
                    </Text>
                )}
            </div>
        );
    }
);

// export const DateInput: React.FC<DateInputProps> = ({
//     inputValue,
//     placeholder,
//     label,
//     withAsterisk,
//     error,
//     disabled,
//     inputSize,
//     inputRadius,
//     togglePopover,
//     t,
// }) => (
//     <>
//         {label && (
//             <Text size="sm" fw={500} mb={3}>
//                 {label} {withAsterisk && <span style={{ color: 'red' }}>*</span>}
//             </Text>
//         )}
//         <TextInput
//             readOnly
//             value={inputValue}
//             placeholder={placeholder || t('select_date_placeholder', 'Select a date')}
//             onClick={() => !disabled && togglePopover()}
//             rightSection={
//                 <ActionIcon
//                     variant="subtle"
//                     color="gray"
//                     onClick={() => !disabled && togglePopover()}
//                     disabled={disabled}
//                 >
//                     <IconCalendarMonth />
//                 </ActionIcon>
//             }
//             error={!!error}
//             disabled={disabled}
//             aria-label={typeof label === 'string' ? label : t('decision_date_label', 'Decision Date')}
//             size={inputSize}
//             radius={inputRadius}
//         />
//         {error && (
//             <Text c="red" size="xs" mt={5}>
//                 {error}
//             </Text>
//         )}
//     </>
// );