import { IonContent, IonPage} from "@ionic/react";
import { isMobile } from "mobile-device-detect";
import HeaderComp from "../../../components/HeaderComp/HeaderComp";
const AdminUsersPage = () => {
    const enableSideMenu = isMobile ? "enable-sidemenu" : "";
    
    return(
        <IonPage>
            {isMobile ? <HeaderComp /> : <></>}
            <IonContent fullscreen id={enableSideMenu}>
                {isMobile ? <></> : <HeaderComp />}
                
            </IonContent>
        </IonPage>
    )
}

export default AdminUsersPage;