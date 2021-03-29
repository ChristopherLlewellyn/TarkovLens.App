<template>
  <q-dialog
    v-model="props.show"
    :maximized="$q.screen.lt.sm ? true : false"
    :transition-show="$q.screen.lt.sm ? 'slide-up' : ''"
    :transition-hide="$q.screen.lt.sm ? 'slide-down' : ''"
  >
    <q-card>
      <q-toolbar class="bg-dark toolbar">
        <template v-if="$q.screen.lt.sm ? true : false">
          <q-btn
            dense
            flat
            round
            :icon="Icon.Back"
            class="q-mr-sm"
            @click="closeDialog()"
          >
            <q-tooltip>Back</q-tooltip>
          </q-btn>
          <span style="font-size: 19px">Select Combatant</span>
        </template>

        <template v-else>
          <span style="font-size: 19px">Select Combatant</span>
          <q-space />
          <q-btn
            dense
            flat
            round
            class="q-ml-sm"
            :icon="Icon.Close"
            @click="closeDialog()"
          />
        </template>
      </q-toolbar>

      <q-list bordered separator>
        <q-item
          v-for="combatant in combatants"
          :key="combatant.id"
          v-ripple
          clickable
          class="q-pt-md q-pb-md text-center justify-center"
          @click="onRowClick(combatant)"
        >
          <q-item-section avatar style="max-width: 250px">
            <q-intersection
              once
              transition="scale"
              class="avatar-intersection"
            >
              <q-avatar color="dark" text-color="white" size="9vh">
                <img
                  v-if="combatant.portrait.length > 0"
                  :src="combatant.portrait"
                />
                <span v-else>{{ combatant.name.charAt(0) }}</span>
              </q-avatar>
            </q-intersection>
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
import { useQuasar } from 'quasar';

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const $q = useQuasar();

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
      onRowClick,
    };
  },
});
</script>

<style lang="scss">
.toolbar {
  position: sticky;
  z-index: 1;
  top: 0;
}

.avatar-intersection {
  height: 9vh;
  width: 9vh;
}
</style>
