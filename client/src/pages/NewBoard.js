import Nav from '../components/Navbar';
import { useUserContext } from '../utils/GlobalState';

function NewBoard() {
    const { state, dispatch } = useUserContext();
    const currentUser = state.user;
    console.log(currentUser);
    
    return(
        <>
            <Nav />
            <h1>This will be the board creation station.</h1>
        </>    
    )
}

export default NewBoard;