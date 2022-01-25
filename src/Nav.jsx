import { useSelector } from "react-redux";
import LoginPage from "./pages/Login/LoginPage";
import AdminUsersPage from "./pages/Admin/UsersPage/AdminUsersPage";
import AddUserPage from "./pages/Admin/AddUserPage/AddUserPage";
import ManageFiles from "./pages/Admin/ManageFiles/ManageFiles";
import FilesUploader from "./pages/Admin/FilesUploader/FilesUploader";
import ClientListPage from "./pages/Client/ClientListFiles";
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
            case 'ManageFiles' :
                return(<ManageFiles />)
            case 'UploadFiles' :
                return (<FilesUploader />)
            case 'ClientListPage' : 
                return(<ClientListPage/>)
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