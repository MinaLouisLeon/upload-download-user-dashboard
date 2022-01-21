import "./AddUserPage.css";
import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonInput,
  IonButton,
  IonCheckbox,
} from "@ionic/react";
import { isMobile } from "mobile-device-detect";
import HeaderComp from "../../../components/HeaderComp/HeaderComp";
import { useState } from "react";
import { useSelector } from "react-redux";
//add user to firebase auth
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addUserInfoToFireStore } from "../../../api/firestoreFun";
const AddUserPage = () => {
  //enable side menu on mobile view
  const enableSideMenu = isMobile ? "enable-sidemenu" : "";
  //enbale border raduis on desktop view
  const listView = isMobile ? "tc" : "tc br4";
  // states to hold inputs
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  // password for current user
  const currentUserInfo = useSelector(
    (state) => state.userInfoReducer.userInfo
  );
  // form view common in mobile and desktop
  const contentData = (
    <IonList mode="md" className={listView}>
      <IonItem>
        <IonLabel position="stacked">User Name :</IonLabel>
        <IonInput
          required
          type="text"
          placeholder="Enter User Name :"
          clearInput={true}
          onIonChange={(e) => setUserName(e.detail.value)}
          value={userName}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Email :</IonLabel>
        <IonInput
          required
          type="email"
          placeholder="Enter User Email :"
          clearInput={true}
          onIonChange={(e) => setEmail(e.detail.value)}
          value={email}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Password :</IonLabel>
        <IonInput
          required
          type="password"
          placeholder="Enter User Password :"
          clearOnEdit={true}
          minlength={8}
          onIonChange={(e) => setPassword(e.detail.value)}
          value={password}
        />
      </IonItem>
      <IonItem button onClick={() => setIsAdmin(!isAdmin)}>
        <IonLabel>Is Admin</IonLabel>
        <IonCheckbox
          mode="ios"
          checked={isAdmin}
          color="primary"
          slot="start"
        />
      </IonItem>
      <br />
      <IonButton type="submit">Add User</IonButton>
    </IonList>
  );
  //handle logout for new user and login for main user
  const handleReLogin = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        signInWithEmailAndPassword(auth, currentUserInfo.email, currentUserInfo.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user)
          })
          .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/user-not-found") {
              // error message
            } else if (errorCode === "auth/wrong-password") {
              // error message
            } else {
              // error message
            }
          });
      })
      .catch((error) => {
        // An error happened.
      });
  };
  //handle adding new user to firestore
  const handleAddNewUser = async (uid, newUserData) => {
    const res = await addUserInfoToFireStore(uid, newUserData);
    handleReLogin();
    console.log(res);
  };
  //   handle add user button click
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("new user");
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const newUserData = {
          email: user.email,
          isAdmin: isAdmin,
          userName: userName,
        };
        handleAddNewUser(user.uid, newUserData);
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
      // reset inputs
      setUserName("");
      setEmail("");
      setPassword("");
      setIsAdmin(false);
  };
  return (
    <IonPage>
      {isMobile ? <HeaderComp /> : <></>}
      <IonContent fullscreen id={enableSideMenu}>
        {isMobile ? (
          <form onSubmit={handleSubmit}>{contentData}</form>
        ) : (
          <>
            <HeaderComp />
            <div className="add-user-main-container">
            <div className="add-user-inner-container br4 shadow-2 tc br4">
              <form onSubmit={handleSubmit}>{contentData}</form>
            </div>
          </div>.
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default AddUserPage;
