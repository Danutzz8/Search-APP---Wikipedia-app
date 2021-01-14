import {clearSearchText,clearPushListener, setSearchFocus, showClearTextButton} from './searchBar.js';
import {getSearchTerm, retrieveSearchResults} from './dataFunctions.js';
import {deleteSearchResults, clearStatsLine, buildSearchResults, setStatsLine} from './searchResults.js'


document.addEventListener('readystatechange', (event) => {
    if(event.target.readyState === 'complete') {
        initApp();
    }
});

const initApp = () => {
    // set the focus
    setSearchFocus();

    //TODO: 3 listeners clear text
    const search = document.getElementById('search');
    search.addEventListener('input', showClearTextButton)

    const clear = document.getElementById('clear');
    clear.addEventListener('click', clearSearchText);
    clear.addEventListener('keydown', clearPushListener);

    const form = document.getElementById('searchBar');
    form.addEventListener('submit', submitTheSearch);
}

// Procedural 'workflow' function
const submitTheSearch = (event) => {
    event.preventDefault();
    //delete search results
    deleteSearchResults();
    // process the search
    processTheSearch();
    // set the focus
    setSearchFocus();
};

//Procedural
const processTheSearch = async () => {
    // TODO: clear the stats line
    clearStatsLine();
    const searchTerm = getSearchTerm();
    if (searchTerm === '') return;
    const resultArray = await retrieveSearchResults(searchTerm);
    if (resultArray.length) buildSearchResults(resultArray)
    // FIXME: set satats line
    setStatsLine(resultArray.length);
}