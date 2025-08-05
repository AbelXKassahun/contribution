import { Paper } from '../../../../libs';

import EmployeeSection from '../../../Components/Employee-Section/Employee_Section';

import { registeredEmployees } from '../../../../libs/MockData';


const DFRE = () => {
    return (
        <Paper>
            <EmployeeSection title='Registered Employees' employees={registeredEmployees} total={registeredEmployees.reduce((sum, emp) => sum + emp.monthly_contribution, 0)} isOpen={true} />
        </Paper>
    );
}
export default DFRE;