import {
    Select,
    Grid,
    Paper,
    SegmentedControl,
    Group
} from '../../libs';

type DeclarationFilterProps = {
    month: string | null;
    setMonth: (month: string | null) => void;
    year: string | null;
    setYear: (year: string | null) => void;
    status?: string;
    setStatus?: (status: string) => void;
}

const DeclarationFilter = (FilterProps: DeclarationFilterProps) => {
    return (
        <Paper radius="md" p="md" shadow="xs" bg="gray.0" mt="md" mb="xs" h="75px"
            style={{
                display: 'flex',
                alignItems: 'center',
                width: '35%',
                maxWidth: '50%',
            }}
        >
            <Group>
                <Grid align="flex-end">
                    <Grid.Col span="auto">
                        <Select placeholder='Select month'
                            value={FilterProps.month}
                            label="Month"
                            clearable

                            onChange={FilterProps.setMonth}
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
                            value={FilterProps.year}
                            label="Year"
                            clearable
                            onChange={FilterProps.setYear}
                            data={['2022', '2023', '2024', '2025'].map(year => ({ value: year, label: year }))} />
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
                </Grid>
            </Group>
        </Paper>
    );
}

export default DeclarationFilter;