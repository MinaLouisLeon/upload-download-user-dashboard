import { db, storage } from "./firebaseConfig";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { ref, listAll, deleteObject } from "firebase/storage";
export const getUSerInfoFromFirestore = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return "data", docSnap.data();
  } else {
    return false;
  }
};

export const addUserInfoToFireStore = async (uid, userData) => {
  await setDoc(doc(db, "users", uid), userData);
  return true;
};

export const getAllUsersFromFireStore = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  let dataObj = {};
  querySnapshot.forEach((doc) => {
    dataObj = {
      ...dataObj,
      [doc.id]: doc.data(),
    };
  });
  return dataObj;
};

export const ListStoredFilesInFirebaseStorage = async (uid) => {
  const listRef = ref(storage, uid);
  let listRefObj = {};
  await listAll(listRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        console.log(itemRef);
        listRefObj = {
          ...listRefObj,
          [itemRef.name]: itemRef,
        };
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return listRefObj;
};

export const deleteFileFromFirebaseStorage = async (fullPath) => {
  console.log(fullPath);
  console.log(typeof fullPath);
  const deleteFileRef = ref(storage, fullPath);

  deleteObject(deleteFileRef)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log("error : ", error);
      return false;
    });
};
