import {  useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Button,
    Paper,
    // Box 
} from '../../../libs';

import { Outlet } from 'react-router-dom';

const DFUE = () => {
    const [formOrTable, setFormOrTable] = useState("table");
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        setFormOrTable(formOrTable === "table" ? "form" : "table");
        navigate("/contribution/DFUE/form")
    }

    useEffect(() => {
        if (location.pathname === "/contribution/DFUE/table"){
            setFormOrTable("table");
        }
    }, [location.key, location.pathname]);
    
    return (
        <Paper mt="0" p="0">
            {formOrTable === "table" && <Button onClick={handleClick}>Add an Employee</Button>}
            <Outlet />
        </Paper>
    );
}
export default DFUE;