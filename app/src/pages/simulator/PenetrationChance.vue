<template>
  <transition appear enter-active-class="animated fadeIn">
    <q-page key="page">
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
              :armors="armorsWithArmoredRigs"
              :ammunitions="ammunitions"
              :selected-armor="state.selectedArmor"
              :selected-ammunition="state.selectedAmmunition"
              :ammunitions-loading="state.ammunitionsLoading"
              :armors-loading="state.armorsLoading"
              @selectArmor="setArmor"
              @selectAmmunition="setAmmunition"
            />

            <div>
              <div class="q-mb-sm" style="text-align: center;">
                Durability <span class="greyed-text">{{ state.selectedArmor.id ? `(${percentageDurability}%)` : '' }}</span>
              </div>
              <q-list class="center q-mt-lg" style="width:95%; max-width: 700px;" dense>
                <q-item>
                  <q-item-section class="q-mr-sm" avatar>
                    <q-btn
                      color="bullet"
                      label="Shoot"
                      :disable="!state.selectedAmmunition.id || !state.selectedArmor.id"
                      @click="shoot()"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-slider
                      v-model="state.currentDurability"
                      :disable="!state.selectedArmor.id"
                      :min="0"
                      :max="state.selectedArmor.id ? state.selectedArmor.armor.durability : 0"
                      :step="1"
                      label
                      :label-value="state.currentDurability.toFixed(0)"
                      label-always
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </transition>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, computed } from 'vue'
import { useStore } from 'vuex'

import PenetrationMatchupSelector from 'src/components/simulator/PenetrationMatchupSelector.vue'
import useItemService from 'src/hooks/useItemService'
import { Ammunition } from 'src/models/items/Ammunition'
import { Armor } from 'src/models/items/Armor'
import BallisticsCalculator from 'src/functions/BallisticsCalculator'
import Utils from 'src/functions/Utils'
import { RootState } from 'src/store/RootState'
import { App } from 'src/enums/app'
import { useMeta } from 'quasar'

const metaData = {
  title: 'Penetration Simulator',
  titleTemplate: (title: string) => `${title} - ${App.AppName}`,
  meta: {
    description: { name: 'Visualize the % chance for different ammunitions to penetrate armor with any amount of remaining durability.' }
  }
}

export default defineComponent({
  name: 'PenetrationChanceSimulator',
  components: { PenetrationMatchupSelector },
  setup () {
    useMeta(metaData)

    const {
      ammunitions,
      armorsWithArmoredRigs,

      getAllAmmunitions,
      getAllArmorsWithArmoredRigs,
    } = useItemService()
    
    const store = useStore<RootState>()
    store.commit('layout/updateTitle', 'Penetration Chance')

    onBeforeMount(async () => {
      state.ammunitionsLoading = true
      state.armorsLoading = true

      await getAllAmmunitions()
      await getAllArmorsWithArmoredRigs()
      
      state.ammunitionsLoading = false
      state.armorsLoading = false
    })

    const state = reactive({
      selectedArmor: <Armor>{},
      selectedAmmunition: <Ammunition>{},
      ammunitionsLoading: false,
      armorsLoading: false,
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
      state.selectedArmor = armorsWithArmoredRigs.value.find(x => x.id === id) ?? new Armor()
      state.currentDurability = state.selectedArmor.armor?.durability
    }

    function setAmmunition (id: string) {
      state.selectedAmmunition = ammunitions.value.find(x => x.id === id) ?? new Ammunition()
    }

    function shoot () {
      if (state.selectedArmor.id && state.selectedAmmunition.id) {
        const armorDamage = BallisticsCalculator.calculateDamageToArmorWhenDoesNotPenetrate(
          state.selectedAmmunition.penetration,
          state.selectedAmmunition.projectiles,
          state.selectedAmmunition.armorDamage,
          state.selectedArmor.armor.class,
          state.selectedArmor.armor.material.destructibility
        )

        state.currentDurability = Math.max(state.currentDurability - armorDamage, 0)
      }
    }

    return {
      // Data
      state,
      ammunitions,
      armorsWithArmoredRigs,
      bothSelected,
      percentageDurability,
      chanceToPenetrate,
      hue,

      // Functions
      setArmor,
      setAmmunition,
      shoot
    }
  }
})
</script>

<style scoped lang="scss">
  .grid-container {
    display: grid;
    height: 90vh;
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
    margin-bottom: 10vh;
    grid-area: controls;
  }
  .percentage-chance { grid-area: percentage-chance; }
</style>
