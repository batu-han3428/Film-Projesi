//search modülü

import { api_key, base_url } from "../config";
import { paginationElements } from "../base";

var ileriGeri = 1;

export default class Search{ //export arkaplanda iife kullanır. sadece syntax farklı. export default function(){}işlevin adı olmadığında kullanılabilir. Bir dosyada yalnızca bir varsayılan dışa aktarma olabilir. Alternatif, adlandırılmış bir dışa aktarmadır.
    
    constructor(keyword,pagination){
        this.keyword = keyword;
        this.pagination = pagination;
    }

    async getResults(){

        if(this.pagination == '«'){
            if(ileriGeri == 1){              
                return false;
            }else{
                this.pagination = --ileriGeri;
            }
        }else if(this.pagination == '»'){
            if(paginationElements.totalSayfa == paginationElements.searchOncekiSayfa){                
                return false;
            }else{     
                this.pagination = ++ileriGeri;           
            }
        }else{
            ileriGeri = this.pagination;
        }
        
        
        
        const response = await fetch(`${base_url}/search/movie?api_key=${api_key}&page=${this.pagination}&query=${this.keyword}`);//await yani then demiş olduk
        this.veriler = await response.json();//search classından türetildiğinde o türetilen objenin içinde veriler adlı bir eleman olacak. onun içinde de api den çektiğimiz veriler olacak
        paginationElements.totalSayfa = this.veriler.total_pages;
        paginationElements.searchOncekiSayfa = this.veriler.page;
        return true;
    }
    
}