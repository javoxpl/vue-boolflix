<template>
    <div class="card bg-dark text-white h-100">
        <img :src="`https://image.tmdb.org/t/p/w342${imagePath}`" class="card-img" :alt="title" @error="onImgError">
        <div class="card-img-overlay p-0 h-100">
            <ul class="list-group list-group-flush overflow-auto h-100">
                <li class="list-group-item">
                    <small>Titolo</small>
                    <h5>{{title}}</h5>
                </li>
                <li class="list-group-item">
                    <small>Titolo Originale</small>
                    <h5>{{originalTitle}}</h5>
                </li>
                <li class="list-group-item">
                    <small>Lingua Originale</small>
                    <div>
                        <lang-flag :iso="langFlagSrc"/>
                    </div>
                </li>
                <li class="list-group-item">
                    <small>Attori</small>
                    <div>
                        <span v-for="(actor, i) in actors" :key="actor.id">{{actor.name + (i < 4 ? ', ' : '') }}</span>
                    </div>
                </li>
                <li class="list-group-item">
                    <small>Voto</small>
                    <div>
                        <span>{{returnStars(voteAverage)}} </span>
                        <span class="solid-icon" v-for="num in Math.floor(returnStars(voteAverage))" :key="'solid'+num"><font-awesome-icon :icon="['fa-solid', 'fa-star']" /></span>
                        <span class="solid-icon" v-if="(returnStars(voteAverage) - Math.floor(returnStars(voteAverage))) > 0.05"><font-awesome-icon :icon="['fa-solid', 'fa-star-half-stroke']" /></span>
                        <span class="regular-icon" v-else-if="(returnStars(voteAverage) - Math.floor(returnStars(voteAverage))) !== 0"><font-awesome-icon :icon="['fa-regular', 'fa-star']" /></span>
                        <span class="regular-icon" v-for="num in 5 - Math.ceil(returnStars(voteAverage))" :key="'regular'+num"><font-awesome-icon :icon="['fa-regular', 'fa-star']" /></span>
                    </div>
                </li>
                <li class="list-group-item">
                    <small>Overview</small>
                    <p>{{overview}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios';
import LangFlag from 'vue-lang-code-flags';

export default {

    name: 'CardRender',
    data(){
        return {
            actors: []
        }
    },
    props: {
        title: String,
        originalTitle: String,
        langFlagSrc: String,
        voteAverage: Number,
        imagePath: String,
        overview: String,
        filmId: Number
    },
    components: {FontAwesomeIcon, LangFlag},
    methods: {
        returnStars(vote){
            return (vote / 2).toFixed(1)
        },

        onImgError(event){
            event.target.src = 'not-found.png'
        }

        // getActors(){
        //     axios.get('https://api.themoviedb.org/3/movie/227975/credits?api_key=a3a172e52b1371fe2bd130acb05b1f4b')
        //     .then((resp) => {
        //         console.log(resp.data.cast)
        //         this.actors = resp.data.cast.slice(0, 5)
        //     })
        // }

        
    },

    mounted(){
        axios.get(`https://api.themoviedb.org/3/movie/${this.filmId}/credits?api_key=a3a172e52b1371fe2bd130acb05b1f4b`)
            .then((resp) => {
                console.log(resp.data.cast)
                this.actors = resp.data.cast.slice(0, 5)
            })
    }
}

</script>

<style lang="scss" scoped>
li {
    img {
        display: block;
    }

    .regular-icon {
        color: rgb(224, 224, 42);
    }

    .solid-icon {
        color: rgba(232, 232, 20, 0.947);
    }
}

.card-img-overlay {
    opacity: 0;
    background-color: black;
    color: white;
    transition: opacity 500ms;
}

.list-group-item {
    background-color: black;
    color: white;
    padding: 0.2rem 1rem;

    h5 {
        margin: 0;
    }

    small {
        color: gray;
    }
}

.card:hover {
    .card-img-overlay {
    opacity: .95;
}
}
</style>