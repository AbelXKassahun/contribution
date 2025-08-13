import { useLocation, useNavigate, Outlet } from 'react-router-dom';

import {
    Paper,
    Tabs,
    Title,
    Text,
    Container,
    Box,
    // IconFileDescription,
    IconUsers,
    IconUserX,
    IconShieldCheck,
    IconCreditCardOff,
    IconHistory
} from '../../../libs';
// import { EtDateViewer } from "habesha-datepicker";


import styles from './contributionDec.module.css';

const ContributionPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const activeTab = location.pathname.split('/').pop() || 'description';
    console.log(activeTab);

    const possibleTabsOfUnregisteredEmployeesSection = activeTab === "table" ? "table" : activeTab === "form" ? "form" : "table";

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
                {/* <EtDateViewer date={new Date()} sx={{ color: "#000" }} variant="h6" /> */}
                <Title order={1}>Contribution Declaration</Title>
                <Text mb="0" c="dimmed">View and edit declarations of your employee's contributions here</Text>
            </Container>

            {/* defaultValue="description" */}
            {/* <Tabs variant="none" orientation="horizontal" value={activeTab} 
            onChange={(value) => navigate(`/contribution/${value === "form" | "" ? "" : ""}`)} classNames={styles}> */}
            <Tabs variant="pills" orientation="horizontal" radius="lg" value={activeTab}
                onChange={(value) => navigationOnTabChange(value)} classNames={styles}>
                <Paper withBorder shadow="sm" mt="sm" mb="md" h={"50px"}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.75rem",
                    }}>
                    <Tabs.List w={"100%"} className={styles.tabList} justify="space-between">
                        {/* leftSection={<IconPhoto size={12} />} */}
                        {/* <Tabs.Tab
                        value="description"
                        leftSection={<IconFileDescription size={18} />}
                    >
                        <Text size='xs'>Description</Text>
                    </Tabs.Tab> */}
                        <Tabs.Tab
                            value="DFRE"
                            leftSection={<IconUsers size={18} />}
                        >
                            <Text size='xs'>Registered Employees</Text>
                        </Tabs.Tab>
                        <Tabs.Tab
                            value={possibleTabsOfUnregisteredEmployeesSection}
                            leftSection={<IconUserX size={18} />}
                        >
                            <Text size='xs'>Unregistered Employees</Text>
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="confirm_declaration"
                            leftSection={<IconShieldCheck size={18} />}
                        >
                            <Text size='xs'>Confirm Declaration</Text>
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="unpaid_declarations"
                            leftSection={<IconCreditCardOff size={18} />}
                        >
                            <Text size='xs'>Unpaid Declarations</Text>
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="declarations_history"
                            leftSection={<IconHistory size={18} />}
                        >
                            <Text size='xs'>Declarations History</Text>
                        </Tabs.Tab>
                    </Tabs.List>
                </Paper>

                <Box>
                    <Tabs.Panel value={activeTab}>
                        <Outlet />
                    </Tabs.Panel>
                </Box>
            </Tabs>
        </Container >
    );
}

export default ContributionPage;