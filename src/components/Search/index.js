import React, { useState, useRef, useEffect, useCallback } from 'react';
import { alphavantageAxios } from '../../axios';
import Searchbar from './Searchbar';
import SearchResults from './SearchResults';
import Spinner from '../UI/Spinner';
import styled from 'styled-components';
import withErrorModal from '../../hoc/withErrorModal';
import { compose } from 'recompose';

const SearchPage = styled.div
`
    margin-top: 30px;
`

const Search = props => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const { setError } = props;

    let timer = useRef(null);

    const fetchSearch = useCallback((inputVal) => {
        alphavantageAxios.get('query?function=SYMBOL_SEARCH&keywords='+encodeURIComponent(inputVal))
            .then(res => setSearchResults(res.data.bestMatches))
            .catch(err => {setError(err)});
    }, [setError]);

    useEffect(() => {
        if (timer.current)
            clearTimeout(timer.current);
        if (searchInput !== "")
            timer.current = setTimeout(()=>fetchSearch(searchInput), 1000);
    }, [searchInput, fetchSearch])

    const changeHandler = (inputVal) => {
        if(searchResults)
            setSearchResults(null);
        if(inputVal !== searchInput)
            setSearchInput(inputVal);
    }

    return (
        <SearchPage className="offset-2 col-8">
            {/* {error && <Modal hide={() => setError(null)}>{error.message}</Modal>} */}
            <Searchbar change={(inputVal) => changeHandler(inputVal)} value={searchInput}/>
            {!searchResults && searchInput !== "" && <Spinner />}
            {searchResults && <SearchResults searchResults={searchResults} />}
        </SearchPage>
    )
};

export default compose(
    withErrorModal
)(Search);