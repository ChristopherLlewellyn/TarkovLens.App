<template>
  <div
    class="body-part pointer"
    style="padding: 3px"
    :class="currentHp === 0 ? 'red-border' : ''"
  >
    <div v-if="equippedArmor.id.length > 0" class="text" style="margin-left: 2px">
      <span class="text-armor">{{ Utils.truncate(equippedArmor.shortName,8) }}</span>
      <span class="text-armor" style="float: right;">
        {{ equippedArmor.armor.class }}
        <q-icon
          :name="Icon.Armor"
          color="armor"
        />
      </span>
    </div>
    <div class="text" style="margin-left: 2px">
      <span>{{ name }}</span>
    </div>
    <q-linear-progress
      size="25px"
      :style="{ color: `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})` }"
      :value="maxHp > 0 ? currentHp / maxHp : 0"
    >
      <div class="absolute-full flex flex-center">
        <q-badge
          class="no-background text"
          text-color="white"
          :label="`${currentHp.toFixed(0)} / ${maxHp}`"
        />
      </div>
    </q-linear-progress>

    <q-linear-progress
      v-if="equippedArmor.id.length > 0"
      size="15px"
      color="armor"
      :value="
        maxHp > 0
          ? equippedArmor.currentDurability / equippedArmor.armor.durability
          : 0
      "
    >
      <div class="absolute-full flex flex-center">
        <q-badge
          class="no-background small-text"
          text-color="white"
          :label="`${equippedArmor.currentDurability.toFixed(1)} / ${equippedArmor.armor.durability}.0`"
        />
      </div>
    </q-linear-progress>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Utils, { RGB } from 'src/functions/Utils';
import { EquippedArmor } from 'src/models/characters/Combatant';
import { Icon } from 'src/enums/icon';

export default defineComponent({
  name: 'BodyPart',
  props: {
    name: {
      type: String,
      required: true,
    },
    maxHp: {
      type: Number,
      required: true,
    },
    currentHp: {
      type: Number,
      required: true,
    },
    equippedArmor: {
      type: EquippedArmor,
      required: false,
      default: new EquippedArmor(),
    },
  },
  setup(props) {
    const rgb = computed<RGB>(() => {
      return Utils.percentageToRGB((props.currentHp / props.maxHp) * 100);
    });

    return {
      rgb,
      Icon,
      Utils
    };
  },
});
</script>

<style scoped>
.body-part {
  width: 90px;
  background: rgba(0, 0, 0, 0.55) !important;
}

.no-background {
  background: rgba(0, 0, 0, 0) !important;
}

.text {
  color: white;
  font-size: 11px;
  font-weight: bold;
}

.small-text {
  color: white;
  font-size: 8px;
  font-weight: bold;
}

.red-border {
  border: 1px solid darkred;
}
</style>
