<script>
import {defineComponent} from 'vue'
import ContentSidebars from "@/components/ContentSidebars.vue";
import ContentFormEdit from "@/components/ContentFormEdit.vue";

export default defineComponent({
    name: "Content",
    components: {ContentFormEdit, ContentSidebars},
    data() {
        return {
            categories: [],
            selectedItem: null,
        }
    },
    methods:{
        onEdit(item){
            this.selectedItem = item;
        }
    },
    created() {
        setTimeout(() => {
            this.categories = [
                {
                    id: 1,
                    name: "Здания",
                    items: [
                        {
                            id: 1,
                            name: "Маленький домик"
                        },
                        {
                            id: 2,
                            name: "Маленький домик1"
                        },
                    ]
                },
                {
                    id: 2,
                    name: "Здания2",
                    items: [
                        {
                            id: 3,
                            name: "Маленький домик5"
                        },
                        {
                            id: 4,
                            name: "Маленький домик6"
                        },
                    ]
                },
            ];
        }, 100)
    }
})
</script>

<template>
    <section>
        <ContentSidebars :categories="categories" @onEdit="onEdit"/>
        <div class="block-content">
            <div v-if="selectedItem != null">
                <ContentFormEdit :selectItem="selectedItem"/>
            </div>
        </div>
    </section>
</template>

<style scoped>
section{
    display: grid;
    grid-template-columns: .4fr 1fr;

    .block-content{
        padding: 20px;
        height: 100%;
        overflow: hidden;
        > div{
            width: 100%;
            height: 100%;
            overflow: auto;
        }
    }
}
</style>