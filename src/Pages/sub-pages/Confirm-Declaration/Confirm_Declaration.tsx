import {
    Paper,
    Stack,
    Button,
} from '../../../../libs';

import Header_Section from '../../../Components/Header_Section';
import Loading from '../../../Components/Loading';
import ErrorMsg from '../../../Components/Error';
import TotalContributionCard from '../../../Components/Total_Contribution_Card';
import EmployeeSection from '../../../Components/Employee-Section/Employee_Section';

// import { registeredEmployees, unregisteredEmployees } from '../../../../libs/MockData';

import { GetUnregisteredEmployees } from '../../../api/get-unregistered-employees';
import { GetRegisteredEmployees } from '../../../api/get-registered-employees';
import type { Employee } from '../../../Components/Employee_Table';

const Confirm_Declaration = () => {
    const { data: registeredEmployees = [] as Employee[], isLoading: is_registered_info_loading, error: error_registered } = GetRegisteredEmployees();

    const { data: unregisteredEmployees = [] as Employee[], isLoading: is_unregistered_info_loading, error: error_unregistered } = GetUnregisteredEmployees();

    const totalContributionRegistered = registeredEmployees.reduce((sum: number, emp: Employee) => sum + emp.monthly_contribution, 0);

    const totalContributionUnregistered = unregisteredEmployees.reduce((sum: number, emp: Employee) => sum + emp.monthly_contribution, 0);

    const lenRegisterd = registeredEmployees.length;
    const lenUnregistered = unregisteredEmployees.length;

    const allClear = !is_registered_info_loading && !is_unregistered_info_loading && !error_registered && !error_unregistered;

    return (
        <Paper>
            <Stack>
                {is_registered_info_loading || is_unregistered_info_loading
                ? (
                    <Loading message="Loading employees information" />
                )
                : error_registered || error_unregistered 
                ? (
                    <ErrorMsg message="Error loading employees information" />
                )
                : (
                <>
                    <Header_Section
                        title={"December 2024 Declaration Contribution"}
                        date="7/25/2025" // time.Now
                        status="PENDING"
                    />
                    {/* <Header_Section
                        title={props.headerTitle}
                        date={props.headerDate}
                        status={props.headerStatus}
                    /> */}
                    <TotalContributionCard
                        totalAmount={totalContributionRegistered + totalContributionUnregistered}
                        totalEmployees={lenRegisterd + lenUnregistered}
                    />

                    <EmployeeSection
                        title="Registered Employees"
                        color="blue"
                        employees={registeredEmployees}
                        total={totalContributionRegistered}
                        isOpen={false}
                    />
                    <EmployeeSection
                        title="Unregistered Employees"
                        color="gray"
                        employees={unregisteredEmployees}
                        total={totalContributionUnregistered}
                        isOpen={false}
                    />
                </>
                )
                }
            </Stack>
            {
                allClear && (
                    <Button mt="20">Confirm Declartion</Button>
                )
            }
        </Paper>
    );
}

export default Confirm_Declaration;


