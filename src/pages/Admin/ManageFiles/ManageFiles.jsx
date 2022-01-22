import './ManageFiles.css';
import { isMobile } from 'mobile-device-detect';
import { IonButton, IonContent, IonPage } from '@ionic/react';
import HeaderComp from '../../../components/HeaderComp/HeaderComp';
import { useDispatch } from 'react-redux';
import { actionSetNav } from './../../../actions/index';
const ManageFiles = () => {
    const listView = isMobile ? "" : "br4";
    const enableSideMenu = isMobile ? "enable-sidemenu" : "";
    const dispatch = useDispatch(null);
    return(
        <IonPage>
            {isMobile ? <HeaderComp /> : <></>}
            <IonContent fullscreen id={enableSideMenu}>
                {isMobile ? <></> : <HeaderComp>
                    <IonButton fill='solid' shape='round' color="primary" onClick={() => dispatch(actionSetNav("UploadFiles" , "Upload Files"))}>Upload File</IonButton>
                </HeaderComp>}
                {/* TODO add content */}
            </IonContent>
        </IonPage>
    )
}

export default ManageFiles;