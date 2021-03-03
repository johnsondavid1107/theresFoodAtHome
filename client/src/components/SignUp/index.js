import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  generateUserDocument,
  auth,
  signInWithGoogle,
} from "../../utils/firebase";
import "./style.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password
  ) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      generateUserDocument(user, { displayName }).then(checkIfSignedIn());
    } catch (error) {
      setError("Error Signing up with email and password");
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const checkIfSignedIn = () => {
    auth.onAuthStateChanged(async (userAuth) => {
      const user = await generateUserDocument(userAuth);

      if (user) {
        return (window.location.href = "/pantry");
      } else {
        return null;
      }
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };
  return (
    <div className="sign">
      <h1 className="header">Sign Up</h1>
      <div className="information">
        {error !== null && <div className="error">{error}</div>}

        <form className="data">
          {/* again both labels are green out because I don't feel we need them. */}
          {/* <label htmlFor="displayName" className="disName">
            Display Name:</label> */}
          <container>
            <div className="center">
              <input
                type="text"
                className="playName"
                name="displayName"
                value={displayName}
                placeholder="Full Name"
                id="displayName"
                onChange={(event) => onChangeHandler(event)}
              />
            </div>
          </container>
          <br />
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
                createUserWithEmailAndPasswordHandler(event, email, password);
              }}
            >
              Sign up
            </button>
          </div>
        </form>
        {/* It is my thinking that we don't need line 119 */}
        {/* <p className="setUp">or</p> */}
        <div className="center">
          <button
            className="google"
            onClick={() => {
              signInWithGoogle().then(checkIfSignedIn());
            }}
          >
            Sign In with Google
          </button>
        </div>

        <p className="account">
          Already have an account?
          <br />
          <Link to="/SignIn" className="signin">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUp;
