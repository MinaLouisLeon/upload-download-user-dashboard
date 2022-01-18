import { useSelector } from "react-redux";
import LoginPage from "./pages/Login/LoginPage";
import AdminUsersPage from "./pages/Admin/UsersPage/AdminUsersPage";
const Nav = () => {
    const page = useSelector(state => state.navReducer.page);
    const handleNav = () => {
        switch(page) {
            case '/' :
                return(<LoginPage/>)
            case 'AdminUsersPage' :
                return(<AdminUsersPage/>) 
            default : 
                return(<LoginPage/>)
        }
    }
    return(
        <>
            {handleNav()}
        </>
    )
}

export default Nav;