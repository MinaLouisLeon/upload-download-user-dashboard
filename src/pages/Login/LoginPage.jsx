import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from "@ionic/react";
import { isMobile } from "mobile-device-detect";
import "./LoginPage.css";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  actionSetUserInfo,
  actionSetNav,
  actionSetAllUsers,
} from "./../../actions/index";
import {
  getAllUsersFromFireStore,
  getUSerInfoFromFirestore,
} from "../../api/firestoreFun";
import HeaderComp from "../../components/HeaderComp/HeaderComp";

const LoginPage = () => {
  const dispatch = useDispatch(null);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  // after login success fet user data from firestore database
  const handleLogin = async (user) => {
    const userDataFromFireStore = await getUSerInfoFromFirestore(user.uid);
    if (userDataFromFireStore === false) {
      // error message
    } else {
      console.log(userDataFromFireStore);
      const userData = {
        uid: user.uid,
        email: user.email,
        password: userPassword,
        emailVerified: user.emailVerified,
        isAdmin: userDataFromFireStore.isAdmin,
      };
      dispatch(actionSetUserInfo(userData));
      if (userDataFromFireStore.isAdmin === true) {
        const allUsersData = await getAllUsersFromFireStore();
        dispatch(actionSetAllUsers(allUsersData));
        dispatch(actionSetNav("AdminUsersPage", "All Users"));
      } else {
        // TODO set title
        dispatch(actionSetNav("ClientPage", "title"));
      }
    }
    console.log(user);
  };
  // handle submit button and login useing firebase auth email/password
  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        handleLogin(user);
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
  };
  return (
    <IonPage>
      {isMobile ? (
        <IonHeader>
          <IonToolbar mode="ios">
            <IonTitle>Mina Louis Leon</IonTitle>
          </IonToolbar>
        </IonHeader>
      ) : (
        <></>
      )}
      <IonContent fullscreen>
        {isMobile ? (
          <></>
        ) : (
          <div style={{ display: "flex" , "flexDirection" : "row" , "justifyContent" : "center"}}>
            <img
              src="/logo.png"
              alt="site logo"
              style={{ width: "157px", height: "100px" }}
              className="ma2"
            />
          </div>
        )}
        <div className="login-main-container mt3">
          <form onSubmit={handleSubmit}>
            <div className="login-inner-container br4 shadow-2 tc h5 w5">
              <IonHeader className="br4">
                <IonToolbar mode="ios" className="br4">
                  <IonTitle>Login</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonList className="br4" mode="md">
                <IonItem>
                  <IonLabel position="stacked">Email:</IonLabel>
                  <IonInput
                    required={true}
                    type="email"
                    autofocus={true}
                    clearInput={true}
                    enterkeyhint="next"
                    mode="md"
                    placeholder="Enter your email"
                    value={userEmail}
                    onIonChange={(e) => setUserEmail(e.detail.value)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Password :</IonLabel>
                  <IonInput
                    required={true}
                    clearOnEdit={true}
                    enterkeyhint="go"
                    inputMode="text"
                    minlength={8}
                    mode="md"
                    placeholder="Enter your password"
                    type="password"
                    value={userPassword}
                    onIonChange={(e) => setUserPassword(e.detail.value)}
                  />
                </IonItem>
                <br />
                <IonButton type="submit">Login</IonButton>
              </IonList>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
