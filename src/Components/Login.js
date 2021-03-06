import { Button, Container, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Alert } from "@material-ui/lab";
import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/Login.css";
import { useAuth } from "./contexts/AuthContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, googleSignin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const guestAcc = async (e) => {
    emailRef.current.value = "user1@guest.com";
    passwordRef.current.value = "guest123";
    await handleSubmit(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //If they filled out the inputs correctly
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/myMap");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  };

  return (
    <Container className="loginContainer" maxWidth="sm">
      <h2 className="loginTitle">Log in</h2>
      <div className="closeButton">
        <Link to="/">
          <CloseIcon style={{ fontSize: 50 }} />
        </Link>
      </div>
      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Email"
            margin="normal"
            type="email"
            inputRef={emailRef}
            required
          />
        </div>
        <div>
          <TextField
            label="Password"
            margin="normal"
            type="password"
            inputRef={passwordRef}
            required
          />
        </div>
        <div className="btnContainer">
          <Button
            disabled={loading}
            variant="contained"
            color="primary"
            type="submit"
          >
            Log In
          </Button>
        </div>
      </form>

      <div>
        <p>
          Login with{" "}
          <Button variant="outlined" onClick={googleSignin}>
            Google Account
          </Button>
        </p>
      </div>

      <div /*GUEST ACCOUNT, UNSURE IF I SHOULD ADD IT*/>
        <p>
          OR
          <br /> <br />
          Try it out with our{" "}
          <Button variant="contained" onClick={guestAcc}>
            Guest Account
          </Button>
        </p>
      </div>

      <div className="links">
        <Link to="/forgot-password">Forgot Password</Link>
      </div>

      <div className="links">
        Need an account?
        <Link to="/signup">
          <br />
          Sign Up
        </Link>
      </div>
    </Container>
  );
};

export default Login;
