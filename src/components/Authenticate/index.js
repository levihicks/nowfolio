import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import FormInput from '../UI/FormInput';
import FormSubmit from '../UI/FormSubmit';
import { AuthContext } from '../../session';
import Spinner from '../UI/Spinner';
import * as ROUTES from '../../constants/routes';
import { Redirect } from 'react-router-dom';
import { 
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword 
} from '../../firebase'; 

const AuthenticateForm = styled.form
`
    border: 1px solid ${props => props.theme.lightGreen};
    border-radius: 30px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
`;

const AuthenticateFormHeader = styled.div
`
    font-size: 2rem;
    font-weight: bold;
    background: ${props => props.theme.white};
    padding: 10px;
    position: absolute;
    transform: translateY(-50%);
    top:0;
    left: 10%;
    display: inline-block;
    width: auto;
`;

const PromptText = styled.p
`
    margin: 0;
    border-top: 1px solid ${props => props.theme.lightGreen};
    text-align: center;
    width: 100%;
    padding: 20px 0;
    color: ${props => props.theme.gray};
`

const LinkButton = styled.button
`
    background: none;
    border: none;
    font-weight: bold;
    color: ${props => props.theme.green};
    &:hover {
        color: ${props => props.theme.lightGreen};
    }
`;

const Authenticate = props => {

    const [loggingIn, setLoggingIn] = useState(true);
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext);

    const toggleAuthenticateMode = (event) => {
        event.preventDefault();
        setLoggingIn(!loggingIn);
    }

    const promptText = loggingIn ? (
        <PromptText>New User? <LinkButton onClick={toggleAuthenticateMode}>Sign up.</LinkButton></PromptText>
    ) : (
        <PromptText>Already have an account? <LinkButton onClick={toggleAuthenticateMode}>Login</LinkButton></PromptText>
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const authMethod = loggingIn ? 
            doSignInWithEmailAndPassword :
            doCreateUserWithEmailAndPassword;
        authMethod(emailInput, passwordInput)
            .then(() => {
                setLoading(false);
            })
            .catch(err => console.log(err));
    }

    const AuthForm = (
        <AuthenticateForm onSubmit={handleSubmit} className="offset-4 col-4 my-auto">
                <AuthenticateFormHeader>
                    { loggingIn ? "Login" : "Sign Up" }
                </AuthenticateFormHeader>
                <div style={{margin: "auto"}}>
                <FormInput 
                    label="Email" 
                    type="text"
                    value={emailInput}
                    change={(event) => setEmailInput(event.target.value)} />
                <FormInput 
                    label="Password" 
                    type="password"
                    value={passwordInput}
                    change={(event) => setPasswordInput(event.target.value)} />
                {
                    !loggingIn && 
                    <FormInput label="Verify Password" type="password" />
                }
                <FormSubmit 
                    val={ loggingIn ? "Login" : "Sign Up" }  />
                </div>
                {promptText}
        </AuthenticateForm>
    )

    return (
        <React.Fragment>
          {loading ? <Spinner /> : auth ? <Redirect to={ROUTES.HOME} /> : AuthForm}  
        </React.Fragment>
    );
};

export default Authenticate;