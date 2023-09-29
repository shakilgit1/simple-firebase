import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";

const Login = () => {
  const [userInfo, setUserInfo] = useState(null);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUserInfo(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
    .then(result => {
        const gitUser = result.user;
        setUserInfo(gitUser);
        console.log(gitUser);
    })
    .catch(error => {
        console.log(error);
    })
  }
  
  const handleSignOut = () => {
    signOut(auth)
    .then(result => {
        setUserInfo(null);
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    })
  }

  return (
    <div>
        {userInfo? 
            <button onClick={handleSignOut}>Sign out</button> :
            <><button onClick={handleGoogleSignIn}>Google Login</button>
            <button onClick={handleGithubSignIn}>Github Login</button>
            </>
        }

      {userInfo && (
        <div>
          <h2>User name: {userInfo.displayName}</h2>
          <p>User name: {userInfo.email}</p>
          <img src={userInfo.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default Login;
