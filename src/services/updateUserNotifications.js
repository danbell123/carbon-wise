import { db } from '../firebase';
import { doc, updateDoc } from "firebase/firestore";

/*
* Usage Example
* updateUserNotifications("userUid", { ciHighNotif: true, ciLowNotif: false, usageHighNotif: true });
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

// Function to update notification settings for a user
const updateUserNotifications = async (uid, notificationSettings) => {
    const notificationRef = doc(db, "users", uid,);
  
    try {
      await updateDoc(notificationRef, notificationSettings);
      console.log("Notification settings updated successfully");
      return { success: true };
    } catch (error) {
      console.error("Error updating notification settings:", error);
      return { success: false, error: error.message };
    }
  };

export default updateUserNotifications;