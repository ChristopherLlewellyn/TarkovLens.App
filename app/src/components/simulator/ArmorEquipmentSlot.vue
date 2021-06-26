<template>
  <div class="armor-slot pointer" style="padding: 3px">
    <div class="title" style="margin-left: 2px">
      <span>{{ title }}</span>
    </div>
    <div v-if="equippedArmor.id.length > 0">
      <div class="text" style="margin-left: 2px">
        <span class="text-armor">{{ equippedArmor.shortName }}</span>
        <span class="text-armor" style="float: right">
          {{ equippedArmor.armor.class }}
          <q-icon :name="Icon.Armor" color="armor" />
        </span>
      </div>
      <div>
        <q-img
          :src="equippedArmor.blightbusterIcon"
          :ratio="1"
          fit="contain"
          class="center item-image q-mt-xs"
        >
          <template #error>
            <q-img
              :src="equippedArmor.img"
              :ratio="1"
              fit="contain"
              class="center item-image q-mt-xs"
            />
          </template>
        </q-img>
      </div>
      <div class="text">
        <span>Protects</span>
        <div class="text-armor">
          {{ Utils.humanizeArmorZones(equippedArmor.armor.zones) }}
        </div>
      </div>
    </div>

    <div v-else class="text-center">
      <q-avatar class="armor center" size="50px" icon="mdi-shield" />
      <span class="greyed-text" style="font-weight: bold;">None</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Utils from 'src/functions/Utils';
import { EquippedArmor } from 'src/models/characters/Combatant';
import { Icon } from 'src/enums/icon';

export default defineComponent({
  name: 'ArmorEquipmentSlot',
  props: {
    title: {
      type: String,
      required: true,
    },
    equippedArmor: {
      type: EquippedArmor,
      required: false,
      default: new EquippedArmor(),
    },
  },
  setup() {
    return {
      Icon,
      Utils,
    };
  },
});
</script>

<style scoped>
.armor-slot {
  width: 150px;
  background: rgba(0, 0, 0, 0.75) !important;
}

.no-background {
  background: rgba(0, 0, 0, 0) !important;
}

.text {
  color: white;
  font-size: 11px;
  font-weight: bold;
}

.title {
  color: white;
  font-size: 13px;
  font-weight: bold;
}

.item-image {
  max-height: 90px;
  max-width: 90px;
}
</style>
