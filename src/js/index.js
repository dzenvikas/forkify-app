// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
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
        try {
            await state.search.getResults();
            clearSpinner();
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert(error);
            clearSpinner();
        }
        // console.log(state);
        // console.log(state.search.result);
    }

};

// Event listeners
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPagination.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    // console.log(btn);
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);  // accessing custom data-attribute value;
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);

    }
})


/**
 * RECIPE CONTROLLER
 */

const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {

        // prepare UI for changes
        recipeView.clearRecipe();
        renderSpinner(elements.recipe);
        
        // highlight selected recipe
        if (state.search) searchView.highlightSelected(id);

        // create new recipe object
        state.recipe = new Recipe(id);

        //TESTING
        window.r = state.recipe;
        // get recipe data
        try {
            await state.recipe.getRecipe();

            state.recipe.parseIngredients();
            
            // calculate servings and time
            state.recipe.calcServings();
            state.recipe.calcTime();

            // render recipe to UI
            clearSpinner();
            recipeView.renderRecipe(state.recipe);
        } catch (error) {
            alert(error);
        }
    }
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => {window.addEventListener(event, controlRecipe)});




