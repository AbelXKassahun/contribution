import { useLocation, useNavigate, Outlet } from 'react-router-dom';

import { Paper, Tabs, Title, Text, Container, Box } from '../../../libs';

import styles from './contributionDec.module.css';

const ContributionPageClientSide = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const  activeTab = location.pathname.split('/').pop() || 'description';
    
    const possibleTabsOfUnregisteredEmployeesSection = activeTab === "table" ? "table" :  activeTab === "form" ? "form" : "DFUE";

    const navigationOnTabChange = (value: string | null) => {
        if (value === "table" || value === "form") {
            navigate(`/contribution/DFUE/${value}`);
            return;
        }
        navigate(`/contribution/${value}`);
    }
    
    return (
        <Container className={styles.container}>
            <Container mx="0">
                <Title order={1}>Contribution Declaration</Title>
                <Text mb="0" c="dimmed">View and edit declarations of your employee's contributions here</Text>
            </Container>

            {/* defaultValue="description" */}
            {/* <Tabs variant="none" orientation="horizontal" value={activeTab} 
            onChange={(value) => navigate(`/contribution/${value === "form" | "" ? "" : ""}`)} classNames={styles}> */}
            <Tabs variant="none" orientation="horizontal" value={activeTab} 
            onChange={(value)=> navigationOnTabChange(value)} classNames={styles}>
                <Paper withBorder shadow="sm" mt="sm" mb="md" h={"50px"} style={{display: "flex", alignItems: "center",}}>
                    <Tabs.List w={"100%"} className={styles.tabList} justify="space-between">
                        {/* leftSection={<IconPhoto size={12} />} */}
                        <Tabs.Tab value="description">
                            <Text size='xs'>Description</Text>
                        </Tabs.Tab>
                        <Tabs.Tab value="DFRE">
                            <Text size='xs'>Registered Employees</Text>
                        </Tabs.Tab>
                        <Tabs.Tab value={possibleTabsOfUnregisteredEmployeesSection}>
                            <Text size='xs'>Unregistered Employees</Text>
                        </Tabs.Tab>
                        <Tabs.Tab value="unpaid_declarations">
                            <Text size='xs'>Unpaid Declarations</Text>
                        </Tabs.Tab>
                        <Tabs.Tab value="declarations_history">
                            <Text size='xs'>Declarations History</Text>
                        </Tabs.Tab>
                    </Tabs.List>
                </Paper>

                <Box>
                    <Tabs.Panel value={activeTab}>  
                        <Outlet/>
                    </Tabs.Panel>
                </Box>
            </Tabs>
        </Container>
    );
}

export default ContributionPageClientSide;