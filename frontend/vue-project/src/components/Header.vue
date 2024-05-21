<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "Header",
    methods:{
        onHome(){
            this.$router.push({name: 'home'});
        },
        onEditContent(){
            this.$router.push({name: 'editContent'});
        },
        onLogs(){
            this.$router.push({name: 'logs'});
        },
        onAdminPanel(){
            this.$router.push({name: 'adminPanel'});
        }
    }
})
</script>

<template>
    <header class="p-3 mb-3 border-bottom">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><a @click="onHome()" href="#" class="nav-link px-2 link-body-emphasis">Главная</a></li>
                    <li><a @click="onEditContent()" href="#" class="nav-link px-2 link-body-emphasis">Управление контентом</a></li>
                    <li><a @click="onLogs()" href="#" class="nav-link px-2 link-body-emphasis">Логи</a></li>
                    <li><a @click="onAdminPanel()" href="#" class="nav-link px-2 link-body-emphasis">Админ панель</a></li>
                </ul>

                <div class="dropdown text-end">
                    <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle"
                             _mstalt="33306">
                    </a>
                    <ul class="dropdown-menu text-small">
                        <li><a class="dropdown-item" href="#">Настройки</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">Выйти</a></li>
                    </ul>
                </div>

            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
header{
    background-color: white;
    .link-active{
        color: #0f7bde !important;
    }
}
</style>