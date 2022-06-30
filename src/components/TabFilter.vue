<template>
    <div class="container">
        <div class="row justify-content-start g-1">
        <div v-for="genre in moviesAndtvGenresInPage" :key="genre.id" class="col flex-grow-0">
            <div  class="cat action">
            <label>
                <input @change="startFilterMovie" type="checkbox" :value="genre.id" v-model="filterArray"><span>{{genre.name}}</span>
            </label>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
    import {store} from '../store';
    import {filterMovies} from '../store'
    import {filterSeries} from '../store'

    export default {
        name: 'TabFilter',
        data(){
            return {
                filterArray: []
            }
        },

        computed: {
            actualFilterArray(){
                return store
            },

            moviesAndtvGenresInPage(){
                const listOfIds = [];
                const list = [];
                store.moviesList.forEach(film => {
                    film.genre_ids.forEach(genId => {
                        store.genresMovies.forEach(gen => {
                            if (!listOfIds.includes(gen.id)){

                                if (genId === gen.id){
                                listOfIds.push(gen.id)
                                list.push(gen)}
                            }
                        })
                    })
                });

                store.tvSeriesList.forEach(film => {
                    film.genre_ids.forEach(genId => {
                        store.genresTv.forEach(gen => {
                            if (!listOfIds.includes(gen.id)){

                                if (genId === gen.id){
                                listOfIds.push(gen.id)
                                list.push(gen)}
                            }
                        })
                    })
                });
                return list
            }
        },

        methods: {
            startFilterMovie(){
                filterMovies(this.filterArray)
                filterSeries(this.filterArray)
            }
        }
    }

</script>

<style lang="scss" scoped>

label {
    cursor: pointer;
}
.cat{
    background-color: #104068;
    border-radius: 4px;
    border: 1px solid #fff;
    overflow: hidden;
    
}

.cat label {
    float: left;
    line-height: 2.0em;
    height: 2.0em;
}

.cat label span {
    text-align: center;
    display: block;
    padding: 0 .8rem;
    white-space: nowrap;
}

.cat label input {
    position: absolute;
    display: none;
    color: #fff !important;
}

.cat label input + span{color: #fff;}



.cat input:checked + span {
    color: #ffffff;
    text-shadow: 0 0  6px rgba(0, 0, 0, 0.8);
}

input:checked + span{background-color: #F75A1B;}

</style>