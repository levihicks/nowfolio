import React, { useRef } from 'react';
import styled from 'styled-components';
import SearchbarSearchIcon from '../../../assets/searchbox_search.svg';
import ClearIcon from '../../../assets/clear.svg';

const StyledSearchbar = styled.div
`
    display: flex;
    align-items: center;
    border-bottom: 3px solid ${props => props.theme.black};
`;

const StyledSearchIcon = styled.img
`
    margin-right: 10px;
    height: 25px;
`;

const StyledSearchInput = styled.input
`
    border: none;
    outline: none;
    font-size: 1.5rem;
    flex-grow: 1;
    &::placeholder {
        color: ${props => props.theme.gray};
    }
`;

const ClearButton = styled.img
`
    cursor: pointer;
    height: 25px;
    &:hover {
        opacity: ${props => props.theme.buttonHoverOpacity};
    }
`;



const Searchbar = props => {

    const searchInput = useRef(null);

    return (
        <StyledSearchbar>
            <StyledSearchIcon 
                src={SearchbarSearchIcon} />
            <StyledSearchInput 
                ref={searchInput}
                type="text"
                onChange={(event) => props.change(event.target.value)}
                placeholder="Search stocks..."
                value={props.value}
                />
            {
                props.value !== "" && 
                <ClearButton src={ClearIcon} 
                    onClick={() => {
                        props.change("");
                        searchInput.current.focus();
                    }} />
            }
        </StyledSearchbar>
    );
};

export default Searchbar;