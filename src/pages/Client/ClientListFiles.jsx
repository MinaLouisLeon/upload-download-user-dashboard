import "./ClientListFiles.css";
import { useEffect ,useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { isMobile } from "mobile-device-detect";
import {
  IonActionSheet,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { downloadFileFromFirebaseStorage, ListStoredFilesInFirebaseStorage,logoutFromFirebaseAuth } from "../../api/firestoreFun";
import { actionSetNav } from "../../actions";

const ClientListPage = () => {
    const userInfo = useSelector(state => state.userInfoReducer.userInfo);
    const [fileList,setFileList] = useState({});
    const fetchListUserFiles = async () => {
        const listFileObjRef = await ListStoredFilesInFirebaseStorage(userInfo.uid);
        setFileList(listFileObjRef);
    }
    console.log(fileList)
    useEffect(() => {
        fetchListUserFiles();
    },[])
  const dispatch = useDispatch(null);
  const listView = isMobile ? "" : "br4";
  const [actionSheetState,setActionSheetState] = useState({showActionSheet:false,fileFullPath:null})
  const handleDownloadFile = (fileFullPath) => {
    
  }
  const pageContent = (
    <>
      <IonList className={listView}>
        {Object.keys(fileList).length !== 0 ? <>
            {Object.keys(fileList).map((key) => {
                return(
                    <IonItem button onClick={() => setActionSheetState({showActionSheet:true,fileFullPath:fileList[key].fullPath})}>
                        <IonLabel>{fileList[key].name}</IonLabel>
                    </IonItem>
                )
            })}
        </> : <></>}
      </IonList>
    </>
  );
  return (
    <IonPage>
      {isMobile ? (
        <IonHeader>
          <IonToolbar mode="ios">
            <IonTitle>Files</IonTitle>
            <IonButtons slot="end">
              <IonButton color="danger" onClick={() => {
                 logoutFromFirebaseAuth();
                 dispatch(actionSetNav("/","Home"));
              }}>Logout</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      ) : (
        <></>
      )}
      <IonContent fullscreen>
        {isMobile ? (
          <>{pageContent}</>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <img
                src="/logo.png"
                alt="site logo"
                style={{ width: "157px", height: "100px" }}
              />
              <IonButton color="danger" shape="round" onClick={() => {
                 logoutFromFirebaseAuth();
                 dispatch(actionSetNav("/","Home"));
              }}>
                Logout
              </IonButton>
            </div>
            <div className="mt3 client-list-files-main-container">
              <div className="client-list-files-inner-container shadow-2 br4">
                {pageContent}
              </div>
            </div>
          </>
        )}
        {/* TODO add action sheet state */}
        <IonActionSheet
          mode="ios"
          isOpen={actionSheetState.showActionSheet}
          onDidDismiss={() => setActionSheetState({showActionSheet:false,fileFullPath:null})}
          buttons={[
            {
              text: "Download File",
              handler: () => {
                // TODO add download function
                handleDownloadFile(actionSheetState.fileFullPath);
                downloadFileFromFirebaseStorage(actionSheetState.fileFullPath)
                console.log("download");
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

export default ClientListPage;
