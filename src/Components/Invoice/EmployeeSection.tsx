import {Stack, Paper, Box} from '../../../libs';
import SectionHeader from './SectionHeader';
import EmployeeTable from './EmployeeTable';
import SectionTotalBar from './SectionTotalBar';

interface EmployeeSectionProps {
    title: string;
    employees: Employee[];
    total: number;
    color?: 'blue' | 'gray';
}

interface Employee {
    fullName: string;
    employeeType: 'PUBLIC' | 'PRIVATE' | 'MILITARY'|'POLICE';
    grossSalary: number;
    faydaId?: string;
    tin?: string;
    pensionPercent: number;
    monthly_contribution: number;
}
 interface Props {
    employees: Employee[];
    color?: 'blue' | 'gray';
}
const EmployeeSection =({title, employees, total, color='blue'}: EmployeeSectionProps) => {
    return (
        <Paper withBorder radius="md" shadow="xs">
            <Stack p= "md" gap="xs">
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