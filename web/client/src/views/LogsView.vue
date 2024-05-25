<script setup>
import UITable from '@/components/UI/UITable.vue'
import { onMounted, reactive, ref } from 'vue'
import { api } from '@/composables/api.js'

// const items = reactive([
//   {
//     id: 1,
//     test1: '12313',
//     test2: '11111'
//   },
//   {
//     id: 2,
//     test1: 'asd',
//     test2: 'qwerty'
//   }
// ])

let items = reactive([])

const columns = reactive([
  {
    field: 'id',
    header: '#'
  },
  {
    field: 'name',
    header: 'Название события'
  },
  {
    field: 'date_time',
    header: 'Когда произошло'
  },
  {
    field: 'UserInfoLog.name',
    header: 'Кто купил'
  }
])

let loading = ref(true)

function onLoadData() {
  api.get('/owner.getLogs').then(res => {
    console.log(res)
    const data = res.data
    items = data.data
  }).finally(res=>{
    loading.value = false
  })
}

onMounted(() => {
  onLoadData()
})
</script>

<template>
  <div class="container">
    <UITable :items="items" :columns="columns" :loading="loading" />
  </div>
</template>

<style scoped>
.container {
  height: 80%;

  &:deep(.table__block) {
    height: 100%;
  }
}
</style>
