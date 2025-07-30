import { Card, Text, Group, Badge } from '../../../libs';

export interface Organization {
  id: string;
  name: string;
  tin: string;
  email: string;
  status: 'active' | 'inactive';
}


const OrganizationCard = ({ organization }: { organization: Organization }) => {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder >
        <Group justify="space-between" align="flex-start">
          <Text fw={600} size="lg" c="dark.8">
            {organization.name}
          </Text>
          <Badge
            color={organization.status === 'active' ? 'green' : 'red'}
            variant="light">
            {organization.status.toUpperCase()}
           </Badge>
        </Group>
          <Text size="sm" c="dimmed" mt={10}>
            TIN:{organization.tin}
          </Text>
      
      <Text size="sm"  mt={10}>
        Email: {organization.email}
      </Text>
    </Card>  
  );
};

export default OrganizationCard;