import React from 'react';
import styled from 'styled-components';

const SearchResultsBase = styled.div
`
    margin: 30px 0;
    display: flex;
    width: 100%;
    font-size: 1.25rem;
`;

const StyledSearchResult = styled(SearchResultsBase)
`
    justify-content: space-between;
    align-items: center;
`;

const NameAndSymbol = styled.div
`
    color: ${props => props.theme.black};
    display: inline-block;
`;

const ViewButton = styled.button
`
    background: none;
    border-radius: 20px;
    padding: 0px 10px;
    border: 3px solid ${props => props.theme.green};
    color: ${props => props.theme.green};
    font-weight: bold;
    outline: none;
    &:hover {
        background: ${props => props.theme.green};
        color: ${props => props.theme.white}; 
    }
`;

const NoResults = styled(SearchResultsBase)
`
    justify-content: center;
`;

const SearchResult = ({ sym, name }) => (
    <StyledSearchResult>
        <NameAndSymbol>
            {sym} - {name}
        </NameAndSymbol>
        <ViewButton>
            View
        </ViewButton>
    </StyledSearchResult>
)

const SearchResults = ({ searchResults }) => {

    const resultsDisplay = searchResults.length > 0 ? 
        searchResults.map(r => 
        <SearchResult 
            key={Math.random().toString()}
            sym={r["1. symbol"]}
            name={r["2. name"]}/>    
        ) 
        : <NoResults>No results.</NoResults>;
    return (
        <React.Fragment>
            {resultsDisplay}
        </React.Fragment>
    );
};

export default SearchResults;