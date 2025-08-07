import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Button,
    Paper,
    Box
} from '../../../../libs';

import EmployeeSection from '../../../Components/Employee-Section/Employee_Section';

// import { unregisteredEmployees } from '../../../../libs/MockData';
import UnregisteredEmployeeForm from '../../../Components/Unregistered_Employee_Form';

import { GetUnregisteredEmployees } from '../../../api/get-unregistered-employees';
import type { Employee } from '../../../Components/Employee_Table';


// import { Outlet } from 'react-router-dom';

const DFUE = () => {
    const [formOrTable, setFormOrTable] = useState("table");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/contribution/DFUE/table") {
            setFormOrTable("table");
        }
    }, [location.key, location.pathname]);
    
    const { data: data = [] as Employee[], isLoading, error } = GetUnregisteredEmployees();
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading user info</p>;

    const handleClick = () => {
        setFormOrTable(formOrTable === "table" ? "form" : "table");
        navigate("/contribution/DFUE/form")
    }

    return (
        <Paper mt="0" p="0">
            {formOrTable === "table" && (
                <Box>
                    <Button onClick={handleClick}>Add an Employee</Button>
                    <EmployeeSection
                        title="Unregistered Employees"
                        color="gray"
                        employees={data}
                        total={data.reduce((sum: number, emp: Employee) => sum + emp.monthly_contribution, 0)}
                        isOpen={true}
                    />
                </Box>
            )}
            {formOrTable === "form" && (
                <Box>
                    <UnregisteredEmployeeForm />
                </Box>
            )}

            {/* <Outlet /> */}
        </Paper>
    );
}
export default DFUE;