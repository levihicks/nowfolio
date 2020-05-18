import React, { useState, useContext } from "react";
import styled from "styled-components";
import { compose } from "recompose";
import { Redirect, useLocation } from "react-router-dom";

import FormInput from "../UI/FormInput";
import FormSubmit from "../UI/FormSubmit";
import { AuthContext } from "../../session";
import Spinner from "../UI/Spinner";
import * as ROUTES from "../../constants/routes";
import withErrorModal from "../../hoc/withErrorModal";

import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
} from "../../firebase";

const AuthenticateFormContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: stretch;
  @media (max-width: 767px) {
    height: auto;
  }
`;

const AuthenticateForm = styled.form`
  border: 1px solid ${(props) => props.theme.lightGreen};
  border-radius: 30px;
  height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  position: relative;
  @media (max-width: 767px) {
    border: none;
    height: auto;
  }
`;

const AuthenticateFormHeader = styled.div`
  font-size: 2rem;
  font-weight: bold;
  background: ${(props) => props.theme.white};
  padding: 10px;
  position: absolute;
  transform: translateY(-50%);
  top: 0;
  left: 10%;
  display: inline-block;
  width: auto;
  @media (max-width: 767px) {
    position: relative;
    transform: none;
  }
`;

const PromptText = styled.p`
  margin: 0;
  margin-top: 20px;
  border-top: 1px solid ${(props) => props.theme.lightGreen};
  text-align: center;
  width: 100%;
  padding: 20px 0;
  color: ${(props) => props.theme.gray};
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  font-weight: bold;
  color: ${(props) => props.theme.green};
  &:hover {
    color: ${(props) => props.theme.lightGreen};
  }
`;

const Authenticate = (props) => {
  const { setError } = props;

  const currentPath = useLocation().pathname;

  const loggingIn = useState(currentPath === ROUTES.SIGN_IN)[0];
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordVerifyInput, setPasswordVerifyInput] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = useContext(AuthContext);

  const toggleAuthenticateMode = (event) => {
    event.preventDefault();
    props.history.push(loggingIn ? ROUTES.CREATE_ACCOUNT : ROUTES.SIGN_IN);
  };

  const promptText = loggingIn ? (
    <PromptText>
      New User?{" "}
      <LinkButton onClick={toggleAuthenticateMode}>Sign up.</LinkButton>
    </PromptText>
  ) : (
    <PromptText>
      Already have an account?{" "}
      <LinkButton onClick={toggleAuthenticateMode}>Login</LinkButton>
    </PromptText>
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (!loggingIn) {
      if (passwordInput !== passwordVerifyInput) {
        setError({ message: "Password inputs do not match." });
        setLoading(false);
        return;
      }
    }
    const authMethod = loggingIn
      ? doSignInWithEmailAndPassword
      : doCreateUserWithEmailAndPassword;
    authMethod(emailInput, passwordInput)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  const AuthForm = (
    <AuthenticateFormContainer className="offset-1 offset-md-4 col-10 col-md-4">
      <AuthenticateForm onSubmit={handleSubmit}>
        <AuthenticateFormHeader>
          {loggingIn ? "Login" : "Sign Up"}
        </AuthenticateFormHeader>
        <div style={{ margin: "auto" }}>
          <FormInput
            label="Email"
            type="text"
            value={emailInput}
            change={(event) => setEmailInput(event.target.value)}
          />
          <FormInput
            label="Password"
            type="password"
            value={passwordInput}
            change={(event) => setPasswordInput(event.target.value)}
          />
          {!loggingIn && (
            <FormInput
              label="Verify Password"
              type="password"
              value={passwordVerifyInput}
              change={(event) => setPasswordVerifyInput(event.target.value)}
            />
          )}
          <FormSubmit val={loggingIn ? "Login" : "Sign Up"} />
        </div>
        {promptText}
      </AuthenticateForm>
    </AuthenticateFormContainer>
  );

  return (
    <>
      {loading ? <Spinner /> : auth ? <Redirect to={ROUTES.HOME} /> : AuthForm}
    </>
  );
};

export default compose(withErrorModal)(Authenticate);
