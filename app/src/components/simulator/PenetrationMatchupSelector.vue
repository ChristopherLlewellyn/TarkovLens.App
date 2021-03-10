<template>
  <div class="q-pa-md">
    <div class="row justify-center q-mb-xs">
      <div style="width: 125px">
        <div v-if="selectedArmor.id" class="text-center">
          <q-chip class="q-ml-sm q-mr-sm" icon="mdi-shield" color="armor">
            {{ selectedArmor.armor.class }}
          </q-chip>
        </div>
      </div>

      <div style="width: 125px">
        <div v-if="selectedAmmunition.id" class="text-center">
          <q-chip class="q-ml-sm q-mr-sm" icon="mdi-arrow-collapse-right" color="bullet">
            {{ selectedAmmunition.penetration }}
          </q-chip>
        </div>
      </div>
    </div>

    <div class="row justify-center">
      <q-card id="armor-selector" v-ripple.early class="selector q-ma-xs pointer" @click="toggleShowArmor()">
        <template v-if="selectedArmor.id">
          <q-img
            :src="selectedArmor.blightbusterIcon"
            :ratio="1"
            contain
            class="center item-image q-mt-xs"
            @error="$event.target.src = selectedArmor.img"
          />
        </template>
        <template v-else>
          <q-avatar class="center q-mt-xs" size="75px" icon="mdi-shield-outline" />
        </template>

        <q-card-section>
          <div class="text-center">
            {{ selectedArmor.shortName ? selectedArmor.shortName : 'Select Armor' }}
          </div>
        </q-card-section>
      </q-card>

      <q-card id="ammo-selector" v-ripple.early class="selector q-ma-xs pointer" @click="toggleShowAmmunition()">
        <template v-if="selectedAmmunition.id">
          <q-img
            :src="selectedAmmunition.blightbusterIcon"
            :ratio="1"
            contain
            class="center item-image q-mt-xs"
            @error="$event.target.src = selectedAmmunition.img"
          />
        </template>
        <template v-else>
          <q-avatar class="center q-mt-xs" size="75px" icon="mdi-bullet" />
        </template>

        <q-card-section>
          <div class="text-center">
            {{ selectedAmmunition.shortName ? selectedAmmunition.shortName : 'Select Ammo' }}
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
import { defineComponent, PropType, reactive } from 'vue'
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
    },
    selectedArmor: {
      type: Object as PropType<Armor>,
      required: true
    },
    selectedAmmunition: {
      type: Object as PropType<Ammunition>,
      required: true
    }
  },
  emits: [
    'selectArmor',
    'selectAmmunition'
  ],
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
      const armor = props.armors.find(x => x.id === armorRow.id) ?? null
      emit('selectArmor', armor?.id)
    }

    function selectAmmunition (ammunitionRow: ArmorRow) {
      const ammunition = props.ammunitions.find(x => x.id === ammunitionRow.id) ?? null
      emit('selectAmmunition', ammunition?.id)
    }

    return { state, toggleShowArmor, toggleShowAmmunition, selectArmor, selectAmmunition }
  }
})
</script>

<style scoped lang="scss">
  .item-image {
    max-height: 75px;
    max-width: 75px;
  }

  .selector {
    height: 125px;
    width: 125px;
  }

  .pointer {
    cursor: pointer;
  }
</style>
