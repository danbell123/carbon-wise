import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../firebase'; // Adjust the import path as necessary
import { doc, setDoc } from "firebase/firestore";

// Function to register a new user
export const registerUser = async (email, password, additionalData) => {
  const auth = getAuth();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Store additional user details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      ...additionalData // Spread additional data (like firstName, lastName, etc.)
    });

    return { success: true, userId: user.uid }; // Return success status and user ID
  } catch (error) {
    return { success: false, error: error.message }; // Return failure status and error message
  }
};
