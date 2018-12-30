import axios from 'axios';
import {key, proxy} from '../config';

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`${proxy}http://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.image = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            console.log(error);
        }
    }
    calcTime() {
        // assuming that we need 15 mins for each 3 ingredients.
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }
    calcServings() {
        this.servings = 4;
    }
    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(el => {
            // uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // remove paranthesis.
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // parse ingredients into count, unit, and ingredient.
            const ingredientArray = ingredient.split(' ');
            const unitIndex = ingredientArray.findIndex(el2 => unitsShort.includes(el2));

            let objIng;
            if (unitIndex > -1) {
                // there is a unit
                const countArr = ingredientArray.slice(0, unitIndex);

                let count;
                if (countArr.length === 1) {
                    count = Math.round(eval(ingredientArray[0].replace('-', '+')) * 10)/10;
                    
                } else {
                    count = Math.round(eval(ingredientArray.slice(0, unitIndex).join('+')) * 10)/10;
                }
                objIng = {
                    count,
                    unit: ingredientArray[unitIndex],
                    ingredient: ingredientArray.slice(unitIndex + 1).join(' ')
                }

            } else if (parseInt(ingredientArray[0], 10)) {
                objIng = {
                    count: parseInt(ingredientArray[0], 10),
                    unit: '',
                    ingredient: ingredientArray.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // there is NO unit and NO number in 1st position.
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient  //ES6: ingredient: ingredient === ingredient
                }
            }

            return objIng;
        });
        this.ingredients = newIngredients;
    }
}
