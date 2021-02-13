import React, {useState} from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const signInWithEmailAndPasswordHandler = 
            (event,email, password) => {
                event.preventDefault();
    };

      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;

          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };

  return (
    <div className="">
      <h1 className="">Sign In</h1>
      <div className="">
        {error !== null && <div className = "errorDiv_Styling">{error}</div>}
        <form className="">
          <label htmlFor="userEmail" className="">
            Email:
          </label>
          <input
            type="email"
            className=""
            name="userEmail"
            value = {email}
            placeholder="E.g: email123@gmail.com"
            id="userEmail"
            onChange = {(event) => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="">
            Password:
          </label>
          <input
            type="password"
            className=""
            name="userPassword"
            value = {password}
            placeholder="Your Password"
            id="userPassword"
            onChange = {(event) => onChangeHandler(event)}
          />
          <button className="" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
            Sign in
          </button>
        </form>
        <p className="">or</p>
        <button
          className="">
          Sign in with Google
        </button>
        <p className="">
          Don't have an account?{" "}
          <Link to="/signUp" className="">
            Sign up here
          </Link>{" "}
          <br />{" "}
          <Link to = "/passwordReset" className="">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignIn;