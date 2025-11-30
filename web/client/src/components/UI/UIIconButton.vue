<template>
  <div :class="['block__btn__icon', { btn__disabled: disabled }]">
    <img :src="icon" />
  </div>
</template>

<script setup>
let props = defineProps({
  icon: String,
  disabled: Boolean
})
</script>

<style scoped>
.block__btn__icon {
  width: 35px;
  height: 35px;
  padding: 5px;
  border-radius: 50%;
  transition: 0.5s all;

  & img{
    width: 100%;
    height: 100%;
  }

  &:hover {
    cursor: pointer;
    background-color: rgba(0,0,0,0.1)
  }

  &:active{
    transform: scale(1.1);
    background-color: rgba(0,0,0,0.2)
  }

  & .btn__disabled {
    background-color: var(--color-disabled);
  }
}
</style>
