<script setup>
import Dropdown from 'primevue/dropdown'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { onMounted, toRefs, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { api } from '@/composables/api'

const props = defineProps({
  buildDialog: { type: Boolean, required: true },
  buildDialogMode: { type: String, required: true },
  buildForm: { type: Object, required: true },
  categorySelectOptions: { type: Array, required: true },
  fetchBuilds: { type: Function, required: true },
  closeBuildDialog: { type: Function, required: true }
})

const toast = useToast()

const { buildDialog, buildDialogMode, buildForm, categorySelectOptions, closeBuildDialog } = toRefs(props)

watch(buildDialog, (val) => {
  console.log('BuildCreateModal visible', val)
})

onMounted(() => {
  console.log('BuildCreateModal mounted')
})

async function saveBuild() {
  if (!buildForm.value.name || !buildForm.value.id_category) {
    toast.add({
      severity: 'warn',
      summary: 'Проверьте данные',
      detail: 'Заполните все поля'
    })
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
    await props.fetchBuilds()
    closeBuildDialog.value()
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось сохранить постройку' })
  }
}
</script>

<template>
  <Dialog
    :visible="buildDialog"
    modal
    :header="buildDialogMode === 'create' ? 'Создать постройку' : 'Редактировать постройку'"
    class="dialog"
    appendTo="self"
    :baseZIndex="1100"
    :draggable="false"
    @update:visible="(val) => !val && closeBuildDialog()"
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
        <span>Коэфф. выплаты</span>
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
</template>

<style scoped lang="scss">
.dialog__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
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

.dialog {
  border-radius: 16px;
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
</style>
