import "./AdminUsersPage.css";
import {
  IonActionSheet,
  IonContent,
  IonItem,
  IonList,
  IonPage,
} from "@ionic/react";
import { isMobile } from "mobile-device-detect";
import HeaderComp from "../../../components/HeaderComp/HeaderComp";
import { useSelector , useDispatch} from "react-redux";
import { useState } from "react";
import { actionSetNav, actionSetSelectedUser } from './../../../actions/index';
const AdminUsersPage = () => {
  const dispatch = useDispatch(null);
  const enableSideMenu = isMobile ? "enable-sidemenu" : "";
  const listView = isMobile ? "tc" : "tc br4";
  const allUsersData = useSelector(
    (state) => state.allUsersDataReducer.allUsersData
  );
  const [actionSheetState, setActionSheetState] = useState({
    showActionSheet: false,
    key: null,
    username:null
  });

  const contentListData = (
    <IonList className={listView}>
      {Object.keys(allUsersData).map((key) => {
        return (
          <IonItem
            button
            onClick={() =>
              setActionSheetState({ showActionSheet: true, key: key ,username:allUsersData[key].userName})
            }
          >
            {/* {allUsersData[key].userName + " (" + allUsersData[key].email + ")"} */}
            <span>{allUsersData[key].userName}</span>
            <span slot="end">{allUsersData[key].email}</span>
          </IonItem>
        );
      })}
    </IonList>
  );
  return (
    <IonPage>
      {isMobile ? <HeaderComp /> : <></>}
      <IonContent fullscreen id={enableSideMenu}>
        {isMobile ? (
          <>{contentListData}</>
        ) : (
          <>
            <HeaderComp />
            <div className="all-users-main-container">
              <div className="all-users-inner-container br4 shadow-2">
                {contentListData}
              </div>
            </div>
          </>
        )}

        {/* TODO add handler for actionsheet buttons */}
        <IonActionSheet
          mode="ios"
          isOpen={actionSheetState.showActionSheet}
          onDidDismiss={() =>
            setActionSheetState({ showActionSheet: false, key: null ,username:null})
          }
          buttons={[
            {
              text: "Manage Files",
              handler: () => {
                dispatch(actionSetSelectedUser(actionSheetState.key,actionSheetState.username))
                dispatch(actionSetNav("ManageFiles","Manage Files"));
              },
            },
            {
              text: "Delete",
              role: "destructive",
              handler: () => {
                console.log("delete");
              },
            },
            {
              text: "Cancel",
              role: "cancel",
            },
          ]}
        ></IonActionSheet>
      </IonContent>
    </IonPage>
  );
};

export default AdminUsersPage;
