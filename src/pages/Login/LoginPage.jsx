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
import { actionSetUserInfo } from './../../actions/index';
const LoginPage = () => {
    const dispatch = useDispatch(null);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userData = {
            uid : user.uid,
            email : user.email,
            emailVerified : user.emailVerified,
        }
        dispatch(actionSetUserInfo(userData))
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        if(errorCode === "auth/user-not-found"){
            // error message 
        }else if (errorCode === "auth/wrong-password"){
            // error message 
        }else{
            // error message 
        }
      });
  };
  return (
    <IonPage>
      {/* mobile header */}
      {isMobile ? (
        <IonHeader>
          <IonToolbar mode="ios">
            <IonTitle>Soury SCO</IonTitle>
          </IonToolbar>
        </IonHeader>
      ) : (
        <></>
      )}
      <IonContent fullscreen>
        <div className="login-main-container">
          <form onSubmit={handleSubmit}>
            <div className="login-inner-container br4 shadow-2 tc h5 w5">
              <IonHeader className="br4">
                <IonToolbar mode="ios" className="br4">
                  <IonTitle>Login</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonList className="br4">
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
