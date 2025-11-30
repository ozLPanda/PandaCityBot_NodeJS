<template>
  <div class="container panel-wrapper">
    <Toast />

    <section class="panel">
      <div class="panel__header">
        <div>
          <h2>Постройки бота</h2>
          <p>Базовый CRUD для управления сущностями</p>
        </div>
        <div class="panel__actions">
          <Button icon="pi pi-plus" label="Добавить постройку" @click="openCreateBuild" />
          <Button
            icon="pi pi-bookmark"
            label="Добавить категорию"
            severity="secondary"
            outlined
            @click="openCreateCategory"
          />
        </div>
      </div>

      <div class="table__toolbar">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText v-model="buildFilters.global.value" placeholder="Поиск" />
        </span>
      </div>

      <DataTable
        :value="builds"
        dataKey="id"
        :loading="buildsLoading"
        :filters="buildFilters"
        filterDisplay="menu"
        paginator
        :rows="10"
        :globalFilterFields="['name', 'cmd', 'object_name', 'categoryName', 'desc']"
        responsiveLayout="scroll"
        :sortMode="'multiple'"
        class="datatable"
      >
        <Column field="id" header="ID" sortable style="width: 80px" />
        <Column field="name" header="Название" sortable filter filterPlaceholder="Введите название" />
        <Column
          field="categoryName"
          header="Категория"
          sortable
          filter
          :showFilterMatchModes="false"
        >
          <template #filter="{ filterModel }">
            <Dropdown
              v-model="filterModel.value"
              :options="categoryFilterOptions"
              placeholder="Категория"
              showClear
            />
          </template>
        </Column>
        <Column field="lvl" header="Уровень" sortable />
        <Column field="price" header="Цена" sortable />
        <Column field="prestige_lvl" header="Престиж" sortable />
        <Column field="payday_coef" header="Коэф. зарплаты" sortable />
        <Column field="exp" header="Опыт" sortable />
        <Column field="cmd" header="Команда" sortable />
        <Column field="object_name" header="Объект" sortable />
        <Column header="Действия" :exportable="false" style="width: 180px">
          <template #body="{ data }">
            <div class="actions">
              <Button
                icon="pi pi-pencil"
                rounded
                outlined
                severity="secondary"
                aria-label="Редактировать"
                @click="openEditBuild(data)"
              />
              <Button
                icon="pi pi-trash"
                rounded
                outlined
                severity="danger"
                aria-label="Удалить"
                @click="removeBuild(data.id)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </section>

    <section class="panel">
      <div class="panel__header">
        <div>
          <h3>Категории построек</h3>
          <p>Используются при создании построек</p>
        </div>
        <Button icon="pi pi-plus" label="Создать категорию" outlined @click="openCreateCategory" />
      </div>

      <div class="table__toolbar">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText v-model="categoryFilters.global.value" placeholder="Поиск" />
        </span>
      </div>

      <DataTable
        :value="categories"
        dataKey="id"
        :loading="categoriesLoading"
        :filters="categoryFilters"
        filterDisplay="menu"
        paginator
        :rows="5"
        :globalFilterFields="['name', 'code_name']"
        responsiveLayout="scroll"
        class="datatable"
      >
        <Column field="id" header="ID" sortable style="width: 80px" />
        <Column field="name" header="Название" sortable filter filterPlaceholder="Введите название" />
        <Column field="code_name" header="Код" sortable filter filterPlaceholder="Кодовое имя" />
        <Column header="Действия" :exportable="false" style="width: 160px">
          <template #body="{ data }">
            <div class="actions">
              <Button
                icon="pi pi-pencil"
                rounded
                outlined
                severity="secondary"
                aria-label="Редактировать"
                @click="openEditCategory(data)"
              />
              <Button
                icon="pi pi-trash"
                rounded
                outlined
                severity="danger"
                aria-label="Удалить"
                @click="removeCategory(data.id)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </section>

    <Dialog
      v-model:visible="buildDialog"
      modal
      :header="buildDialogMode === 'create' ? 'Создать постройку' : 'Редактировать постройку'"
      class="dialog"
      :draggable="false"
    >
      <div class="dialog__grid">
        <label class="dialog__field">
          <span>Название</span>
          <InputText v-model="buildForm.name" placeholder="Название постройки" />
        </label>
        <label class="dialog__field">
          <span>Команда</span>
          <InputText v-model="buildForm.cmd" placeholder="/command" />
        </label>
        <label class="dialog__field">
          <span>Объект</span>
          <InputText v-model="buildForm.object_name" placeholder="object_name" />
        </label>
        <label class="dialog__field">
          <span>Категория</span>
          <Dropdown
            v-model="buildForm.id_category"
            :options="categorySelectOptions"
            optionLabel="name"
            optionValue="id"
            placeholder="Выберите категорию"
          />
        </label>
        <label class="dialog__field">
          <span>Уровень</span>
          <InputText v-model.number="buildForm.lvl" type="number" />
        </label>
        <label class="dialog__field">
          <span>Цена</span>
          <InputText v-model.number="buildForm.price" type="number" />
        </label>
        <label class="dialog__field">
          <span>Престиж</span>
          <InputText v-model.number="buildForm.prestige_lvl" type="number" />
        </label>
        <label class="dialog__field">
          <span>Коэф. зарплаты</span>
          <InputText v-model.number="buildForm.payday_coef" type="number" />
        </label>
        <label class="dialog__field">
          <span>Опыт</span>
          <InputText v-model.number="buildForm.exp" type="number" />
        </label>
        <label class="dialog__field dialog__field--full">
          <span>Описание</span>
          <InputText v-model="buildForm.desc" placeholder="Описание" />
        </label>
      </div>

      <template #footer>
        <div class="dialog__footer">
          <Button label="Отмена" severity="secondary" outlined @click="closeBuildDialog" />
          <Button label="Сохранить" icon="pi pi-save" @click="saveBuild" />
        </div>
      </template>
    </Dialog>

    <Dialog
      v-model:visible="categoryDialog"
      modal
      :header="categoryDialogMode === 'create' ? 'Создать категорию' : 'Редактировать категорию'"
      class="dialog"
      :draggable="false"
    >
      <div class="dialog__grid dialog__grid--single">
        <label class="dialog__field">
          <span>Название</span>
          <InputText v-model="categoryForm.name" placeholder="Название" />
        </label>
        <label class="dialog__field">
          <span>Кодовое имя</span>
          <InputText v-model="categoryForm.code_name" placeholder="code_name" />
        </label>
      </div>

      <template #footer>
        <div class="dialog__footer">
          <Button label="Отмена" severity="secondary" outlined @click="closeCategoryDialog" />
          <Button label="Сохранить" icon="pi pi-save" @click="saveCategory" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

import { api } from '@/composables/api'

const toast = useToast()

const builds = ref([])
const buildsLoading = ref(false)
const categories = ref([])
const categoriesLoading = ref(false)

const buildDialog = ref(false)
const categoryDialog = ref(false)
const buildDialogMode = ref('create')
const categoryDialogMode = ref('create')

const buildForm = ref(getEmptyBuild())
const categoryForm = ref(getEmptyCategory())

const buildFilters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  categoryName: { value: null, matchMode: FilterMatchMode.EQUALS },
  cmd: { value: null, matchMode: FilterMatchMode.CONTAINS },
  object_name: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const categoryFilters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  code_name: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const categoryFilterOptions = computed(() => categories.value.map((category) => category.name))
const categorySelectOptions = computed(() => categories.value)

onMounted(async () => {
  await fetchCategories()
  await fetchBuilds()
})

function getEmptyBuild() {
  return {
    id: null,
    name: '',
    lvl: 1,
    price: 0,
    prestige_lvl: 0,
    desc: '',
    cmd: '',
    object_name: '',
    id_category: null,
    payday_coef: 0,
    exp: 0
  }
}

function getEmptyCategory() {
  return {
    id: null,
    name: '',
    code_name: ''
  }
}

async function fetchBuilds() {
  buildsLoading.value = true
  try {
    const response = await api.get('public.getBuilds')
    const data = response.data?.data ?? []
    builds.value = data.map((build) => ({
      ...build,
      categoryName: build.Category?.name ?? ''
    }))
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить постройки' })
  } finally {
    buildsLoading.value = false
  }
}

async function fetchCategories() {
  categoriesLoading.value = true
  try {
    const response = await api.get('owner.getBuildCategories')
    categories.value = response.data?.data ?? []
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить категории' })
  } finally {
    categoriesLoading.value = false
  }
}

function openCreateBuild() {
  buildDialogMode.value = 'create'
  buildForm.value = getEmptyBuild()
  buildDialog.value = true
}

function openEditBuild(build) {
  buildDialogMode.value = 'edit'
  buildForm.value = {
    ...build,
    id_category: build.id_category ?? build.Category?.id ?? null
  }
  buildDialog.value = true
}

function closeBuildDialog() {
  buildDialog.value = false
}

async function saveBuild() {
  if (!buildForm.value.name || !buildForm.value.id_category) {
    toast.add({ severity: 'warn', summary: 'Проверьте данные', detail: 'Заполните имя и категорию' })
    return
  }

  const payload = {
    ...buildForm.value,
    lvl: Number(buildForm.value.lvl),
    price: Number(buildForm.value.price),
    prestige_lvl: Number(buildForm.value.prestige_lvl),
    payday_coef: Number(buildForm.value.payday_coef),
    exp: Number(buildForm.value.exp),
    id_category: Number(buildForm.value.id_category)
  }

  try {
    if (buildDialogMode.value === 'edit') {
      await api.put('owner.updateBuild', payload)
      toast.add({ severity: 'success', summary: 'Успех', detail: 'Постройка обновлена' })
    } else {
      await api.post('owner.createBuild', payload)
      toast.add({ severity: 'success', summary: 'Успех', detail: 'Постройка создана' })
    }
    await fetchBuilds()
    closeBuildDialog()
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось сохранить постройку' })
  }
}

async function removeBuild(id) {
  try {
    await api.delete('owner.removeBuild', { data: { id } })
    toast.add({ severity: 'success', summary: 'Удалено', detail: 'Постройка удалена' })
    await fetchBuilds()
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось удалить постройку' })
  }
}

function openCreateCategory() {
  categoryDialogMode.value = 'create'
  categoryForm.value = getEmptyCategory()
  categoryDialog.value = true
}

function openEditCategory(category) {
  categoryDialogMode.value = 'edit'
  categoryForm.value = { ...category }
  categoryDialog.value = true
}

function closeCategoryDialog() {
  categoryDialog.value = false
}

async function saveCategory() {
  if (!categoryForm.value.name || !categoryForm.value.code_name) {
    toast.add({ severity: 'warn', summary: 'Проверьте данные', detail: 'Заполните все поля' })
    return
  }

  try {
    if (categoryDialogMode.value === 'edit') {
      await api.put('owner.updateBuildCategory', categoryForm.value)
      toast.add({ severity: 'success', summary: 'Успех', detail: 'Категория обновлена' })
    } else {
      await api.post('owner.createBuildCategory', categoryForm.value)
      toast.add({ severity: 'success', summary: 'Успех', detail: 'Категория создана' })
    }
    await fetchCategories()
    await fetchBuilds()
    closeCategoryDialog()
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось сохранить категорию' })
  }
}

async function removeCategory(id) {
  try {
    await api.delete('owner.removeBuildCategory', { data: { id } })
    toast.add({ severity: 'success', summary: 'Удалено', detail: 'Категория удалена' })
    await fetchCategories()
    await fetchBuilds()
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось удалить категорию' })
  }
}
</script>

<style scoped lang="scss">
.panel-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px 0 40px;
}

.panel {
  background: #ffffff;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.panel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  h2,
  h3 {
    margin: 0;
  }

  p {
    margin: 4px 0 0;
    color: #707070;
  }
}

.panel__actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.table__toolbar {
  display: flex;
  justify-content: flex-end;
  padding: 12px 0;
}

.datatable {
  width: 100%;
}

.actions {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.dialog__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.dialog__grid--single {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.dialog__field {
  display: flex;
  flex-direction: column;
  gap: 6px;

  span {
    font-size: 14px;
    color: #6b7280;
  }
}

.dialog__field--full {
  grid-column: 1 / -1;
}

.dialog__footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
