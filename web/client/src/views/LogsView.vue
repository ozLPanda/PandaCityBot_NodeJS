<template>
  <div class="container">
    <div class="table__block">
      <DataTable
        scrollable
        scroll-height="flex"
        :loading="loading"
        :value="items"
        :virtual-scroller-options="{ itemSize: 46 }"
        @page="onPage($event)"
      >
        <template #loading>
          <ProgressSpinner v-if="loading" />
        </template>

        <Column
          v-for="column in columns"
          :field="column.field"
          :key="column.field"
          :header="column.header"
          :header-style="`width: ${column.width}%`"
        >
          <template #body="{ data, field }">
            <div v-if="field === 'UserInfoLog.name'" @click="onLogin(data)" class="btn btn__link">
              {{ getFieldObjectFromString(field, data) }}
            </div>

            <div v-else>{{ getFieldObjectFromString(field, data) }}</div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { api } from '@/composables/api.js'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import ProgressSpinner from 'primevue/progressspinner'
import { getFieldObjectFromString } from '../../../utils/Helper.js'

let items = reactive([])

const columns = reactive([
  {
    field: 'id',
    header: '#',
    width: 5,
    render: null
  },
  {
    field: 'name',
    header: 'Название события',
    width: 60,
    render: null
  },
  {
    field: 'date_time',
    header: 'Когда произошло',
    width: 10,
    render: null
  },
  {
    field: 'UserInfoLog.name',
    header: 'Кто купил',
    width: 100,
    render: defineComponent({
      props: {
        data: {
          type: Object,
          default: () => {
            return {}
          }
        }
      },
      setup() {},
      template: `
    <div>{{ data.UserInfoLog.name }}</div>`
    })
  }
])

const loading = ref(true)

function onLoadData() {
  api
    .get('/owner.getLogs')
    .then((res) => {
      console.log(res)
      const data = res.data
      items = data.data
    })
    .finally((res) => {
      loading.value = false
    })
}

function onLogin(data) {}

onMounted(() => {
  onLoadData()
})
</script>

<style scoped>
.container {
  height: 80%;

  &:deep(.table__block) {
    height: 100%;
  }

  &:deep(.p-datatable-loading-overlay) {
    background-color: transparent;
  }

  & .user__link {
    color: red;
    cursor: pointer;
  }
}
</style>
