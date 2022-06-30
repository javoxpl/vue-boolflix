import Vue from "vue";
import axios from "axios";

export const store = Vue.observable({
    moviesList: [],
    tvSeriesList: [],
    genresMovies: [],
    genresTv: [],
    filterMovies: [],
    filterSeries: []
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
            store.filterMovies = resp.data.results
        } else if (type === 'tv'){
            store.tvSeriesList = resp.data.results
            store.filterSeries = resp.data.results
        }
    })
}

export function filterMovies(filterArray){
    if (filterArray.length === 0){
        store.filterMovies = store.moviesList
        return
    }
    
    const tempArray = []
    const alreadyExistingFilms = []
    store.moviesList.forEach(movie => {
        movie.genre_ids.forEach(genId => {
            filterArray.forEach(gen => {
                    if (genId === gen && !alreadyExistingFilms.includes(movie.id))
                    {
                    alreadyExistingFilms.push(movie.id)
                    tempArray.push(movie)
                }
            })
        })
    })
    store.filterMovies = tempArray
}

export function filterSeries(filterArray){
    if (filterArray.length === 0){
        store.filterSeries = store.tvSeriesList
        return
    }
    const tempArray = []
    const alreadyExistingFilms = []
    store.tvSeriesList.forEach(movie => {
        movie.genre_ids.forEach(genId => {
            filterArray.forEach(gen => {
                    if (genId === gen && !alreadyExistingFilms.includes(movie.id))
                    { console.log('ciao');
                    alreadyExistingFilms.push(movie.id)
                    tempArray.push(movie)
                }
            })
        })
    })
    store.filterSeries = tempArray
}


axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=a3a172e52b1371fe2bd130acb05b1f4b`)
.then((resp) => {
    store.genresMovies = resp.data.genres
})


axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=a3a172e52b1371fe2bd130acb05b1f4b`)
    .then((resp) => 
    {store.genresTv = resp.data.genres
    })