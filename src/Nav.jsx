import { useSelector } from "react-redux";
import LoginPage from "./pages/Login/LoginPage";
import AdminUsersPage from "./pages/Admin/UsersPage/AdminUsersPage";
import AddUserPage from "./pages/Admin/AddUserPage/AddUserPage";
const Nav = () => {
    const page = useSelector(state => state.navReducer.page);
    const handleNav = () => {
        switch(page) {
            case '/' :
                return(<LoginPage/>)
            case 'AdminUsersPage' :
                return(<AdminUsersPage/>) 
            case 'AdminAddUser' : 
                return(<AddUserPage />)
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