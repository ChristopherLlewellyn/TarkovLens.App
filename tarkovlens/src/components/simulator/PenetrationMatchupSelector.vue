<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <q-card id="armor-selector" v-ripple.early class="selector q-ma-xs" @click="toggleShowArmor()">
        <q-img
          src="https://raw.githubusercontent.com/Blightbuster/EfTIcons/master/uid/5b44d0de86f774503d30cba8.png"
          :ratio="1"
          contain
          class="center item-image"
        />

        <q-card-section>
          <div class="text-center">
            Gen4 HMK
          </div>
        </q-card-section>
      </q-card>

      <q-card id="ammo-selector" class="selector q-ma-xs" @click="toggleShowAmmunition()">
        <q-img
          src="https://raw.githubusercontent.com/Blightbuster/EfTIcons/master/uid/59e690b686f7746c9f75e848.png"
          :ratio="1"
          contain
          style="max-width: 100px"
          class="center item-image"
        />

        <q-card-section>
          <div class="text-center">
            M995
          </div>
        </q-card-section>
      </q-card>
    </div>

    <armor-list-dialog
      :armors="armors"
      :show="state.showArmorDialog"
      @closeDialog="toggleShowArmor"
      @selectRow="selectArmor"
    />

    <ammunition-list-dialog
      :ammunitions="ammunitions"
      :show="state.showAmmoDialog"
      @closeDialog="toggleShowAmmunition"
      @selectRow="selectAmmunition"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from '@vue/composition-api'
import { Ammunition } from 'src/models/items/Ammunition'
import { Armor } from 'src/models/items/Armor'
import ArmorListDialog from 'src/components/_shared/ArmorListDialog.vue'
import AmmunitionListDialog from 'src/components/_shared/AmmunitionListDialog.vue'
import { ArmorRow } from 'src/components/_models/ArmorRow'

export default defineComponent({
  name: 'PenetrationMatchupSelector',
  components: { ArmorListDialog, AmmunitionListDialog },
  props: {
    armors: {
      type: Array as PropType<Armor[]>,
      required: true
    },
    ammunitions: {
      type: Array as PropType<Ammunition[]>,
      required: true
    }
  },
  setup (props, { emit }) {
    const state = reactive({
      showArmorDialog: false,
      showAmmoDialog: false
    })

    function toggleShowArmor () {
      state.showArmorDialog = !state.showArmorDialog
    }

    function toggleShowAmmunition () {
      state.showAmmoDialog = !state.showAmmoDialog
    }

    function selectArmor (armorRow: ArmorRow) {
      console.log(armorRow)
      const armor = props.armors.find(x => x.id === armorRow.id) ?? null
      emit('selectArmor', armor)
    }

    function selectAmmunition (ammunitionRow: ArmorRow) {
      console.log(ammunitionRow)
      const ammunition = props.ammunitions.find(x => x.id === ammunitionRow.id) ?? null
      emit('selectAmmunition', ammunition)
    }

    return { state, toggleShowArmor, toggleShowAmmunition, selectArmor, selectAmmunition }
  }
})
</script>

<style scoped lang="scss">
  .item-image {
    max-height: 100px;
    max-width: 100px;
  }

  .selector {
    height: 150px;
    width: 150px;
  }
</style>
