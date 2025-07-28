import {Container, Select,Grid, Paper,SegmentedControl, Title, SimpleGrid, Card, Group} from '../../../libs';
import { useState } from 'react';
import Declaration_Cards from './Declaration_Cards';

interface Declaration {
  id: number;
  month: string;
  year: string;
  status: 'paid' | 'unpaid';
  registeredCount: number;
  unregisteredCount: number;
  totalAmount: number;
}

const mockDeclarations: Declaration[] = [
  {
    id: 1,
    month: 'January',
    year: '2023',
    status: 'unpaid',
    registeredCount: 19,
    unregisteredCount: 4,
    totalAmount: 83467,
  },
  {
    id: 2,
    month: 'December',
    year: '2024',
    status: 'paid',
    registeredCount: 19,
    unregisteredCount: 10,
    totalAmount: 129224,
  },
  {
    id: 3,
    month: 'September',
    year: '2023',
    status: 'unpaid',
    registeredCount: 13,
    unregisteredCount: 1,
    totalAmount: 57358,
  },
  {
    id: 4,
    month: 'August',
    year: '2025',
    status: 'unpaid',
    registeredCount: 15,
    unregisteredCount: 10,
    totalAmount: 100000,
  },
  {
    id: 5,
    month: 'August',
    year: '2022',
    status: 'paid',
    registeredCount: 30,
    unregisteredCount: 5,
    totalAmount: 163345,
  },
  {
    id: 6,
    month: 'August',
    year: '2025',
    status: 'paid',
    registeredCount: 7,
    unregisteredCount: 4,
    totalAmount: 43164,
  },
  {
    id: 7,
    month: 'October',
    year: '2022',
    status: 'unpaid',
    registeredCount: 18,
    unregisteredCount: 10,
    totalAmount: 96880,
  },
  {
    id: 8,
    month: 'January',
    year: '2023',
    status: 'paid',
    registeredCount: 11,
    unregisteredCount: 9,
    totalAmount: 69680,
  },
  {
    id: 9,
    month: 'March',
    year: '2023',
    status: 'unpaid',
    registeredCount: 6,
    unregisteredCount: 0,
    totalAmount: 19164,
  },
  {
    id: 10,
    month: 'July',
    year: '2024',
    status: 'paid',
    registeredCount: 7,
    unregisteredCount: 4,
    totalAmount: 49148,
  },
  // ...and 40 more entries like these
];



const Declaration_History = () => {
    const [month, setMonth] = useState<string | null>(null);
    const [year, setYear] = useState<string | null>(null);
    const [status, setStatus] = useState<string>('all');

    const filteredDeclarations= mockDeclarations.filter((declaration) => {
        const monthMatch = month ? declaration.month === month : true;
        const yearMatch = year ? declaration.year === year : true;
        const statusMatch = status === 'all' || declaration.status === status;
        return monthMatch && yearMatch && statusMatch;
    });

    return (
        
        <Container size="xl" py="xl">
            
            <Title order={1} fw={500} mb="lg">Declarations Management</Title>
            {/*Filter section*/}
            <Paper radius="md" p="md" shadow="xs" bg="gray.0">
            <Group>
                <Grid align="flex-end">
                    <Grid.Col span="auto">
                            <Select placeholder='Select month' 
                                value={month}
                                label="Month"
                                clearable
                                
                                onChange={setMonth}
                                data={[
                                    { value: 'January', label: 'January' },
                                    { value: 'February', label: 'February' },
                                    { value: 'March', label: 'March' },
                                    { value: 'April', label: 'April' },
                                    { value: 'May', label: 'May' },
                                    { value: 'June', label: 'June' },
                                    { value: 'July', label: 'July' },
                                    { value: 'August', label: 'August' },
                                    { value: 'September', label: 'September' },
                                    { value: 'October', label: 'October' },
                                    { value: 'November', label: 'November' },
                                    { value: 'December', label: 'December' },
                                ]} />
                        </Grid.Col>
                        <Grid.Col span="auto">
                            <Select placeholder='Select year' 
                                value={year}
                                label="Year"
                                clearable
                                onChange={setYear}
                                data={['2022', '2023', '2024', '2025'].map(year => ({ value: year, label: year }))} />
                        </Grid.Col>
                        <Grid.Col span="content">
                            <label style={{fontSize: 14, fontWeight: 500}}>Status</label>
                            <SegmentedControl
                                value={status}
                                onChange={setStatus}
                                data={[
                                    { label: 'All', value: 'all' },
                                    { label: 'Paid', value: 'paid' },
                                    { label: 'Unpaid', value: 'unpaid' },
                                ]}
                                fullWidth/>
                        </Grid.Col>
                </Grid>
            </Group>

            </Paper>  

            {/*Filtered Declaration Cards */} 
            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3 }}
                spacing="lg"
                mt="xl"
                >
                {
                    filteredDeclarations.map((declaration) => (
                        <Declaration_Cards
                            key={declaration.id}
                            id={declaration.id}
                            month={declaration.month}
                            year={declaration.year}
                            status={declaration.status}
                            registeredCount={declaration.registeredCount}
                            unregisteredCount={declaration.unregisteredCount}
                            totalAmount={declaration.totalAmount}
                        />
                    ))
                }


            </SimpleGrid>   
                 
        </Container>
    );
}

export default Declaration_History