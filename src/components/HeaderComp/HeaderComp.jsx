import "./HeaderComp.css";
import { isMobile } from "mobile-device-detect";
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useSelector } from "react-redux";
import SideMenu from "../SideMenu/SideMenu";
import { useDispatch } from "react-redux";
import { actionSetNav } from "../../actions";
import { logoutFromFirebaseAuth } from "../../api/firestoreFun";
const HeaderComp = ({ children }) => {
  const dispatch = useDispatch(null);
  const title = useSelector((state) => state.navReducer.title);
  return (
    <>
      {isMobile ? <SideMenu /> : <></>}
      {isMobile ? (
        <IonHeader>
          <IonToolbar mode="ios">
            <IonMenuButton slot="start" />
            <IonTitle>{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
      ) : (
        <>
          <div className="header-main-container">
            <div className="header-inner-container">
              <div className="header-logo-container">
                <img
                  alt="site logo"
                  src="/demo/webApps/admin-users-file-hosting-app/logo.png"
                  style={{ width: "157px", height: "100px" }}
                  className="ma2"
                />
              </div>
              <div className="header-nav-container">
                <IonButtons>
                  <IonButton
                    fill="solid"
                    color="primary"
                    shape="round"
                    onClick={() =>
                      dispatch(actionSetNav("AdminUsersPage", "All Users"))
                    }
                  >
                    All Users
                  </IonButton>
                  <IonButton
                    fill="solid"
                    color="primary"
                    shape="round"
                    onClick={() =>
                      dispatch(actionSetNav("AdminAddUser", "Add User"))
                    }
                  >
                    Add User
                  </IonButton>
                  {children}
                  <IonButton
                    fill="solid"
                    color="danger"
                    shape="round"
                    onClick={() => {
                      logoutFromFirebaseAuth();
                      dispatch(actionSetNav("/", "Home"));
                    }}
                  >
                    Logout
                  </IonButton>
                </IonButtons>
              </div>
            </div>
          </div>
          <div style={{ width: "80%", height: "20px" }}></div>
        </>
      )}
    </>
  );
};

export default HeaderComp;
