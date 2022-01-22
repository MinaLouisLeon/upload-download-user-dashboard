import "./UploadFiles.css";
import { isMobile } from "mobile-device-detect";
import HeaderComp from "../../../components/HeaderComp/HeaderComp";
import { IonButton, IonContent, IonPage } from "@ionic/react";
import { useDropzone } from "react-dropzone";
import { useMemo } from "react";
import { storage } from "../../../api/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { actionSetUploadReducer } from "../../../actions";
const UploadFiles = () => {
  const dispatch = useDispatch(null);
  const uploadObjectReducer = useSelector(
    (state) => state.uploadDataReducer.objectData
  );
  const enableSideMenu = isMobile ? "enable-sidemenu" : "";
  let uploadObject = {};
  const uploadFilesMonitorToFirebaseStorage = async (
    filepath,
    filename,
    filetype,
    file,
    key
  ) => {
    const fileRef = ref(storage, filepath, filename);
    const uploadTask = uploadBytesResumable(fileRef, file, filetype);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

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

  const startUploadFiles = () => {
    Object.keys(uploadObject).map((key) => {
      uploadFilesMonitorToFirebaseStorage(
        "files/" + uploadObject[key].file.name,
        uploadObject[key].file.name,
        uploadObject[key].file.type,
        uploadObject[key].file,
        key
      );
    });
  };

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
    // TODO add file location on upload
    const makeUploadObject = async (file) => {
      let filename = file.name;
      uploadObject = {
        ...uploadObject,
        [filename]: {
          file: file,
          progress: 0,
        },
      };
    };
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
        </aside>
        {acceptedFiles.map((file) => {
          makeUploadObject(file);
        })}
        <ul>
          {Object.keys(uploadObjectReducer).length === 0 ? (
            <>{files}</>
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
        {/* TODO start upload function */}
        {Object.keys(uploadObject).length === 0 ? (
          <></>
        ) : (
          <>
            <div className="tc">
              <IonButton
                onClick={() => {
                  startUploadFiles();
                }}
              >
                Start Upload
              </IonButton>
            </div>
          </>
        )}
      </div>
    );
  }
  return (
    <IonPage>
      {/* TODO add upload function */}
      {isMobile ? <HeaderComp /> : <></>}
      <IonContent fullscreen id={enableSideMenu}>
        {isMobile ? (
          <>
            <StyledDropzone />
          </>
        ) : (
          <>
            {" "}
            <HeaderComp />
            <div className="upload-files-main-container">
              <div className="upload-files-inner-container br4 shadow-2">
                <StyledDropzone />
              </div>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default UploadFiles;
