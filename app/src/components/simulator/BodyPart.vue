<template>
  <div
    class="body-part pointer"
    style="padding: 3px"
    :class="currentHp === 0 ? 'red-border' : ''"
  >
    <div class="text" style="margin-left: 2px">{{ name }}</div>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Utils, { RGB } from 'src/functions/Utils';

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
  },
  setup(props) {
    const rgb = computed<RGB>(() => {
      return Utils.percentageToRGB((props.currentHp / props.maxHp) * 100);
    });

    return {
      rgb,
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

.red-border {
  border: 1px solid darkred;
}
</style>
