import { useState } from 'react';
import { Tabs, Title, Text, Container, FloatingIndicator } from '../../../libs';

import styles from './contributionDec.module.css';

import Description from "../../Components/Description/Description";
import UnregisteredEmployeeForm from "../../Components/Register_Contribution_Form/Form";
const DeclarationForm = () => {
    const [activeTab, setActiveTab] = useState<string | null>('description');
    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
    const setControlRef = (val: string) => (node: HTMLButtonElement) => {
        controlsRefs[val] = node;
        setControlsRefs(controlsRefs);
    };

    return (
        <Container>
            <Container>
                <Title order={1}>Contribution Declaration</Title>
                <Text mb="xl" c="dimmed">View and edit declarations of your employee's contribution here</Text>
            </Container>

            {/* defaultValue="description" */}
            <Tabs variant="none" orientation="vertical" value={activeTab} onChange={setActiveTab}>
                <Tabs.List ref={setRootRef} className={styles.list}>
                    {/* leftSection={<IconPhoto size={12} />} */}
                    <Tabs.Tab value="description" ref={setControlRef('description')} className={styles.tab}>
                        Description
                    </Tabs.Tab>
                    <Tabs.Tab value="DFRE" mt="auto" ref={setControlRef('DFRE')} className={styles.tab}>
                        Declaration For Registered Employees
                    </Tabs.Tab>
                    <Tabs.Tab value="DFUE" mt="auto" ref={setControlRef('DFUE')} className={styles.tab}>
                        Declaration For Unregistered Employees
                    </Tabs.Tab>

                    <FloatingIndicator
                        target={activeTab ? controlsRefs[activeTab] : null}
                        parent={rootRef}
                        className={styles.indicator}
                    />
                </Tabs.List>
                
                <Tabs.Panel value="description" pl="xl">
                    <Description />
                </Tabs.Panel>

                <Tabs.Panel value="DFRE" pl="xl">
                    Messages tab content
                </Tabs.Panel>

                <Tabs.Panel value="DFUE" pl="xl">
                    <UnregisteredEmployeeForm />
                </Tabs.Panel>
            </Tabs>
        </Container>
    );
}

export default DeclarationForm;