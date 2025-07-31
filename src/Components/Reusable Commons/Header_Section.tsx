import {
    Group,
    Title,
    Text,
    Badge,
}
from '../../../libs';

interface Header_Section_Props{
    title: string;
    date: string;
    status: 'PAID' | 'UNPAID';
}

const Header_Section = ({title,date,status}: Header_Section_Props) => {
    return(
        <Group justify="space-between">
            <div>
                <Title order={2}>{title}</Title>
                <Text size='sm' c="dimmed">Generated on {date}</Text>
            </div>
            <Badge color= {status ==='PAID' ? 'blue' : 'red' } variant="filled" size='lg'>{status}</Badge>
        </Group>
    );
};

export default Header_Section;