<template>
  <div class="container panel-wrapper">
    <section class="panel">
      <div class="panel__header">
        <div>
          <h2>Логи</h2>
          <p>История действий пользователей</p>
        </div>
      </div>
      <div class="table__block">
        <DataTable :loading="loading" :value="items" paginator :rows="10" class="datatable">
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
                {{ getSafeField(field, data) }}
              </div>

              <div v-else>{{ getSafeField(field, data) }}</div>
            </template>
          </Column>
        </DataTable>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { api } from '@/composables/api.js'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import ProgressSpinner from 'primevue/progressspinner'

const items = ref([])

const columns = reactive([
  {
    field: 'id',
    header: '#',
    width: 5,
    render: null
  },
  {
    field: 'name',
    header: 'Событие',
    width: 55,
    render: null
  },
  {
    field: 'date_time',
    header: 'Дата',
    width: 15,
    render: null
  },
  {
    field: 'UserInfoLog.name',
    header: 'Пользователь',
    width: 30,
    render: null
  }
])

const loading = ref(true)

function getSafeField(path, obj) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj) ?? ''
}

async function onLoadData() {
  loading.value = true
  try {
    const res = await api.get('owner.getLogs')
    items.value = res.data?.data ?? []
  } finally {
    loading.value = false
  }
}

function onLogin(data) {}

onMounted(() => {
  onLoadData()
})
</script>

<style scoped lang="scss">
.panel-wrapper {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 32px 0 64px;
  position: relative;
  min-height: 80vh;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 320px;
    height: 320px;
    border-radius: 999px;
    filter: blur(50px);
    opacity: 0.35;
    pointer-events: none;
    z-index: 0;
  }

  &::before {
    background: rgba(44, 191, 147, 0.35);
    top: -120px;
    right: 8%;
  }

  &::after {
    background: rgba(242, 185, 92, 0.35);
    bottom: -120px;
    left: 6%;
  }
}

.panel {
  background: linear-gradient(180deg, #ffffff 0%, #f8f6f1 100%);
  border-radius: 16px;
  padding: 20px 22px;
  border: 1px solid var(--stroke-0);
  box-shadow: var(--shadow-0);
  position: relative;
  overflow: hidden;
  z-index: 1;
  animation: panelIn 0.45s ease both;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(500px 220px at 20% -20%, rgba(27, 127, 121, 0.08), transparent 70%);
    pointer-events: none;
  }
}

.panel__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;

  h2 {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: 0.2px;
  }

  p {
    margin: 4px 0 0;
    color: var(--ink-2);
    max-width: 540px;
  }
}

.table__block {
  margin-top: 18px;
  height: 100%;
  overflow: hidden;
}

:deep(.p-datatable-loading-overlay) {
  background-color: transparent;
}

.datatable {
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background: #f5f3ee;
  color: var(--ink-1);
  font-weight: 600;
  border-color: rgba(15, 29, 45, 0.08);
}

:deep(.p-datatable .p-datatable-tbody > tr) {
  transition: background 0.2s ease, transform 0.2s ease;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background: rgba(27, 127, 121, 0.06);
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  border-color: rgba(15, 29, 45, 0.08);
}

@keyframes panelIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 720px) {
  .panel {
    padding: 18px 16px;
  }

  .panel__header {
    align-items: flex-start;
  }
}
</style>
