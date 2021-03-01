import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle, auth, generateUserDocument } from "../../utils/firebase";
import "./style.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then(checkIfSignedIn()).catch((error) => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };

  const checkIfSignedIn = () => {
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);

      if (user) {
        return window.location.href = "/pantry"
      } else {
        return null
      }
    });
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <div className="loginIn">
      <h1 className="header">Sign In</h1>
      <div className="Info">
        {error !== null && <div className="errorDiv_Styling">{error}</div>}
        <form className="SignIn">
          {/* both inputs where put in seperate <container> tags with a <br /> in between to allow for seperating the two box and spacing them. */}
          {/* some elements where put into <div> tags to allow them to be center on the page. They all share the same className */}
          <container>
            <div className="center">
              <input
                type="email"
                className="email"
                name="userEmail"
                value={email}
                placeholder="Email"
                id="userEmail"
                onChange={(event) => onChangeHandler(event)}
              />
            </div>
          </container>
          <br />

          <container>
            <div className="center">
              <input
                type="password"
                className="password"
                name="userPassword"
                value={password}
                placeholder="Password"
                id="userPassword"
                onChange={(event) => onChangeHandler(event)}
              />
            </div>
          </container>
          <br />
          <div className="center">
            <button
              className="signUp_Btn"
              onClick={(event) => {
                signInWithEmailAndPasswordHandler(event, email, password);
              }}
            >
              Sign in
            </button>
          </div>
        </form>
        {/* it is my opinion that the code on line 83 can be deleted */}
        {/* <p className="getIn">or</p> */}
        <div className="center">
          <button
            onClick={() => {
              signInWithGoogle().then(checkIfSignedIn());
            }}
            className="google"
          >
            Sign in with Google
          </button>
        </div>
        <div className="center">
          <p className="account"> </p>
        </div>

        <p className="account">
          Don't have an account? <br />
          <Link to="/signUp" className="signup">
            Sign up here
          </Link>{" "}
        </p>

        <Link to="/passwordReset" className="reset">
          <div className="center">
            <p className="forgot"> Forgot Password? </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default SignIn;
