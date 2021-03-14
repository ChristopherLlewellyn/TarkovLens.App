<template>
  <q-dialog
    v-model="props.show"
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-toolbar class="bg-dark">
        <q-btn
          dense
          flat
          round
          icon="mdi-arrow-left"
          class="q-mr-sm"
          @click="closeDialog()"
        >
          <q-tooltip> Close </q-tooltip>
        </q-btn>
        <span style="font-size: 19px">Select Combatant</span>
      </q-toolbar>

      <q-list bordered separator>
        <q-item
          v-for="combatant in combatants"
          :key="combatant.id"
          v-ripple
          clickable
          class="q-pt-md q-pb-md"
          @click="onRowClick(combatant)"
        >
          <q-item-section avatar>
            <q-avatar color="dark" text-color="white">
              <img
                v-if="combatant.portrait.length > 0"
                :src="combatant.portrait"
              />
              <span v-else>{{ combatant.name.charAt(0) }}</span>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label overline>
              <q-icon
                v-if="
                  combatant.type === CharacterType.PMC ||
                  combatant.type === CharacterType.Scav
                "
                :name="Icon.Playable"
                class="q-mr-xs"
                color="white"
                size="15px"
              />
              <q-icon
                v-if="combatant.type === CharacterType.Boss"
                :name="Icon.Boss"
                class="q-mr-xs"
                color="boss"
                size="15px"
              />
              <span>{{ combatant.name }}</span>
            </q-item-label>
            <q-item-label caption lines="1">
              <span class="greyed-text">
                <q-icon :name="Icon.MapMarker"></q-icon>
              </span>
              <span class="greyed-text">{{ combatant.location }}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-center">
              <span class="q-mr-xs">
                <q-icon :name="Icon.Health" color="health-green" size="20px" />
              </span>
              <span
                class="health-green"
                style="font-weight: bold; font-size: 16px"
                >{{ combatant.healthStatus.maxHp }}</span
              >
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Icon } from 'src/enums/icon';
import { Combatant } from 'src/models/characters/Combatant';
import { CharacterType } from 'src/models/characters/_shared';

export default defineComponent({
  name: 'CombatantListDialog',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    combatants: {
      type: Array as PropType<Combatant[]>,
      required: true,
    },
  },
  emits: ['closeDialog', 'selectRow'],
  setup(props, { emit }) {
    const closeDialog = () => {
      emit('closeDialog');
    };

    function onRowClick(item: Combatant) {
      emit('selectRow', item.name);
      emit('closeDialog');
    }

    return {
      props,
      Icon,
      CharacterType,
      closeDialog,
      onRowClick
    };
  },
});
</script>

<style lang="scss">
.sticky-header-table {
  /* height or max-height is important */
  max-height: 80%;
}

.q-table__top,
.q-table__bottom,
thead tr:first-child th {
  /* bg color is important for th; just specify one */
  background-color: $dark;
}

thead tr th {
  position: sticky;
  z-index: 1;
}

thead tr:first-child th {
  top: 0;
}

tr {
  cursor: pointer;
}
</style>
