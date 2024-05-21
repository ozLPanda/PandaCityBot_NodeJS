<script>
import {defineComponent} from 'vue'
import {itemBuildApiControl} from "@/classes/api.js";

export default defineComponent({
    name: "ContentFormEdit",
    props:{
        selectItem: {
            type: Object,
            default: null,
        }
    },
    data(){
        return{
            formControls:[
                {
                    title: "Название",
                    type: "text",
                    placeholder: "Название",
                },
                {
                    title: "С какого уровня доступно",
                    type: "number",
                    placeholder: "С какого уровня доступно",
                },
                {
                    title: "Цена",
                    type: "number",
                    placeholder: "Цена",
                },
                {
                    title: "Сколько даёт престижа (рейтинга)",
                    type: "number",
                    placeholder: "Сколько даёт престижа (рейтинга)",
                },
                {
                    title: "Описание",
                    type: "text",
                    placeholder: "Описание",
                },
                {
                    title: "Команда",
                    type: "text",
                    placeholder: "Комадна",
                },
                {
                    title: "Название для доступа из кода",
                    type: "text",
                    placeholder: "Название для доступа из кода",
                },
                {
                    title: "Коэффициент налогов",
                    type: "number",
                    placeholder: "Коэффициент налогов",
                },
                {
                    title: "Сколько опыта приносит за покупку",
                    type: "number",
                    placeholder: "Сколько опыта приносит за покупку",
                },
            ]
        }
    },
    methods:{
        loadData(){
            itemBuildApiControl.getBuild(this.selectItem.id).then(res=>{
                console.log(res);
            })
        }
    },
    mounted() {
        if(this.selectItem != null){
            this.loadData();
        }
    }
})
</script>

<template>
    <form>
        <div class="mb-3 px-1" v-for="(control, index) in formControls">
            <label for="exampleFormControlInput1" class="form-label">{{ control.title }}</label>
            <input :type="control.type" class="form-control" :id="'exampleFormControlInput1'+index" :placeholder="control.placeholder">
        </div>
    </form>
</template>

<style scoped>
    form{
        max-width: 500px;
    }
</style>