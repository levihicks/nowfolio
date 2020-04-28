import React, { useState, useEffect, useContext } from 'react';
import Searchbar from './Searchbar';
import SearchResults from './SearchResults';
import styled from 'styled-components';
import withErrorModal from '../../hoc/withErrorModal';
import { compose } from 'recompose';
import { CoinsContext } from '../../contexts/CoinsContext';

const SearchPage = styled.div
`
    margin-top: 30px;
`

const Search = props => {

    const coinsContext = useContext(CoinsContext);
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const fetchResults = () => {
        if(searchInput !== "")
            setSearchResults(coinsContext.filter(c => 
                c.tag.toLowerCase().includes(searchInput.toLowerCase()) 
                || c.name.toLowerCase().includes(searchInput.toLowerCase())
            ));
    };

    useEffect(fetchResults, [searchInput])

    const changeHandler = (inputVal) => {
        if(inputVal==="")
            setSearchResults(null);
        setSearchInput(inputVal);
    }

    return (
        <SearchPage className="offset-2 col-8">
            {/* {error && <Modal hide={() => setError(null)}>{error.message}</Modal>} */}
            <Searchbar change={(inputVal) => changeHandler(inputVal)} value={searchInput}/>
            {searchResults && <SearchResults searchResults={searchResults} />}
        </SearchPage>
    )
};

export default compose(
    withErrorModal
)(Search);