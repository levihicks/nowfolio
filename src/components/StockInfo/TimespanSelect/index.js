import React, {useState} from 'react';
import DropdownIcon from '../../../assets/dropdown.svg';
import styled from 'styled-components';

const StyledTimespanSelect = styled.div
`
    border: 1px solid ${props => props.theme.gray};
    right: 0;
    position: absolute;
    background: ${props => props.theme.white};
    min-width: 120px;
    z-index: 2;
`;

const StyledTimespanSelectButton = styled.button
`
    border: none;
    font-weight: bold;
    &:focus {
        outline: none;
    }
    img {
        height: 10px;
    }
`;

const TimespanOptions = styled.div
`
    padding: 10px;
    display: flex;
    flex-direction: column;
`;

const TimespanOptionEl = styled.button
`
    border: none;
    margin: auto;
    margin-top: 5px;
    font-size: 1rem;
    width: 100%;
    &:hover{
        color: ${props => props.theme.green};
    }
    &:focus{
        outline: none;
    }
`;

const TimespanSelect = props => {

    const [timespan, setTimespan] = useState("Past Week");
    const [optionsDisplayed, setOptionsDisplayed] = useState(false);

    return (
        <StyledTimespanSelect>
            <StyledTimespanSelectButton 
                onClick={()=>setOptionsDisplayed(!optionsDisplayed)}>
                {timespan} 
                <img 
                    src={DropdownIcon} 
                    style={{transform: optionsDisplayed ? "rotate(180deg)" : "none",
                        marginLeft: "10px"}} 
                    alt="" />
            </StyledTimespanSelectButton>
            { optionsDisplayed && (
                <TimespanOptions>
                    <TimespanOptionEl>
                        Past Month
                    </TimespanOptionEl>
                    <TimespanOptionEl>
                        Past Year
                    </TimespanOptionEl>
                </TimespanOptions>
            )}
        </StyledTimespanSelect>
    )
}

export default TimespanSelect;
