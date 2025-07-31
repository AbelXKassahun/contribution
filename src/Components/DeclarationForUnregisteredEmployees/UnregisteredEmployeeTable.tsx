import EmployeeSection from '../Reusable Commons/EmployeeSection';

import { unregisteredEmployees } from '../../../libs/MockData';

const UnregisteredEmployeeTable = () => {
    return (
        <EmployeeSection
            title="Unregistered Employees"
            color="gray"
            employees={unregisteredEmployees}
            total={unregisteredEmployees.reduce((sum, emp) => sum + emp.monthly_contribution, 0)}
        />
    );
}

export default UnregisteredEmployeeTable;