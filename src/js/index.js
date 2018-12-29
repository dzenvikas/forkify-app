// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import {elements, renderSpinner, clearSpinner} from './views/base';
/** Global app state
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes object
 */
const state = {};
/**
 * SEARCH CONTROLLER
 */
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

elements.searchResPagination.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    console.log(btn);
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);  // accessing custom data-attribute value;
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);

    }
})


/**
 * RECIPE CONTROLLER
 */
const r = new Recipe(47746);
r.getRecipe();
console.log(r);






