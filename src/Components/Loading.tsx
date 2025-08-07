import { Loader } from '../../libs';

type LoadingProps = {
    message: string
}
const Loading = ({message}: LoadingProps) => {
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Loader size={30} />
        {/* <p>Loading unregistered employees info</p> */}
        <p>{message}</p>
    </div>;
}

export default Loading;