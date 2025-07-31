import {
  Paper,
  Stack,
} from '../../../libs';

import Header_Section from '../Reusable Commons/Header_Section';
import TotalContributionCard from '../Reusable Commons/TotalContributionCard';
import EmployeeSection from '../Reusable Commons/EmployeeSection';

import { registeredEmployees, unregisteredEmployees } from '../../../libs/MockData';

const registeredTotal = registeredEmployees.reduce(
  (sum, emp) => sum + emp.monthly_contribution,
  0
);

const unregisteredTotal = unregisteredEmployees.reduce(
  (sum, emp) => sum + emp.monthly_contribution,
  0
);


const DeclarationDetails = () => {
  return (
    <Paper mt="0">
      <Stack>
        <Header_Section
          title="December 2024 Declaration Contribution"
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
        />

        <EmployeeSection
          title="Unregistered Employees"
          color="gray"
          employees={unregisteredEmployees}
          total={unregisteredTotal}
        />
      </Stack>
    </Paper>
  );
}

export default DeclarationDetails