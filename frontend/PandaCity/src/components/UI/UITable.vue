<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional

const props = defineProps({
  items: Array,
  columns: Array
})

</script>

<template>
  <div class="table__block">
    <DataTable
      :value="items"
      tableStyle="min-width: 50rem"
      paginator
      :rows="20"
      :rowsPerPageOptions="[20, 50, 100, 200, 500, 1000]"
    >
      <template #header>
        <slot name="header"></slot>
      </template>
      <Column
        v-for="column in columns"
        :field="column.field"
        :key="column.field"
        :header="column.header"></Column>
    </DataTable>
  </div>
</template>

<style scoped>

</style>