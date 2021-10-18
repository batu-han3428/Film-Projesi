import { api_key, base_url } from "../config";

//seçilen filmin detaylarını gösterecek olan model

export class Movie{
    constructor(id){
        this.id = id;
    }

    async getMovie(){
        const response = await fetch(`${base_url}/movie/${this.id}?api_key=${api_key}`);
        this.veriler = await response.json();
    }
}