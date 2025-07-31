import { Table, Badge, Text, ScrollArea } from '../../../libs';


export type Employee = {
  fullName: string;
  employeeType: 'PUBLIC' | 'PRIVATE' | 'MILITARY' | 'POLICE';
  grossSalary: number;
  faydaId: string;
  tin?: string;
  pensionPercent: number;
  monthly_contribution: number;
}

export type Props = {
  employees: Employee[];
  color?: 'blue' | 'gray';
}

const EmployeeTable = ({ employees }: Props) => {
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'PUBLIC':
        return 'orange';
      case 'POLICE':
        return 'blue';
      case 'MILITARY':
        return 'green';
      case 'PRIVATE':
        return 'violet';
      default:
        return 'gray';
    }
  }

  return (
    <ScrollArea h={300} type="auto">
      <Table withTableBorder withColumnBorders highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Full Name</Table.Th>
            <Table.Th>Employee Type</Table.Th>
            <Table.Th>Gross Salary</Table.Th>
            <Table.Th>TIN</Table.Th>
            <Table.Th>Fayda ID</Table.Th>
            <Table.Th>Pension %</Table.Th>
            <Table.Th>Monthly Contribution</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {employees.map((emp, index) => (
            <Table.Tr key={index}>
              <Table.Td>{emp.fullName}</Table.Td>
              <Table.Td>
                <Badge color={getBadgeColor(emp.employeeType)} variant="light">
                  {emp.employeeType}
                </Badge>
              </Table.Td>
              <Table.Td>{emp.grossSalary.toLocaleString()} ETB</Table.Td>
              <Table.Td>{emp.tin ?? '—'}</Table.Td>
              <Table.Td>{emp.faydaId}</Table.Td>
              <Table.Td>
                <Badge color="blue" variant="outline">
                  {emp.pensionPercent}%
                </Badge>
              </Table.Td>
              <Table.Td>
                <Text c="green">
                  {emp.monthly_contribution.toLocaleString()} ETB
                </Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>

  );
}

export default EmployeeTable