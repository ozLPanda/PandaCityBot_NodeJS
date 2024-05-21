<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "ContentSidebars",
    props: {
        categories:{
            type: Array,
            default: {}
        }
    },
    data(){
        return{
            // categories: [
            //     {
            //         id: 1,
            //         name: "Здания",
            //         items: [
            //             {
            //                 id: 1,
            //                 name: "Маленький домик"
            //             }
            //         ]
            //     }
            // ]
        }
    },
    methods:{
        onEdit(item){
            this.$emit("onEdit", item);
        }
    }
})
</script>

<template>
    <div class="flex-shrink-0 p-3" style="width: 280px;">
        <ul class="list-unstyled ps-0">
            <li v-for="(category, index) in categories" class="mb-1">
                <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" :data-bs-target="'#btn-collapse'+index" aria-expanded="false">
                    {{ category.name }}
                </button>
                <div class="collapse ml-5" :id="'btn-collapse'+index" style="">
                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                        <li v-for="subItem in category.items" @click="onEdit(subItem)"><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">{{ subItem.name }}</a></li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.btn-toggle::before {
    width: 1.25em;
    line-height: 0;
    content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
    transition: transform .35s ease;
    transform-origin: .5em 50%;
}

.btn-toggle[aria-expanded="true"]::before {
    transform: rotate(90deg);
}

.btn-toggle-nav a {
    padding: .1875rem .5rem;
    margin-top: .125rem;
    margin-left: 1.25rem;
}
</style>