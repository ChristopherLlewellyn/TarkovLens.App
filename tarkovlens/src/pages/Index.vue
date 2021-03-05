<template>
  <q-page padding>
    <pre>{{ ammunitions }}</pre>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from '@vue/composition-api'
import useItemService from 'src/hooks/useItemService'

export default defineComponent({
  name: 'PageIndex',
  components: { },
  setup () {
    const {
      ammunitions,
      getAllAmmunitions
      // getAllArmors,
      // getAllTacticalrigs
    } = useItemService()

    onBeforeMount(async () => {
      await getAllAmmunitions()
    })

    return {
      ammunitions,
      getAllAmmunitions
    }
  }
})
</script>
