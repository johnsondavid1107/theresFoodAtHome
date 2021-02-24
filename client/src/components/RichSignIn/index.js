import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle, auth } from "../../utils/firebase";
import "./style.css";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(window.location.href="/").catch(error => {
          setError("Error signing in with password and email!");
          console.error("Error signing in with password and email", error);
        });
      };


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
          {/* both labels are green out because we don't need them */}
          {/* <label htmlFor="userEmail" className="userEmail">
            Email:
          </label> */}

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
            {/* <label htmlFor="userPassword" className="userPassword">
            Password:
          </label> */}
          </container>
          <br />
          
          {/* Added code to container make page responsive */}
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
              signInWithGoogle();
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
          Don't have an account?{" "}
          <br/>
          <Link to="/signUp" className="signUp">
            Sign up here
          </Link>{" "}
          <br />{" "}
          <Link to = "reset" className="">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignIn;
