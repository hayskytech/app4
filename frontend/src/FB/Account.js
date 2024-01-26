import React, { useContext } from 'react'
import { MyContext } from '../App'
import { Button } from 'semantic-ui-react'
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";

export default function Account() {
  const { user, setUser } = useContext(MyContext)
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  function doSignin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        setUser(result.user)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  function doLogout() {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });

  }

  return (
    <div>
      {user ?
        <>
          <h3>you are logged in...</h3>
          <Button color='red' onClick={doLogout}>Logout</Button>
        </>
        :
        <>
          <h2>Login or Register</h2>
          <Button color='blue' onClick={doSignin}>Sign in with Google</Button>
        </>
      }
    </div>
  )
}
