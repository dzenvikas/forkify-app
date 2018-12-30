

export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    searchResultList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchResPagination: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe')
};

export const elementStrings = {
    spinner: "loader"
};

export const renderSpinner = (parent) => {
    const spinner = /*html*/`
        <div class="${elementStrings.spinner}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', spinner);
};

export const clearSpinner = () => {
    const spinner = document.querySelector(`.${elementStrings.spinner}`);
    if (spinner) {
        spinner.parentElement.removeChild(spinner);
    }
}