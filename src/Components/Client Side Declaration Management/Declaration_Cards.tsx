import { Card, Group,Stack, Badge, Text } from '../../../libs'
interface Declaration_Card{
    id: number;
    month: string;
    year: string;
    status: 'paid' | 'unpaid';
    registeredCount: number;
    unregisteredCount: number;
    totalAmount: number;
}


const Declaration_Cards = ({id, month, year, status, registeredCount, unregisteredCount, totalAmount}: Declaration_Card) => {
   

    
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
  <Stack gap="md">
    <Group justify="space-between" align="flex-start">
      <div>
        <Text fw={600} size="lg" c="dark.8">{month} {year}</Text>
        <Text size="sm" c="dark.5">Declaration</Text>
      </div>
      <Badge color={status === 'paid' ? 'blue' : 'red'} variant="filled" size="sm">
        {status.toUpperCase()}
      </Badge>
    </Group>

    <Stack gap="xs">
      <Group justify="space-between">
        <Text size="sm" c="dark.6">Registered Employees</Text>
        <Text size="sm" fw={500} c="dark.8">{registeredCount}</Text>
      </Group>
      <Group justify="space-between">
        <Text size="sm" c="dark.6">Unregistered Employees</Text>
        <Text size="sm" fw={500} c="dark.8">{unregisteredCount}</Text>
      </Group>
      <Group justify="space-between" pt="xs" style={{ borderTop: "1px solid #e9ecef" }}>
        <Text size="sm" fw={500} c="dark.7">Total Amount</Text>
        <Text size="lg" fw={600} c="blue.6">
          {totalAmount.toLocaleString()} ETB
        </Text>
      </Group>
    </Stack>
  </Stack>
</Card>

                
    );
}

export default Declaration_Cards