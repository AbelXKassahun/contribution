import {
    List,
    Title,
    Text,
    Paper,
} from '../../../libs';

const Description = () => {
    return (
        <Paper withBorder>
            <Title order={2}>Before you begin.</Title>
            <Text mb="lg">Please read the instructions carefully before proceeding.</Text>
            {/* Instructions */}
            <Paper withBorder>
                <Title order={4} >Purpose of this declaration</Title>
                <List pl="20" >
                    <List.Item>This form is for the purpose of registering your employess contribution.</List.Item>
                </List>
            </Paper>
        </Paper>
    );
}

export default Description;