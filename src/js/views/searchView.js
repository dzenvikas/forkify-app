import {elements} from './base';


export const getInput = () => elements.searchInput.value;

export const clearInput = () => elements.searchInput.value = '';

export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchResPagination.innerHTML = '';
};

// example: 'My target is to master JavaScript'.
const limitRecipeTitile = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;    //updates accumulator
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup =`
        <li>
            <a class="results__link results__link--active" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitile(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

const createPagination = (curPage, type) => /*html*/`
<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? curPage -1 : curPage + 1}>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left': 'right'}"></use>
    </svg>
    <span>Page ${type === 'prev' ? curPage - 1 : curPage + 1}</span>
</button>
`;

const renderPagination = (page, results, resPerPage) => {
    const pages = Math.ceil(results / resPerPage);
    let button;
    if (page === 1) {
        // pagination to go to next pages
        button = createPagination(page, 'next');
    } else if (page < pages ) {
        // pagination to go to next & previous page
        button = `
            ${createPagination(page, 'prev')}
            ${createPagination(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // pagination to go to previous pages
        button = createPagination(page, 'prev');
    }
    // console.log(button);
    elements.searchResPagination.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page=1, resPerPage=10) => {
    const start = (page - 1) * resPerPage;
    const end = start + resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);
    renderPagination(page, recipes.length, resPerPage);
};







