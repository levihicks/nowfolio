import React, { useState } from 'react';
import styled from 'styled-components';
import FormInput from '../UI/FormInput';
import FormSubmit from '../UI/FormSubmit';

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

    const toggleAuthenticateMode = (event) => {
        event.preventDefault();
        setLoggingIn(!loggingIn);
    }

    const promptText = loggingIn ? (
        <PromptText>New User? <LinkButton onClick={toggleAuthenticateMode}>Sign up.</LinkButton></PromptText>
    ) : (
        <PromptText>Already have an account? <LinkButton onClick={toggleAuthenticateMode}>Login</LinkButton></PromptText>
    );

    

    return (
        <React.Fragment>
            <AuthenticateForm className="offset-4 col-4 my-auto">
                <AuthenticateFormHeader>
                    { loggingIn ? "Login" : "Sign Up" }
                </AuthenticateFormHeader>
                <div style={{margin: "auto"}}>
                <FormInput label="Email" type="text" />
                <FormInput label="Password" type="password" />
                {
                    !loggingIn && 
                    <FormInput label="Verify Password" type="password" />
                }
                <FormSubmit 
                    val={ loggingIn ? "Login" : "Sign Up" } 
                    click={(event) => {event.preventDefault()}} />
                </div>
                {promptText}
            </AuthenticateForm>
        </React.Fragment>
    );
};

export default Authenticate;