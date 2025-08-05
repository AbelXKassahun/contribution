import { Stack, Paper, Box, IconChevronDown } from '../../../libs';
import SectionHeader from '../Section_Header';
import EmployeeTable from '../Employee_Table';
import SectionTotalBar from '../Section_TotalBar';

import type { Employee } from '../Employee_Table';
import { useState } from 'react';

import styles from "./empSec.module.css";
type EmployeeSectionProps = {
    title: string;
    employees: Employee[];
    total: number;
    color?: 'blue' | 'gray';
    isOpen: boolean
}

const EmployeeSection = ({ title, employees, total, color = 'blue', isOpen }: EmployeeSectionProps) => {
    const [isOpened, setIsOpened] = useState(isOpen);
    return (
        <Paper withBorder shadow="xs" radius="md" mt="sm" onClick={() => setIsOpened(!isOpened)}>
            <div className={styles.card}>
                <IconChevronDown className={styles.icon} style={{ transform: isOpened ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                <SectionHeader title={title} count={employees.length} color={color} />
            </div>
            {isOpened && (
                <Stack p="md" gap="xs">
                    {/* <SectionHeader title={title} count={employees.length} color={color} /> */}
                    <Box style={{ borderLeft: color === 'blue' ? '4px solid #228be6' : '4px solid #ccc', paddingLeft: 8 }}>
                        <EmployeeTable employees={employees} color={color} />
                    </Box>
                    <SectionTotalBar color={color} total={total} />
                </Stack>
            )}
        </Paper>
    );
}

export default EmployeeSection