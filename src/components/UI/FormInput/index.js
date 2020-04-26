import React from 'react';
import styled from 'styled-components';

const FormInputContainer = styled.div
`
    margin: 50px 0;
    padding: 0 20px;
    width: 100%;
`

const Label = styled.div
`
    color: ${props => props.theme.green};
`

const StyledFormInput = styled.input
`
    border: none;
    border-bottom: 2px solid ${props => props.theme.black};
    font-size: 1.25rem;
    width: 100%;
`

const FormInput = props => {
    return (
        <FormInputContainer>
            <Label>{props.label}</Label>
            <StyledFormInput 
                value={props.value}
                type={props.type} 
                onChange={props.change}/>
        </FormInputContainer>
    );
};

export default FormInput;