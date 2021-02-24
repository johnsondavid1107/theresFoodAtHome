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
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, { displayName });
      console.log("clicked")
      console.log("value of user is " + JSON.stringify(user))
      window.location.href = "/"
    }
    catch (error) {
      setError('Error Signing up with email and password \n.  ' + error.message);
      console.log(error)

    }

    setEmail("");
    setPassword("");
    setDisplayName("");
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
    <div className="signUp">
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

          {/* <label htmlFor="userEmail" className="block">
            Email:
          </label> */}
          <container size="lg-12">
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

          {/* <label htmlFor="userPassword" className="block">
            Password:
          </label> */}

          {/* Added code to make page responsive - Zo */}
          <container size="lg-12">
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
              className="btn"
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
              signInWithGoogle();
            }}
          >
            Sign In with Google
          </button>
        </div>

        <p className="account">
          Already have an account?{" "}
          <Link to="/SignIn" className="signIn">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUp;
