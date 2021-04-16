<template>
  <div class="q-mt-md text-center">
    <q-img
      :src="armor.blightbusterIcon"
      :ratio="1"
      fit="contain"
      class="armor-image q-mr-xs"
    >
      <template #error>
        <q-img
          :src="armor.icon"
          :ratio="1"
          fit="contain"
          class="armor-image q-mr-xs"
        />
      </template>
    </q-img>
    <div class="armor bold">
      {{ armor.currentDurability.toFixed(1) }} /
      {{ armor.armor.durability }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from 'src/enums/icon';
import { EquippedArmor } from 'src/models/characters/Combatant';

export default defineComponent({
  name: 'DamageEventArmorDisplay',
  props: {
    armor: {
      type: EquippedArmor,
      required: true
    },
  }
})
</script>
