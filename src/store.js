import Vue from "vue";
import axios from "axios";

export const store = Vue.observable({
    moviesList: [],
    tvSeriesList: []
})

/**
 * 
 * @param {text from the input} text 
 * @param {"movie"/"tv"} type 
 */
export function searchData(text, type){
    if (text === ''){
        return
    }
    axios.get('https://api.themoviedb.org/3/search/' + type, {
        params: {
            api_key: 'a3a172e52b1371fe2bd130acb05b1f4b',
            query: text,
            language: 'it'
        }
    })
    .then((resp) => {
        if (type === "movie"){
            store.moviesList = resp.data.results
        } else if (type === 'tv'){
            store.tvSeriesList = resp.data.results
        }
        console.log(store.moviesList)
        console.log(store.tvSeriesList)
    })
}
