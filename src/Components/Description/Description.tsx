import {
    List,
    Title,
    Text,
    Paper,
} from '../../../libs';

const Description = () => {
    return (
        <Paper withBorder>
            <Title order={2}>Welcome to Contribution Management Application</Title>
            <Text mb="lg">This application provides a way to manage contributions of your employees</Text>
            {/* Instructions */}
            <Paper withBorder>
                <Title order={4} >Purposes and Objectives</Title>
                <List pl="20" >
                    <List.Item>View contributions of your employees</List.Item>
                    <List.Item>Add unregistered employees to contributions</List.Item>
                    <List.Item>View your organization's unpaid contributions</List.Item>
                    <List.Item>View your organization's history of contributions</List.Item>
                </List>
            </Paper>
        </Paper>
    );
}

export default Description;