import { Paper } from '../../../libs';

import EmployeeSection from '../Reusable Commons/EmployeeSection';

import { registeredEmployees } from '../../../libs/MockData';


const DFRE = () => {
    return (
        <Paper>
            <EmployeeSection title='Registered Employees' employees={registeredEmployees} total={registeredEmployees.reduce((sum, emp) => sum + emp.monthly_contribution, 0)} />
        </Paper>
    );
}
export default DFRE;