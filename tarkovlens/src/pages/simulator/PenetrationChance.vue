<template>
  <q-page padding>
    <penetration-matchup-selector :armors="armors" :ammunitions="ammunitions" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from '@vue/composition-api'
import PenetrationMatchupSelector from 'src/components/simulator/PenetrationMatchupSelector.vue'
import useItemService from 'src/hooks/useItemService'

export default defineComponent({
  name: 'PenetrationChanceSimulator',
  components: { PenetrationMatchupSelector },
  setup () {
    const {
      ammunitions,
      armors,
      tacticalrigs,

      getAllAmmunitions,
      getAllArmors,
      getAllTacticalrigs
    } = useItemService()

    onBeforeMount(async () => {
      await getAllAmmunitions()
      await getAllArmors()
      await getAllTacticalrigs()
    })

    return {
      // Data
      ammunitions,
      armors,
      tacticalrigs,

      // Functions
      getAllAmmunitions,
      getAllArmors,
      getAllTacticalrigs
    }
  }
})
</script>
