import { db } from '../firebase';
import { doc, updateDoc } from "firebase/firestore";

/*
* Usage Example
* updateUser("userUid", { lastName: "Doe", regionID: "region2" });
*/

/* Example User Object
const userObject = {
  uid: "uniqueUserId",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  regionID: "region1",
  gender: "male",
  ciHighNotif: true,
  ciLowNotif: false,
  usageHighNotif: true
  }
};
*/

const updateUser = async (uid, userObj) => {
  const userRef = doc(db, "users", uid);

  try {
    await updateDoc(userRef, userObj);
    return { success: true };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: error.message };
  }
};

export default updateUser;