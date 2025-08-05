import {
    Stepper,
    TextInput,
    Select,
    Button,
    Group,
    List,
    Title,
    Text,
    Paper,
} from '../../libs';

import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UnregisteredEmployeeForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    
    const navigate = useNavigate();


    const form = useForm({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        },

        validate: {
            first_name: (value) => (value.length < 2 ? 'Name too short' : null),
            last_name: (value) => (value.length < 2 ? 'Name too short' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const nextStep = () => {
        setActiveStep((current) => (current < 4 ? current + 1 : current));
    };

    const prevStep = () => {
        setActiveStep((current) => (current > 0 ? current - 1 : current));
    };

    return (
        <Paper mt="0" p="0">
            <form onSubmit={form.onSubmit((values) => console.log(values))} >
                <Stepper maw={700} mx="auto" active={activeStep} onStepClick={setActiveStep}>
                    <Stepper.Step mt="lg" label="Instructions" description="Read the instructions">
                        <Paper withBorder>
                            <Title order={2}>Before you begin.</Title>
                            <Text mb="lg">Please read the instructions carefully before proceeding.</Text>
                            {/* Instructions */}
                            <Paper withBorder>
                                <Title order={4} >Purpose of this registration</Title>
                                <List pl="20">
                                    <List.Item>This form is for the purpose of registering your employess contribution.</List.Item>
                                </List>
                            </Paper>
                        </Paper>
                        <Group >
                            {/* <Button mt="md" variant="default" onClick={() => navigate("/contribution/DFUE/table")}> */}
                            <Button mt="md" variant="default" onClick={() => navigate(-1)}>
                                Cancel
                            </Button>
                            {StepButtons()}
                        </Group>
                    </Stepper.Step>

                    <Stepper.Step mt="lg" label="Employee Details" description="Fill employee information">
                        <Paper withBorder>
                            <TextInput
                                mt="sm"
                                withAsterisk
                                label="First Name"
                                placeholder="Enter employee first name"
                                {...form.getInputProps('first_name')}
                            />
                            <TextInput
                                mt="sm"
                                withAsterisk
                                label="Last Name"
                                placeholder="Enter employee last name"
                                {...form.getInputProps('last_name')}
                            />
                            <TextInput
                                mt="sm"
                                withAsterisk
                                label="Email"
                                placeholder="Enter employee email"
                                {...form.getInputProps('email')}
                            />
                            <Select
                                withAsterisk
                                label="Employment Type"
                                placeholder="eg. Seidor inc"
                                data={['Permanent', 'Contractual']}
                            />
                            <TextInput
                                mt="sm"
                                withAsterisk
                                label="Base Salary"
                                placeholder="Enter employee base salary"
                                {...form.getInputProps('email')}
                            />
                            {StepButtons()}
                        </Paper>
                    </Stepper.Step>
                </Stepper>
            </form>
        </Paper>
    );

    function StepButtons() { // the next and back buttons
        return <Group mt="md">
            {activeStep !== 0 && (
                <Button variant="default" onClick={prevStep}>
                    Back
                </Button>
            )}
            {activeStep < 4 && (
                <Button onClick={nextStep}>
                    {activeStep === 3 ? 'Submit' : 'Next'}
                </Button>
            )}
        </Group>;
    }
}

export default UnregisteredEmployeeForm;