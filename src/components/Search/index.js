import React, { useState, useRef, useEffect } from 'react';
import { alphavantageAxios } from '../../axios';
import Searchbar from './Searchbar';
import SearchResults from './SearchResults';
import Spinner from '../UI/Spinner';
import styled from 'styled-components';

const SearchPage = styled.div
`
    margin-top: 30px;
`

const Search = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState(null);

    let timer = useRef(null);

    const fetchSearch = (inputVal) => {
        alphavantageAxios.get('query?function=SYMBOL_SEARCH&keywords='+inputVal)
            .then(res => setSearchResults(res.data.bestMatches))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if (timer.current)
            clearTimeout(timer.current);
        if (searchInput !== "")
            timer.current = setTimeout(()=>fetchSearch(searchInput), 1000);
    }, [searchInput])

    const changeHandler = (inputVal) => {
        if(searchResults)
            setSearchResults(null);
        if(inputVal !== searchInput)
            setSearchInput(inputVal);
    }

    return (
        <SearchPage className="offset-2 col-8">
            <Searchbar change={(inputVal) => changeHandler(inputVal)} value={searchInput}/>
            {!searchResults && searchInput !== "" && <Spinner />}
            {searchResults && <SearchResults searchResults={searchResults} />}
        </SearchPage>
    )
};

export default Search;