import {
  Paper,
  Stack,
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

const DeclarationDetails = () => {
  /*
    [ ] - reads a query param called id
    [ ] - makes an api request based on that id and populates the page  
  */
  return (
    <Paper mt="0">
      <Stack>
        <Header_Section
          title={"December 2024 Declaration Contribution"}
          date="7/25/2025"
          status="UNPAID"
        />
        <TotalContributionCard
          totalAmount={382820}
          totalEmployees={22}
        />
        <EmployeeSection
          title="Registered Employees"
          color="blue"
          employees={registeredEmployees}
          total={registeredTotal}
          isOpen={true}
        />
        <EmployeeSection
          title="Unregistered Employees"
          color="gray"
          employees={unregisteredEmployees}
          total={unregisteredTotal}
          isOpen={true}
        />
      </Stack>
    </Paper>
  );
}

export default DeclarationDetails