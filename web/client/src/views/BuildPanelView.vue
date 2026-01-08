<template>
  <div class="container panel-wrapper">
    <Toast />
    <section class="panel">
      <div class="panel__header">
        <div>
          <h2>{{ labels.pageTitle }}</h2>
          <p>{{ labels.pageSubtitle }}</p>
        </div>
      </div>
      <TabView class="panel__tabs">
        <TabPanel :header="labels.tabs.builds">
          <div class="tab__header">
            <div>
              <h3>{{ labels.tabs.builds }}</h3>
              <p>{{ labels.buildIntro }}</p>
            </div>
            <div class="tab__actions">
              <Button
                icon="pi pi-plus"
                :label="labels.actions.createBuild"
                severity="success"
                outlined
                @click="openCreateBuild"
              />
            </div>
          </div>
          <div class="table__toolbar">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="buildFilters.global.value" :placeholder="labels.placeholders.search" />
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
            <Column
              field="name"
              :header="labels.columns.name"
              sortable
              filter
              :filterPlaceholder="labels.placeholders.searchName"
            />
            <Column
              field="categoryName"
              :header="labels.columns.category"
              sortable
              filter
              :showFilterMatchModes="false"
            >
              <template #filter="{ filterModel }">
                <Dropdown
                  v-model="filterModel.value"
                  :options="categoryFilterOptions"
                  :placeholder="labels.placeholders.category"
                  showClear
                />
              </template>
            </Column>
            <Column field="lvl" :header="labels.columns.level" sortable />
            <Column field="price" :header="labels.columns.price" sortable />
            <Column field="prestige_lvl" :header="labels.columns.prestige" sortable />
            <Column field="payday_coef" :header="labels.columns.payoff" sortable />
            <Column field="exp" :header="labels.columns.exp" sortable />
            <Column field="cmd" :header="labels.columns.cmd" sortable />
            <Column field="object_name" :header="labels.columns.object" sortable />
            <Column :header="labels.columns.actions" :exportable="false" style="width: 180px">
              <template #body="{ data }">
                <div class="actions">
                  <Button
                    icon="pi pi-pencil"
                    rounded
                    outlined
                    severity="secondary"
                    :aria-label="labels.actions.edit"
                    @click="openEditBuild(data)"
                  />
                  <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    :aria-label="labels.actions.delete"
                    @click="removeBuild(data.id)"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </TabPanel>
        <TabPanel :header="labels.tabs.categories">
          <div class="tab__header">
            <div>
              <h3>{{ labels.tabs.categories }}</h3>
              <p>{{ labels.categoryIntro }}</p>
            </div>
            <div class="tab__actions">
              <Button
                icon="pi pi-plus"
                :label="labels.actions.createCategory"
                severity="success"
                outlined
                @click="openCreateCategory"
              />
            </div>
          </div>
          <div class="table__toolbar">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="categoryFilters.global.value" :placeholder="labels.placeholders.search" />
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
            <Column
              field="name"
              :header="labels.columns.name"
              sortable
              filter
              :filterPlaceholder="labels.placeholders.searchName"
            />
            <Column
              field="code_name"
              :header="labels.columns.code"
              sortable
              filter
              :filterPlaceholder="labels.placeholders.categoryCode"
            />
            <Column :header="labels.columns.actions" :exportable="false" style="width: 160px">
              <template #body="{ data }">
                <div class="actions">
                  <Button
                    icon="pi pi-pencil"
                    rounded
                    outlined
                    severity="secondary"
                    :aria-label="labels.actions.edit"
                    @click="openEditCategory(data)"
                  />
                  <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    :aria-label="labels.actions.delete"
                    @click="removeCategory(data.id)"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </TabPanel>
        <TabPanel :header="labels.tabs.userLevels">
          <div class="tab__header">
            <div>
              <h3>{{ labels.tabs.userLevels }}</h3>
              <p>{{ labels.userLevelsIntro }}</p>
            </div>
            <div class="tab__actions">
              <Button
                icon="pi pi-plus"
                :label="labels.actions.createUserLevel"
                severity="success"
                outlined
                @click="openCreateUserLevel"
              />
            </div>
          </div>
          <div class="table__toolbar">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="userLevelFilters.global.value" :placeholder="labels.placeholders.search" />
            </span>
          </div>
          <DataTable
            :value="userLevels"
            dataKey="id"
            :loading="userLevelsLoading"
            :filters="userLevelFilters"
            filterDisplay="menu"
            paginator
            :rows="5"
            :globalFilterFields="['name', 'lvl', 'exp_need']"
            responsiveLayout="scroll"
            class="datatable"
          >
            <Column field="lvl" :header="labels.columns.level" sortable style="width: 120px" />
            <Column
              field="name"
              :header="labels.columns.name"
              sortable
              filter
              :filterPlaceholder="labels.placeholders.searchName"
            />
            <Column field="exp_need" :header="labels.columns.exp" sortable style="width: 160px" />
            <Column :header="labels.columns.actions" :exportable="false" style="width: 160px">
              <template #body="{ data }">
                <div class="actions">
                  <Button
                    icon="pi pi-pencil"
                    rounded
                    outlined
                    severity="secondary"
                    :aria-label="labels.actions.edit"
                    @click="openEditUserLevel(data)"
                  />
                  <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    :aria-label="labels.actions.delete"
                    @click="removeUserLevel(data.id)"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </TabPanel>
      </TabView>
    </section>
    <BuildCreateModal
      :build-dialog="buildDialog"
      :build-dialog-mode="buildDialogMode"
      :build-form="buildForm"
      :category-select-options="categorySelectOptions"
      :fetch-builds="fetchBuilds"
      :close-build-dialog="closeBuildDialog"
    />
    <Dialog
      v-model:visible="categoryDialog"
      modal
      :header="categoryDialogMode === 'create' ? labels.dialog.createCategory : labels.dialog.editCategory"
      class="dialog"
      :draggable="false"
    >
      <div class="dialog__grid dialog__grid--single">
        <label class="dialog__field">
          <span>{{ labels.columns.name }}</span>
          <InputText v-model="categoryForm.name" :placeholder="labels.placeholders.name" />
        </label>
        <label class="dialog__field">
          <span>{{ labels.dialog.categoryCodeLabel }}</span>
          <InputText v-model="categoryForm.code_name" :placeholder="labels.placeholders.categoryCode" />
        </label>
      </div>
      <template #footer>
        <div class="dialog__footer">
          <Button :label="labels.actions.cancel" severity="secondary" outlined @click="closeCategoryDialog" />
          <Button :label="labels.actions.save" icon="pi pi-save" @click="saveCategory" />
        </div>
      </template>
    </Dialog>
    <Dialog
      v-model:visible="userLevelDialog"
      modal
      :header="userLevelDialogMode === 'create' ? labels.dialog.createUserLevel : labels.dialog.editUserLevel"
      class="dialog"
      :draggable="false"
    >
      <div class="dialog__grid dialog__grid--single">
        <label class="dialog__field">
          <span>{{ labels.columns.level }}</span>
          <InputText v-model.number="userLevelForm.lvl" type="number" />
        </label>
        <label class="dialog__field">
          <span>{{ labels.columns.name }}</span>
          <InputText v-model="userLevelForm.name" :placeholder="labels.placeholders.name" />
        </label>
        <label class="dialog__field">
          <span>{{ labels.columns.exp }}</span>
          <InputText v-model.number="userLevelForm.exp_need" type="number" />
        </label>
      </div>
      <template #footer>
        <div class="dialog__footer">
          <Button :label="labels.actions.cancel" severity="secondary" outlined @click="closeUserLevelDialog" />
          <Button :label="labels.actions.save" icon="pi pi-save" @click="saveUserLevel" />
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
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import { useToast } from 'primevue/usetoast'

import BuildCreateModal from '@/components/Modals/Builds/BuildCreateModal.vue'
import { api } from '@/composables/api'

const toast = useToast()

const labels = {
  pageTitle: '\u0422\u0430\u0431\u043b\u0438\u0446\u044b',
  pageSubtitle: 'CRUD \u043f\u043e \u043f\u043e\u0441\u0442\u0440\u043e\u0439\u043a\u0430\u043c \u0438 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f\u043c \u043f\u043e\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0431\u043e\u0442\u0430',
  tabs: {
    builds: '\u041f\u043e\u0441\u0442\u0440\u043e\u0439\u043a\u0438',
    categories: '\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438 \u043f\u043e\u0441\u0442\u0440\u043e\u0435\u043a',
    userLevels: '\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u0435 \u0443\u0440\u043e\u0432\u043d\u0438'
  },
  buildIntro: '\u0421\u043e\u0437\u0434\u0430\u0432\u0430\u0439\u0442\u0435 \u0438 \u0440\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u0443\u0439\u0442\u0435 \u043f\u043e\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0434\u043b\u044f \u044d\u043a\u043e\u043d\u043e\u043c\u0438\u043a\u0438',
  categoryIntro: '\u0421\u043f\u0438\u0441\u043e\u043a \u0438 \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f\u043c\u0438 \u043f\u043e\u0441\u0442\u0440\u043e\u0435\u043a',
  userLevelsIntro: '\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0430 \u0443\u0440\u043e\u0432\u043d\u0435\u0439 \u0438 \u0442\u0440\u0435\u0431\u0443\u0435\u043c\u043e\u0433\u043e \u043e\u043f\u044b\u0442\u0430',
  actions: {
    createBuild: '\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043f\u043e\u0441\u0442\u0440\u043e\u0439\u043a\u0443',
    createCategory: '\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044e',
    createUserLevel: '\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0443\u0440\u043e\u0432\u0435\u043d\u044c',
    edit: '\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c',
    delete: '\u0423\u0434\u0430\u043b\u0438\u0442\u044c',
    cancel: '\u041e\u0442\u043c\u0435\u043d\u0430',
    save: '\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c'
  },
  placeholders: {
    search: '\u041f\u043e\u0438\u0441\u043a',
    searchName: '\u041f\u043e\u0438\u0441\u043a \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u044f',
    category: '\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f',
    categoryCode: 'code_name',
    name: '\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435'
  },
  columns: {
    name: '\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435',
    category: '\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f',
    level: '\u0423\u0440\u043e\u0432\u0435\u043d\u044c',
    price: '\u0426\u0435\u043d\u0430',
    prestige: '\u041f\u0440\u0435\u0441\u0442\u0438\u0436',
    payoff: '\u041a\u043e\u044d\u0444\u0444. \u0432\u044b\u043f\u043b\u0430\u0442\u044b',
    exp: '\u041e\u043f\u044b\u0442',
    cmd: '\u041a\u043e\u043c\u0430\u043d\u0434\u0430',
    object: '\u041e\u0431\u044a\u0435\u043a\u0442',
    actions: '\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044f',
    code: '\u041a\u043e\u0434'
  },
  dialog: {
    createCategory: '\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044e',
    editCategory: '\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044e',
    categoryCodeLabel: '\u041a\u043e\u0434 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438',
    createUserLevel: '\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0443\u0440\u043e\u0432\u0435\u043d\u044c',
    editUserLevel: '\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0443\u0440\u043e\u0432\u0435\u043d\u044c'
  }
}

const builds = ref([])
const buildsLoading = ref(false)
const categories = ref([])
const categoriesLoading = ref(false)
const userLevels = ref([])
const userLevelsLoading = ref(false)

const buildDialog = ref(false)
const categoryDialog = ref(false)
const buildDialogMode = ref('create')
const categoryDialogMode = ref('create')
const userLevelDialog = ref(false)
const userLevelDialogMode = ref('create')

const buildForm = ref(getEmptyBuild())
const categoryForm = ref(getEmptyCategory())
const userLevelForm = ref(getEmptyUserLevel())

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

const userLevelFilters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  lvl: { value: null, matchMode: FilterMatchMode.EQUALS }
})

const categoryFilterOptions = computed(() => categories.value.map((category) => category.name))
const categorySelectOptions = computed(() => categories.value)

onMounted(async () => {
  await fetchCategories()
  await fetchBuilds()
  await fetchUserLevels()
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

function getEmptyUserLevel() {
  return {
    id: null,
    name: '',
    lvl: 1,
    exp_need: 0
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

async function fetchUserLevels() {
  userLevelsLoading.value = true
  try {
    const response = await api.get('owner.getUserLevels')
    userLevels.value = response.data?.data ?? []
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить уровни' })
  } finally {
    userLevelsLoading.value = false
  }
}

function openCreateBuild() {
  console.log('openCreateBuild clicked', {
    buildDialog: buildDialog.value,
    buildDialogMode: buildDialogMode.value
  })
  buildDialogMode.value = 'create'
  buildForm.value = getEmptyBuild()
  buildDialog.value = true
  console.log('openCreateBuild updated', {
    buildDialog: buildDialog.value,
    buildDialogMode: buildDialogMode.value
  })
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

function openCreateUserLevel() {
  userLevelDialogMode.value = 'create'
  userLevelForm.value = getEmptyUserLevel()
  userLevelDialog.value = true
}

function openEditUserLevel(level) {
  userLevelDialogMode.value = 'edit'
  userLevelForm.value = { ...level }
  userLevelDialog.value = true
}

function closeUserLevelDialog() {
  userLevelDialog.value = false
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

async function saveUserLevel() {
  if (!userLevelForm.value.name || userLevelForm.value.lvl == null || userLevelForm.value.exp_need == null) {
    toast.add({ severity: 'warn', summary: 'Проверьте данные', detail: 'Заполните все поля' })
    return
  }

  const payload = {
    ...userLevelForm.value,
    lvl: Number(userLevelForm.value.lvl),
    exp_need: Number(userLevelForm.value.exp_need)
  }

  try {
    if (userLevelDialogMode.value === 'edit') {
      await api.put('owner.updateUserLevel', payload)
      toast.add({ severity: 'success', summary: 'Успех', detail: 'Уровень обновлен' })
    } else {
      await api.post('owner.createUserLevel', payload)
      toast.add({ severity: 'success', summary: 'Успех', detail: 'Уровень создан' })
    }
    await fetchUserLevels()
    closeUserLevelDialog()
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось сохранить уровень' })
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

async function removeUserLevel(id) {
  try {
    await api.delete('owner.removeUserLevel', { data: { id } })
    toast.add({ severity: 'success', summary: 'Удалено', detail: 'Уровень удален' })
    await fetchUserLevels()
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось удалить уровень' })
  }
}
</script>

<style scoped lang="scss">
.panel-wrapper {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 32px 0 64px;
  position: relative;

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

  h2,
  h3 {
    margin: 0;
    font-weight: 600;
    letter-spacing: 0.2px;
  }

  h2 {
    font-size: 22px;
  }

  h3 {
    font-size: 18px;
  }

  p {
    margin: 4px 0 0;
    color: var(--ink-2);
    max-width: 540px;
  }
}

.panel__actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tab__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 12px;
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }
  p {
    margin: 4px 0 0;
    color: var(--ink-2);
  }
}
.tab__actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.panel__tabs {
  margin-top: 12px;
}
:deep(.p-tabview-nav) {
  background: transparent;
  border: none;
  gap: 8px;
}
:deep(.p-tabview-nav li .p-tabview-nav-link) {
  border-radius: 10px;
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.6);
  color: var(--ink-1);
  padding: 10px 16px;
  font-weight: 600;
}
:deep(.p-tabview-nav li.p-highlight .p-tabview-nav-link) {
  background: rgba(27, 127, 121, 0.16);
  border-color: rgba(27, 127, 121, 0.4);
}
:deep(.p-tabview-panels) {
  background: transparent;
  padding: 18px 0 0;
}

.table__toolbar {
  display: flex;
  justify-content: flex-end;
  padding: 14px 0 10px;

  :deep(.p-input-icon-left) {
    width: min(340px, 100%);
  }
}

.datatable {
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
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

:deep(.p-inputtext),
:deep(.p-dropdown) {
  border-radius: 10px;
  border-color: rgba(15, 29, 45, 0.12);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: inset 0 1px 2px rgba(15, 29, 45, 0.05);
}

:deep(.p-inputtext:focus),
:deep(.p-dropdown.p-focus) {
  border-color: rgba(27, 127, 121, 0.5);
  box-shadow: 0 0 0 3px rgba(44, 191, 147, 0.18);
}

:deep(.p-button) {
  border-radius: 10px;
  font-weight: 600;
  letter-spacing: 0.2px;
}

:deep(.p-button.p-button-secondary) {
  color: var(--ink-1);
}

:deep(.p-datatable) {
  background: transparent;
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

.dialog {
  border-radius: 16px;
}

:deep(.p-dialog-header) {
  border-bottom: 1px solid rgba(15, 29, 45, 0.08);
  background: linear-gradient(180deg, #ffffff 0%, #f6f4ef 100%);
}

:deep(.p-dialog-content) {
  background: #ffffff;
}

:deep(.p-dialog-footer) {
  border-top: 1px solid rgba(15, 29, 45, 0.08);
  background: #ffffff;
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

  .panel__actions {
    width: 100%;
  }
}
</style>



