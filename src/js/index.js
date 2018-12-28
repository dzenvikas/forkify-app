// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderSpinner, clearSpinner} from './views/base';

/** Global app state
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes object
 */
const state = {};

const controlSearch = async () => {
    // 1. get query from view
    const query = searchView.getInput();
    // 2. If query, create new search object & add to app state
    if (query) {
        state.search = new Search(query);
        // prepare UI for results
        searchView.clearInput();
        
        // render results on UI
        searchView.clearResults();
        renderSpinner(elements.searchRes);
        
        // search for recipes
        await state.search.getResults();
        clearSpinner();
        searchView.renderResults(state.search.result);
        console.log(state);
        console.log(state.search.result);
    }

};

// Event listeners
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


// search.getResults();








