// Utility functions for notifications and error handling

import { onAuthStateChanged } from "firebase/auth";
import { useStore } from "./store/userStore";
import { auth } from "./config/firebase";

export function handleError(error) {
  if (typeof error === "string") {
    alert(error);
  } else if (error && error.message) {
    alert(error.message);
  } else {
    alert("An unknown error occurred.");
  }
}

export function handleSuccess(message) {
  alert(message);
}


export const initAuthListener = () => {
  const {setUser} = useStore.getState();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    }  else {
      setUser(null);
    }
  });
}