import "./FilesUploader.css";
import { isMobile } from "mobile-device-detect";
import { useDropzone } from "react-dropzone";
import { useMemo } from "react";
import { storage } from "../../../api/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { actionSetUploadReducer } from "../../../actions";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
const FilesUploader = () => {
  const dispatch = useDispatch(null);
  const PageTitle = useSelector((state) => state.navReducer.title);
  let uploadObject = {};
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };
  const acceptStyle = {
    borderColor: "#00e676",
  };
  const rejectStyle = {
    borderColor: "#ff1744",
  };
  function StyledDropzone(props) {
    const {
      getRootProps,
      getInputProps,
      isFocused,
      isDragAccept,
      isDragReject,
      acceptedFiles,
    } = useDropzone();
    const style = useMemo(
      () => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
      }),
      [isFocused, isDragAccept, isDragReject]
    );
    const files = acceptedFiles.map((file) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
    return (
      <div className="container ma2">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside className="ml4">
          <h4>Files</h4>
          <ul>{files}</ul>
          {files.length !== 0 ? <>
             <div className="tc">
             <IonButton color="primary">Start uploading</IonButton>
             </div>
          </> : <></>}
        </aside>
      </div>
    );
  }
  return (
    <IonPage>
      {isMobile ? (
        <IonHeader>
          <IonToolbar mode="ios">
            <IonButtons>
              <IonButton color="primary" slot="start">
                Back
              </IonButton>
              <IonTitle>{PageTitle}</IonTitle>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      ) : (
        <></>
      )}
      <IonContent fullscreen>
        {isMobile ? (
          <>
            <StyledDropzone />
          </>
        ) : (
          <>
            <div className="header-main-container">
              <div className="header-inner-container">
                <div className="header-logo-container">
                  <img
                    alt="site logo"
                    src="/logo.png"
                    style={{ width: "157px", height: "100px" }}
                    className="ma2"
                  />
                </div>
                <div className="header-nav-container">
                  <IonButtons>
                    <IonButton fill="solid" color="primary" shape="round">
                      Back
                    </IonButton>
                    <IonButton fill="solid" color="danger" shape="round">
                      Logout
                    </IonButton>
                  </IonButtons>
                </div>
              </div>
            </div>
            <div className="files-uploader-main-container">
              <div className="files-uploader-inner-container br4 shadow-2">
                <StyledDropzone />
              </div>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default FilesUploader;
