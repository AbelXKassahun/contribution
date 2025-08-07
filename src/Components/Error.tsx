import { 
    IconExclamationCircleFilled
} from '../../libs';

type ErrorMsgProps = {
    message: string
}
const ErrorMsg = ({message}: ErrorMsgProps) => {
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <IconExclamationCircleFilled 
            size={80}
            color="red" 
        />
        {/* <p>Loading unregistered employees info</p> */}
        <p>{message}</p>
    </div>;
}

export default ErrorMsg;