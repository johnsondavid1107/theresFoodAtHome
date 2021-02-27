import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../utils/firebase";
import NavBar from "./components/NavBar/index.js";
import Footer from "../components/Footer/Footer.js";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
  };

  const sendResetEmail = (event) => {
    event.preventDefault();
    console.log(event);
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => {
          setEmailHasBeenSent(false);
        }, 3000);
      })
      .catch(() => {
        setError("Error resetting password");
      });
  };

  return (
    <div className="color">
      <NavBar />
      <h1 className="reset">Reset your Password</h1>
      <div className="password">
        <form action="action">
          {emailHasBeenSent && (
            <div className="email">An email has been sent to you!</div>
          )}
          {error !== null && <div className="error">{error}</div>}
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            value={email}
            placeholder="Input your email"
            onChange={onChangeHandler}
            className=""
          />
          <button
            className=""
            onClick={(event) => {
              sendResetEmail(event);
            }}
          >
            Send me a reset link
          </button>
        </form>
        <Link to="/SignIn" className="">
          &larr; back to sign in page
        </Link>
        <Footer />
      </div>
    </div>
  );
};
export default PasswordReset;
