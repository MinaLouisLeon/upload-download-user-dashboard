import "./FilesUploader.css";
import { isMobile } from "mobile-device-detect";
import { useDropzone } from "react-dropzone";
import { useMemo } from "react";
import { storage } from "../../../api/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { actionSetUploadReducer } from "../../../actions";
import { useState } from "react";
import Mmodal from "../../../components/Mmodal/Mmodal";
import { actionResetUploadDataReducer ,actionSetNav} from './../../../actions/index';
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
  const uploadObjectReducer = useSelector(
    (state) => state.uploadDataReducer.objectData
  );
  const selectedUserUid = useSelector(state => state.allUsersDataReducer.selectedUser.uid);
  const [showMmodal, setShowMmodal] = useState(false);
  let uploadObject = {};
  // handle close of upload modal and clean upload reducer & upload object
  const handleCloseMmodal = () => {
    setShowMmodal(false);
    uploadObject = {};
    dispatch(actionResetUploadDataReducer());
  };
  // upload files to firebase storage
  const uploadFilesMonitorToFirebaseStorage  = (
    filepath,
    filename,
    filetype,
    file,
    key
  ) => {
    console.log("start uploading")
    const fileRef = ref(storage, filepath, filename);
    const uploadTask = uploadBytesResumable(fileRef, file, filetype);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Progress : ",progress)
        uploadObject = {
          ...uploadObject,
          [key]: {
            ...uploadObject[key],
            progress: progress,
          },
        };

        dispatch(actionSetUploadReducer(uploadObject));
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };
  //call the download function and set path on firebase
  const handleStartUploading = () => {
    Object.keys(uploadObject).map((key) => {
      console.log("start upload function of ",uploadObject[key].file.name);
      uploadFilesMonitorToFirebaseStorage(
        selectedUserUid + "/" + uploadObject[key].file.name,
        uploadObject[key].file.name,
        uploadObject[key].file.type,
        uploadObject[key].file,
        key
      );
    });
  };
  // construct the object for nulti download files
  const handleConstructUploading = async(acceptedFiles) => {
    console.log("start constraction")
    acceptedFiles.map((file) => {
      let filename = file.name;
      uploadObject = {
        ...uploadObject,
        [filename]: {
          file: file,
          progress: 0,
        },
      };
    });
    await dispatch(actionSetUploadReducer(uploadObject));
    console.log("dispatch done")
    handleStartUploading();
  };
  // dropzone styling
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
          {files.length !== 0 ? (
            <>
              <div className="tc">
                <IonButton
                  color="primary"
                  onClick={() => {
                    handleConstructUploading(acceptedFiles);
                    setShowMmodal(true);
                  }}
                >
                  Start uploading
                </IonButton>
              </div>
            </>
          ) : (
            <></>
          )}
        </aside>
      </div>
    );
  }
  // page content
  return (
    <IonPage>
      {isMobile ? (
        <IonHeader>
          <IonToolbar mode="ios">
            <IonButtons>
              <IonButton color="primary" slot="start" onClick={() => dispatch(actionSetNav("ManageFiles","Manage Files"))}>
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
        <Mmodal show={showMmodal} handleClose={() => handleCloseMmodal()}>
          <div className="pa2 ma2">
            <ul>
              {Object.keys(uploadObjectReducer).length === 0 ? (
                <></>
              ) : (
                <>
                  {Object.keys(uploadObjectReducer).map((key) => {
                    return (
                      <li>
                        {uploadObjectReducer[key].file.name} - size :{" "}
                        {uploadObjectReducer[key].file.size} bytes - progress :{" "}
                        {uploadObjectReducer[key].progress}%
                      </li>
                    );
                  })}
                </>
              )}
            </ul>
          </div>
        </Mmodal>
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
                    <IonButton fill="solid" color="primary" shape="round" onClick={() => dispatch(actionSetNav("ManageFiles","Manage Files"))}>
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
