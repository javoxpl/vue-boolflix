<template>
<div class="container">
    <h2 v-if="returnMoviesList.length > 0" class="text-white mb-3">Film</h2>
    <div class="row row-cols-1 row-cols-md-3 g-5">
        <div class="col" v-for="movie in returnMoviesList" :key="'m' + movie.id">
            <CardRender 
            :title="movie.title"
            :original-title="movie.original_title"
            :langFlagSrc="movie.original_language"
            :vote-average="movie.vote_average"
            :image-path="movie.poster_path"
            :overview="movie.overview"
            :film-id="movie.id"
            :genre="movie.genre_ids"
            :is-movie="true"
            ></CardRender>
        </div>
    </div>
    <h2 v-if="returnTvSeriesList.length > 0" class="text-white my-4">Serie TV</h2>
    <div class="row row-cols-1 row-cols-md-3 g-3">
        <div class="col" v-for="serie in returnTvSeriesList" :key="'s' + serie.id">
            <CardRender 
            :title="serie.name"
            :original-title="serie.original_name"
            :langFlagSrc="serie.original_language"
            :vote-average="serie.vote_average"
            :image-path="serie.poster_path"
            :overview="serie.overview"
            :film-id="serie.id"
            :is-movie="false"
            :genre="serie.genre_ids"
            ></CardRender>
        </div>
    </div>
</div>
</template>

<script>
    import CardRender from './CardRender.vue';
    import {store} from '../store';
    

    export default {
    name: "TheMain",

    components: { CardRender },
    computed: {
        returnMoviesList() {
            return store.filterMovies;
        },
        returnTvSeriesList() {
            return store.filterSeries;
        }

    }
    
}

</script>

<style lang="scss" scoped>
    .col {
    min-height: 400px;
}
</style>