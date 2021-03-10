<template>
  <q-page>
    <div class="grid-container">
      <div class="percentage-chance text-center">
        <div class="text-h2" :style="{ color: hue }">
          {{ `${bothSelected ? chanceToPenetrate : '-'}%` }}
        </div>
        <div class="greyed-text q-mt-sm">
          ...chance to penetrate
        </div>
      </div>
      <div class="controls">
        <div class="full-width">
          <penetration-matchup-selector
            :armors="armors"
            :ammunitions="ammunitions"
            :selected-armor="state.selectedArmor"
            :selected-ammunition="state.selectedAmmunition"
            @selectArmor="setArmor"
            @selectAmmunition="setAmmunition"
          />

          <div>
            <div class="q-mb-sm" style="text-align: center;">
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
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, computed } from 'vue'
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
  .grid-container {
    display: grid;
    height: 100vh;
    justify-content: center;
    align-items: center;
    grid-template-columns: 1fr;
    grid-template-rows: 1.1fr 1.1fr;
    gap: 0px 0px;
    grid-template-areas:
      "percentage-chance"
      "controls";
  }
  .controls {
    padding-bottom: 15vh;
    grid-area: controls;
  }
  .percentage-chance { grid-area: percentage-chance; }
</style>
