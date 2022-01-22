import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { actionSetNav } from "./../../actions/index";
const SideMenu = () => {
  const dispatch = useDispatch(null);
  const Page = useSelector((state) => state.navReducer.page);
  return (
    <IonMenu contentId="enable-sidemenu">
      <IonHeader>
        <IonToolbar mode="ios">
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem
            button
            onClick={() =>
              dispatch(actionSetNav("AdminUsersPage", "All Users"))
            }
          >
            All Users
          </IonItem>
          <IonItem
            button
            onClick={() => dispatch(actionSetNav("AdminAddUser", "Add User"))}
          >
            <IonLabel>Add User</IonLabel>
          </IonItem>
          {Page === "ManageFiles" ? (
            <IonItem
              button
              onClick={() =>
                dispatch(actionSetNav("UploadFiles", "Upload File"))
              }
            >
              <IonLabel>Upload File</IonLabel>
            </IonItem>
          ) : (
            <></>
          )}
          {/* TODO add logout function */}
          <IonItem button>
            <IonLabel>Logout</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
