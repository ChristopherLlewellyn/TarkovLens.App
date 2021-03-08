<template>
  <q-page>
    <div style="text-align: center; padding-top: 15vh;">
      <span class="text-h3" :style="{ color: hue }">{{ `${bothSelected ? chanceToPenetrate : '-'}%` }}</span>
    </div>

    <div class="full-width pin-to-bottom">
      <penetration-matchup-selector
        style="margin-bottom: 5vh"
        :armors="armors"
        :ammunitions="ammunitions"
        :selected-armor="state.selectedArmor"
        :selected-ammunition="state.selectedAmmunition"
        @selectArmor="setArmor"
        @selectAmmunition="setAmmunition"
      />

      <div style="margin-bottom: 10vh">
        <div class="q-mb-sm" style="text-align: center; margin-bottom: 5vh">
          Durability <span class="greyed-text">{{ state.selectedArmor.id ? `(${percentageDurability}%)` : '' }}</span>
        </div>

        <q-slider
          v-model="state.currentDurability"
          :disable="!state.selectedArmor.id"
          :min="0"
          :max="state.selectedArmor.id ? state.selectedArmor.armor.durability : 0"
          :step="1"
          label
          :label-value="state.currentDurability"
          label-always
          class="center q-mt-lg"
          style="width:80%; max-width: 700px;"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, computed } from '@vue/composition-api'
import PenetrationMatchupSelector from 'src/components/simulator/PenetrationMatchupSelector.vue'
import useItemService from 'src/hooks/useItemService'
import { Ammunition } from 'src/models/items/Ammunition'
import { Armor } from 'src/models/items/Armor'
import BallisticsCalculator from 'src/functions/BallisticsCalculator'
import Utils from 'src/functions/Utils'

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
      selectedAmmunition: <Ammunition>{},
      currentDurability: 0
    })

    const bothSelected = computed<boolean>(() => {
      return !!((state.selectedArmor.id && state.selectedAmmunition.id))
    })

    const percentageDurability = computed<number>(() => {
      const percentage = bothSelected.value === true
        ? parseInt(((state.currentDurability / state.selectedArmor.armor?.durability) * 100).toFixed(0))
        : 0
      return percentage
    })

    const chanceToPenetrate = computed<number>(() => {
      return bothSelected.value === true ? parseFloat(BallisticsCalculator.calculatePenetrationChance(
        state.currentDurability,
        state.selectedArmor.armor?.durability,
        state.selectedArmor.armor?.class,
        state.selectedAmmunition?.penetration).toFixed(1))
        : 0
    })

    const hue = computed<string>(() => {
      // 0 and 120 define the hue range (red to green)
      const color = bothSelected.value === true ? Utils.percentageToHsl(chanceToPenetrate.value / 100, 0, 120) : 'white'
      return color
    })

    function setArmor (id: string) {
      state.selectedArmor = armors.value.find(x => x.id === id) ?? new Armor()
      state.currentDurability = state.selectedArmor.armor?.durability
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
      bothSelected,
      percentageDurability,
      chanceToPenetrate,
      hue,

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

<style scoped lang="scss">
  #container {
      position: relative;
  }
  .pin-to-bottom {
      position: absolute;
      bottom: 0;
  }
</style>
