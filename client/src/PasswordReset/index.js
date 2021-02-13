import React, { useState } from "react";
import { Link } from "react-router-dom";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
  };
  const sendResetEmail = event => {
    event.preventDefault();
  };
  return (
    <div className="">
      <h1 className="">
        Reset your Password
      </h1>
      <div className="">
        <form action="">
          {emailHasBeenSent && (
            <div className="">
              An email has been sent to you!
            </div>
          )}
          {error !== null && (
            <div className="">
              {error}
            </div>
          )}
          <label htmlFor="userEmail" className="">
            Email:
          </label>
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
          >
            Send me a reset link
          </button>
        </form>
        <Link
         to ="/SignIn"
          className=""
        >
          &larr; back to sign in page
        </Link>
      </div>
    </div>
  );
};
export default PasswordReset;