import axios from 'axios';


export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults(){
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key='7329ad6417659b5fb5930a7e3d1e37ed';
        try {
            console.log(this.query);
            const res = await axios(`${proxy}http://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
        }
        catch (error) {
            alert(error);
        }
    
    }
};










