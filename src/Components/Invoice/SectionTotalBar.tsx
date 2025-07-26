import {Group, Text, Box} from '../../../libs';


interface Props{
    color?: 'blue' | 'gray';
    total: number;
}

const SectionTotalBar =({color='blue', total}: Props) => {
    const background =color === 'blue' ? '#e6f1ff' : '#f5f5f5';
    const label = color === 'blue' ? 'Registered Employees Total' : 'Unregistered Employees Total';

    return(
        <Box bg={background} px="md" py="sm" style={{ borderRadius: 8 }}>
            <Group justify='space-between' style={{backgroundcolor:background}} p="md">
                <Text fw={500} c={color ==='gray' ? 'gray' : 'blue'}>{label}</Text>
                <Text fw={600} c={color ==='gray' ? 'gray' : 'blue'}>{total.toLocaleString()}ETB</Text>
            </Group>
        </Box>
        
    );
}


export default SectionTotalBar;