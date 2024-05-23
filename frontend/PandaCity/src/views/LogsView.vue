<script setup>
import UITable from "@/components/UI/UITable.vue"
import {reactive} from "vue";

const items = reactive([
  {
    id: 1,
    test1: '12313',
    test2: '11111'
  },
  {
    id: 2,
    test1: 'asd',
    test2: 'qwerty'
  },
])

const columns = reactive([
  {
    field: 'id',
    header: '#'
  },
  {
    field: 'test1',
    header: 'Test2'
  },
  {
    field: 'test2',
    header: 'Test2'
  }
])


</script>

<template>
  <div class="container">
    <UITable
      :items="items"
      :columns="columns"
    />
  </div>
</template>

<style scoped>

</style>