import './HeaderComp.css'
import { isMobile } from "mobile-device-detect";
import { IonButton, IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';
import { useSelector } from "react-redux";
import SideMenu from "../SideMenu/SideMenu";
import { useDispatch } from 'react-redux';
import {actionSetNav} from '../../actions';
const HeaderComp = ({children}) => {
    const dispatch = useDispatch(null);
    const title = useSelector(state => state.navReducer.title);
    return(
        <>  
            {isMobile ? <SideMenu /> : <></>}
            {isMobile ? <IonHeader>
                <IonToolbar mode="ios">
                    <IonMenuButton slot="start" />
                    <IonTitle>{title}</IonTitle>
                </IonToolbar>
            </IonHeader> : <>
            <div className='header-main-container'>
            <div className="header-inner-container">
                <div className="header-logo-container">
                    <img alt='site logo' src='/logo.png' style={{width : "157px" , height : "100px"}} className='ma2'/>
                </div>
                <div className="header-nav-container">
                    <IonButtons>
                        <IonButton fill='solid' color="primary" shape='round' onClick={() => dispatch(actionSetNav("AdminUsersPage","All Users"))}>All Users</IonButton>
                        <IonButton fill='solid' color="primary" shape='round' onClick={() => dispatch(actionSetNav("AdminAddUser" , "Add User"))}>Add User</IonButton>
                        {children}
                        {/* TODO add logout function */}
                        <IonButton fill='solid' color="danger" shape='round'>Logout</IonButton>
                    </IonButtons>
                </div>
            </div>
            </div>
            <div style={{"width" : "80%" , height : "20px"}}></div>
            </>}
        </>
    )
}

export default HeaderComp;