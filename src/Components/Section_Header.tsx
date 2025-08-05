import {Group, Text, Badge} from '../../libs'

interface SectionHeaderProps {
    title: string;
    count: number;
    color?: 'blue' | 'gray';
}

const SectionHeader = ({title, count, color}: SectionHeaderProps) => {
    const badgeLabel = `${count} Employees`;
    const badgecolor = color === 'gray' ? 'gray' : 'blue';
    const textcolor = color === 'gray' ? 'dimmed' : 'blue';
    return (
        <Group justify="space-between" ml={10} w={'100%'}>
            <Text size='lg' fw={700} c={textcolor}>{title}</Text>
            <Badge color={badgecolor} variant="filled" size='lg'>{badgeLabel}</Badge>
        </Group>
    )
}

export default SectionHeader