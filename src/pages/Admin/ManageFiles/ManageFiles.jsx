import "./ManageFiles.css";
import { isMobile } from "mobile-device-detect";
import {
  IonButton,
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonActionSheet,
} from "@ionic/react";
import HeaderComp from "../../../components/HeaderComp/HeaderComp";
import { useDispatch, useSelector } from "react-redux";
import {
  actionSetNav,
  actionSetUserFilesListRef,
} from "./../../../actions/index";
import { useEffect, useState } from "react";
import { ListStoredFilesInFirebaseStorage } from "../../../api/firestoreFun";
import { deleteFileFromFirebaseStorage } from "./../../../api/firestoreFun";
const ManageFiles = () => {
  const SelectedUser = useSelector(
    (state) => state.allUsersDataReducer.selectedUser
  );
  const ListFilesRefObjReducer = useSelector(
    (state) => state.allUsersDataReducer.userFilesListRef
  );
  const [actionSheetState, setActionSheetState] = useState({
    showActionSheet: false,
    fileFullPath: null,
  });
  const fetchListOfFiles = async () => {
    const listRefObj = await ListStoredFilesInFirebaseStorage(SelectedUser.uid);
    dispatch(actionSetUserFilesListRef(listRefObj));
  };
  useEffect(() => {
    fetchListOfFiles();
  }, [actionSheetState.fileFullPath]);
  const listView = isMobile ? "" : "br4";
  const enableSideMenu = isMobile ? "enable-sidemenu" : "";
  const dispatch = useDispatch(null);

  console.log(actionSheetState);
  const pageContent = (
    <>
      <IonList className={listView}>
        {Object.keys(ListFilesRefObjReducer).length !== 0 ? (
          <>
            {Object.keys(ListFilesRefObjReducer).map((key) => {
              return (
                <IonItem
                  button
                  onClick={() => {
                    setActionSheetState({
                      showActionSheet: true,
                      fileFullPath: ListFilesRefObjReducer[key].fullPath,
                    });
                  }}
                >
                  <IonLabel>{ListFilesRefObjReducer[key].name}</IonLabel>
                </IonItem>
              );
            })}
          </>
        ) : (
          <>
            <div className="tc pa2 ma2">
              <h1>No Files Found for this User</h1>
            </div>
          </>
        )}
      </IonList>
    </>
  );

  return (
    <IonPage>
      {isMobile ? <HeaderComp /> : <></>}
      <IonContent fullscreen id={enableSideMenu}>
        {isMobile ? (
          <></>
        ) : (
          <HeaderComp>
            <IonButton
              fill="solid"
              shape="round"
              color="primary"
              onClick={() =>
                dispatch(actionSetNav("UploadFiles", "Upload Files"))
              }
            >
              Upload File
            </IonButton>
          </HeaderComp>
        )}
        {/* TODO add content */}
        {isMobile ? (
          <>{pageContent}</>
        ) : (
          <>
            <div className="manage-files-main-container">
              <div className="manage-files-inner-container br4 shadow-2">
                {pageContent}
              </div>
            </div>
          </>
        )}
        <IonActionSheet
          mode="ios"
          isOpen={actionSheetState.showActionSheet}
          onDidDismiss={() =>
            setActionSheetState({ showActionSheet: false, fileFullPath: null })
          }
          buttons={[
            {
              text: "Delete",
              role: "destructive",
              handler: () => {
                deleteFileFromFirebaseStorage(actionSheetState.fileFullPath);
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

export default ManageFiles;
