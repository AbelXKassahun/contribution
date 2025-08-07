import { Paper } from '../../../../libs';

import EmployeeSection from '../../../Components/Employee-Section/Employee_Section';

// import { registeredEmployees } from '../../../../libs/MockData';
import { GetRegisteredEmployees } from '../../../api/get-registered-employees';
import type { Employee } from '../../../Components/Employee_Table';


const DFRE = () => {
    const { data: data = [] as Employee[], isLoading, error } = GetRegisteredEmployees();
    
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading user info</p>;
    
    return (
        <Paper>
            {/* <EmployeeSection title='Registered Employees' employees={registeredEmployees} total={registeredEmployees.reduce((sum, emp) => sum + emp.monthly_contribution, 0)} isOpen={true} /> */}
            <EmployeeSection title='Registered Employees' employees={data} total={data.reduce((sum: number, emp: Employee) => sum + emp.monthly_contribution, 0)} isOpen={true} />
        </Paper>
    );
}
export default DFRE;