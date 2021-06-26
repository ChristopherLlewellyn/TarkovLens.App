<template>
  <div class="q-ma-md text-center">
    <q-spinner-gears :size="size" color="primary" />
    <div class="text-primary q-mt-xs">Loading...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoadingSpinner',
  props: {
    size: {
      type: String,
      required: false,
      default: '4rem'
    }
  },
  setup() {
    return
  }
})
</script>
