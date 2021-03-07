<template>
  <q-page padding>
    <penetration-matchup-selector
      :armors="armors"
      :ammunitions="ammunitions"
      :selected-armor="state.selectedArmor"
      :selected-ammunition="state.selectedAmmunition"
      @selectArmor="setArmor"
      @selectAmmunition="setAmmunition"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from '@vue/composition-api'
import PenetrationMatchupSelector from 'src/components/simulator/PenetrationMatchupSelector.vue'
import useItemService from 'src/hooks/useItemService'
import { Ammunition } from 'src/models/items/Ammunition'
import { Armor } from 'src/models/items/Armor'

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

    const state = reactive({
      selectedArmor: <Armor>{},
      selectedAmmunition: <Ammunition>{}
    })

    function setArmor (id: string) {
      state.selectedArmor = armors.value.find(x => x.id === id) ?? new Armor()
    }

    function setAmmunition (id: string) {
      state.selectedAmmunition = ammunitions.value.find(x => x.id === id) ?? new Ammunition()
    }

    return {
      // Data
      state,
      ammunitions,
      armors,
      tacticalrigs,

      // Functions
      getAllAmmunitions,
      getAllArmors,
      getAllTacticalrigs,
      setArmor,
      setAmmunition
    }
  }
})
</script>
