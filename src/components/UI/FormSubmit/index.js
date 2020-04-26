import React from 'react';
import styled from 'styled-components';

const StyledFormSubmit = styled.input
`
    background: ${props => props.theme.green};
    box-shadow: ${props => props.theme.gray} 0px 3px 6px;
    border-radius: 20px;
    border: none;
    padding: 5px 20px;
    color: ${props => props.theme.white};
    font-weight: bold;
    position: relative;
    margin: 0 20px;
    margin-bottom: 10px;
    &:active{
        box-shadow: ${props => props.theme.gray} 0px 3px 2px;
        background: ${props => props.theme.lightGreen};
    }
`;

const FormSubmit = props => {
    return (
        <StyledFormSubmit 
            onClick={props.click} 
            type="submit"
            value={props.val} />
    )
};

export default FormSubmit;