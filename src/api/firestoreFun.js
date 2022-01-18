import {db} from './firebaseConfig';
import {collection,doc,setDoc,getDoc} from "firebase/firestore";
export const getUSerInfoFromFirestore = async (uid) => {
    const docRef = doc(db,"users",uid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        return("data" , docSnap.data());
    }else{
        return false
    }
}