import {db} from './firebaseConfig';
import {collection,doc,setDoc,getDoc} from "firebase/firestore";
import { getStorage, ref ,uploadBytes } from "firebase/storage";
export const getUSerInfoFromFirestore = async (uid) => {
    const docRef = doc(db,"users",uid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        return("data" , docSnap.data());
    }else{
        return false
    }
}

export const addUserInfoToFireStore = async (uid,userData) => {
    await setDoc(doc(db,"users",uid),userData);
    return true
}

export const uploadFileToFirebaseStorage = async (filePath,file) => {
    const storage = getStorage();
    const fileRef = ref(storage,filePath);
    await uploadBytes(fileRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    return true;
}