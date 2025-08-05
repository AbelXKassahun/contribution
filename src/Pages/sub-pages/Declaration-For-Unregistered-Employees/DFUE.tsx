import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Button,
    Paper,
    Box
} from '../../../../libs';

import EmployeeSection from '../../../Components/Employee-Section/Employee_Section';

import { unregisteredEmployees } from '../../../../libs/MockData';
import UnregisteredEmployeeForm from '../../../Components/Unregistered_Employee_Form';

// import { Outlet } from 'react-router-dom';

const DFUE = () => {
    const [formOrTable, setFormOrTable] = useState("table");
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        setFormOrTable(formOrTable === "table" ? "form" : "table");
        navigate("/contribution/DFUE/form")
    }

    useEffect(() => {
        if (location.pathname === "/contribution/DFUE/table") {
            setFormOrTable("table");
        }
    }, [location.key, location.pathname]);

    return (
        <Paper mt="0" p="0">
            {formOrTable === "table" && (
                <Box>
                    <Button onClick={handleClick}>Add an Employee</Button>
                    <EmployeeSection
                        title="Unregistered Employees"
                        color="gray"
                        employees={unregisteredEmployees}
                        total={unregisteredEmployees.reduce((sum, emp) => sum + emp.monthly_contribution, 0)}
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