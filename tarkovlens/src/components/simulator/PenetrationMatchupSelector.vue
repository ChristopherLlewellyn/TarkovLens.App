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
      @closeDialog="toggleShowArmor()"
    />

    <ammunition-list-dialog
      :ammunitions="ammunitions"
      :show="state.showAmmoDialog"
      @closeDialog="toggleShowAmmunition()"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from '@vue/composition-api'
import { Ammunition } from 'src/models/items/Ammunition'
import { Armor } from 'src/models/items/Armor'
import ArmorListDialog from 'src/components/_shared/ArmorListDialog.vue'
import AmmunitionListDialog from 'src/components/_shared/AmmunitionListDialog.vue'

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
  setup () {
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

    return { state, toggleShowArmor, toggleShowAmmunition }
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
