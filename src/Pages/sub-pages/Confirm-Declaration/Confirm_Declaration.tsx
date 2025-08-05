import {
    Paper,
    Stack,
    Button
} from '../../../../libs';

import Header_Section from '../../../Components/Header_Section';
import TotalContributionCard from '../../../Components/Total_Contribution_Card';
import EmployeeSection from '../../../Components/Employee-Section/Employee_Section';

import { registeredEmployees, unregisteredEmployees } from '../../../../libs/MockData';

const registeredTotal = registeredEmployees.reduce(
    (sum, emp) => sum + emp.monthly_contribution,
    0
);

const unregisteredTotal = unregisteredEmployees.reduce(
    (sum, emp) => sum + emp.monthly_contribution,
    0
);

// type DetailsParams = {
//   headerTitle: string,
//   headerDate: string,
//   headerStatus: 'PAID' | 'UNPAID' | 'PENDING',
//   totalAmount: number,
//   totalEmployees: number
// }

const Confirm_Declaration = () => {
    return (
        <Paper>
            <Stack>
                <Header_Section
                    title={"December 2024 Declaration Contribution"}
                    date="7/25/2025"
                    status="PENDING"
                />
                {/* <Header_Section
                    title={props.headerTitle}
                    date={props.headerDate}
                    status={props.headerStatus}
                /> */}
                <TotalContributionCard
                    totalAmount={382820}
                    totalEmployees={22}
                />

                <EmployeeSection
                    title="Registered Employees"
                    color="blue"
                    employees={registeredEmployees}
                    total={registeredTotal}
                    isOpen={false}
                />

                <EmployeeSection
                    title="Unregistered Employees"
                    color="gray"
                    employees={unregisteredEmployees}
                    total={unregisteredTotal}
                    isOpen={false}
                />
            </Stack>
            <Button mt="20">Confirm Declartion</Button>
        </Paper>
    );
}

export default Confirm_Declaration;