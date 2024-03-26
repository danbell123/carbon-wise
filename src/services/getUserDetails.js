import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';

const fetchUserData = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data(); // Returns user data as an object
    } else {
      return null; // Handle the case where the document doesn't exist
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Propagate the error
  }
};

export default fetchUserData;