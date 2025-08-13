import { useState } from 'react';
import {
    // Select,
    Grid,
    Paper,
    SegmentedControl,
    Group,
} from '../../libs';

import { EthiopianPeriodPicker } from './EthiopianPeriodPicker/Ethiopian_Period_Picker'

import EthiopianDatePicker from './Ethiopian-Date-Picker/Ethiopian_Date_Picker';
type DeclarationFilterProps = {
    month: string | null;
    setMonth: (month: string | null) => void;
    year: string | null;
    setYear: (year: string | null) => void;
    status?: string;
    setStatus?: (status: string) => void;
}

const DeclarationFilter = (FilterProps: DeclarationFilterProps) => {
    const [date, setDate] = useState<string | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState<{
        type: "monthly" | "yearly"
        period: string
        year: string
        label: string
        startDate: string
        endDate: string
    } | null>(null)

    console.log("Selected period:", selectedPeriod);

    return (
        <Paper radius="md" p="md" shadow="xs" bg="gray.0" mt="md" mb="xs" h="75px"
            style={{
                display: 'flex',
                alignItems: 'center',
                // width: '35%',
                maxWidth: '45%',
            }}
        >
            <Group>
                <Grid align="flex-end">
                    <Grid.Col span="content" mr={"md"}>
                        <EthiopianPeriodPicker
                            onChange={(period) => {
                                // console.log("Selected period:", period)
                                setSelectedPeriod(period)
                            }}
                            placeholder="Choose a period..."
                        />
                    </Grid.Col>
                    {FilterProps.status && (
                        <Grid.Col span="content">
                            <label style={{ fontSize: 14, fontWeight: 500 }}>Status</label>
                            <SegmentedControl
                                value={FilterProps.status}
                                onChange={FilterProps.setStatus}
                                data={[
                                    { label: 'All', value: 'all' },
                                    { label: 'Paid', value: 'paid' },
                                    { label: 'Unpaid', value: 'unpaid' },
                                ]}
                                fullWidth />
                        </Grid.Col>
                    )}
                    <Grid.Col span="content">
                        <EthiopianDatePicker
                            value={date}
                            onChange={(date) => {
                                setDate(date);
                                console.log("picked_date", date);
                            }}
                            label="Select Date"
                            placeholder="Pick a date"
                            size="xs"
                            inputSize="sm"
                            width="200px"
                            allowFutureDates={false}
                        />
                    </Grid.Col>
                </Grid>
            </Group>
        </Paper>
    );
}

export default DeclarationFilter;