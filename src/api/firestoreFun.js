import {db , storage} from './firebaseConfig';
import {collection,doc,setDoc,getDoc,getDocs} from "firebase/firestore";
import { ref ,uploadBytes ,uploadBytesResumable,getDownloadURL} from "firebase/storage";
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
    const fileRef = ref(storage,filePath);
    // const uploadTask = uploadBytesResumable(fileRef, filePath);
    await uploadBytes(fileRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    // uploadTask.on('state_changed', 
    // (snapshot) => {
    //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log('Upload is ' + progress + '% done');
    // },(error) => {
    //     console.error(error)
    // }
    // )
}

export const uploadFilesMonitorToFirebaseStorage = async (filepath,filename,filetype,file) => {
    const fileRef = ref(storage, filepath , filename);
    const uploadTask = uploadBytesResumable(fileRef,file,filetype);
    let progressRes = 0
    uploadTask.on('state_changed' , (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        progressRes = progress;
    },() => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
          });
    })
    return progressRes;
}

export const getAllUsersFromFireStore = async () => {
    const querySnapshot = await getDocs(collection(db,"users"));
    let dataObj = {};
    querySnapshot.forEach((doc) => {
       dataObj = {
           ...dataObj,
           [doc.id] : doc.data() 
       }
    })
    return dataObj;
}