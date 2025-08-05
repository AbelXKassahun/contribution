import { Paper, Stack, Text, Title, Group } from '../../libs';

interface TotalContributionCard_Props {
    totalAmount: number;
    totalEmployees: number;
}

const TotalContributionCard = ({ totalAmount, totalEmployees }: TotalContributionCard_Props) => {
    return (
        <Paper withBorder shadow="lg" radius="md" mt="0" p="0">
            <Group p="md" justify="space-between">
                <Stack gap={0}>
                    <Text fw={550} fz={20} >Total Monthly Contribution</Text>
                    <Text size='sm' c="dimmed">Combined contribution from all employees</Text>
                </Stack>

                <Stack gap={0} align="flex-end">
                    <Title order={3} c="blue">{totalAmount.toLocaleString()} ETB</Title>
                    <Text size='sm' c="dimmed">{totalEmployees} employees total</Text>

                </Stack>
            </Group>

        </Paper>
    );
};

export default TotalContributionCard;