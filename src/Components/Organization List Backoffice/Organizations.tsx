import {Container, Title, TextInput, Badge, Group, SimpleGrid} from '../../../libs';
import OrganizationCard from './OrganizationCard';
import React, { useState } from 'react';

// src/types/organization.ts

export interface Organization {
  id: string;
  name: string;
  tin: string;
  email: string;
  status: 'active' | 'inactive';
}

 const organizations: Organization[] = [
  {
    id: '1',
    name: 'Microsoft Corporation',
    tin: 'TIN123456789',
    email: 'contact@microsoft.com',
    status: 'active',
  },
  {
    id: '2',
    name: 'Azure Solutions Ltd',
    tin: 'TIN987654321',
    email: 'info@azuresolutions.com',
    status: 'active',
  },
  {
    id: '3',
    name: 'Cloud Services Inc',
    tin: 'TIN456789123',
    email: 'support@cloudservices.com',
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Digital Innovations Co',
    tin: 'TIN789123456',
    email: 'hello@digitalinnovations.com',
    status: 'active',
  },
];

const Organizations = () => {
  const [search, setSearch] = useState('');
  const filteredOrganizations = organizations.filter((org) => {
  const q = search.toLowerCase();
  return (
    org.name.toLowerCase().includes(q) ||
    org.tin.toLowerCase().includes(q) ||
    org.email.toLowerCase().includes(q)
  );
});

    return (
        <Container size="lg" py="xl" >
            <Group justify='space-between' mt="md" mb="md">
                <Title order={1}>Organizations</Title>
                <Badge color="blue" variant="filled" size="lg" radius={0} fw={700}>{organizations.length} ORGANIZATIONS</Badge>
            </Group>
            <TextInput  placeholder="Search organizations by name, TIN, or email..."  style={{flex: 1}}   value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}/>

            <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3 }} // 1 col on mobile, 2 on small screens, 3 on md+
            spacing="md">
             {filteredOrganizations.map((org) => (
            <OrganizationCard key={org.id} organization={org} />
          ))}
            </SimpleGrid>
        </Container>

    );
}

export default Organizations