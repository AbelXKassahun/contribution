import {Stack, Paper, Box} from '../../../libs';
import SectionHeader from './SectionHeader';
import EmployeeTable from './EmployeeTable';
import SectionTotalBar from './SectionTotalBar';

import type { Employee } from './EmployeeTable';

type EmployeeSectionProps = {
    title: string;
    employees: Employee[];
    total: number;
    color?: 'blue' | 'gray';
}

const EmployeeSection =({title, employees, total, color='blue'}: EmployeeSectionProps) => {
    return (
        <Paper withBorder shadow="xs" radius="md" mt="sm">
            <Stack p="md" gap="xs">
                <SectionHeader title={title} count={employees.length} color={color} />
                <Box style={{ borderLeft: color === 'blue' ? '4px solid #228be6' : '4px solid #ccc', paddingLeft: 8 }}>
                    <EmployeeTable employees={employees} color={color} />
                </Box>
                <SectionTotalBar color={color} total={total} />
            </Stack>
        </Paper>
    );
}

export default EmployeeSection