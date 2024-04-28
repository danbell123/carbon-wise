import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../firebase'; // Adjust the import path as necessary
import { doc, setDoc } from "firebase/firestore";

// Function to register a new user
export const registerUser = async (email, password, additionalData) => {
  const auth = getAuth();

  console.log("Registering user:",);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("email1:", email)

    if (email === null) {
      email = user.email;
    }
    
    console.log("email2:", email)

    // Store additional user details in Firestore
    console.log("Storing this user in Firestore:", user.uid, email, additionalData)
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      ...additionalData // Spread additional data (like firstName, lastName, etc.)
    });

    return { success: true, userId: user.uid }; // Return success status and user ID
  } catch (error) {
    return { success: false, error: error.message }; // Return failure status and error message
  }
};
