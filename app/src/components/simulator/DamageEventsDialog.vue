<template>
  <q-dialog
    v-model="props.show"
    persistent
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
          <span style="font-size: 19px">Damage Logs</span>
        </template>

        <template v-else>
          <span style="font-size: 19px">Damage Logs</span>
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
        <template v-if="damageEvents.length > 0">
          <q-item
            v-for="(event, index) in props.damageEvents"
            :key="index"
            class="q-pt-md q-pb-md"
          >
            <q-item-section>
              <q-item-label overline>
                <span>Shot {{ index + 1 }} ({{ event.readableHitbox }})</span>
                (<span class="text-bullet">{{ event.damageSourceName }}</span
                >)
              </q-item-label>

              <q-item-label caption>
                <span
                  >{{ event.chanceToPenetrate.toFixed(1) }}% chance to
                  penetrate</span
                >
              </q-item-label>

              <q-item-label
                v-for="(log, logIndex) in event.damageLogs"
                :key="logIndex"
                caption
              >
                <span class="greyed-text">{{ log }}</span>
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="q-ma-xs">
                <span class="q-mr-xs">
                  <q-icon
                    :name="Icon.Health"
                    color="health-green"
                    size="20px"
                  />
                </span>
                <span
                  class="health-green"
                  style="font-weight: bold; font-size: 16px"
                  >{{ event.remainingHp.toFixed(0) }}</span
                >
              </div>

              <q-badge
                v-if="event.killShot === true"
                color="boss"
                class="q-ma-xs"
              >
                <q-icon :name="Icon.Death" class="q-mr-xs" />
                Kill
              </q-badge>

              <q-badge
                v-if="event.penetrated === true"
                color="bullet"
                class="q-ma-xs"
              >
                Penetrated
              </q-badge>

              <q-badge
                v-if="event.penetrated === false"
                color="armor"
                class="q-ma-xs"
              >
                <q-icon :name="Icon.Armor" class="q-mr-xs" />
                Blocked
              </q-badge>
            </q-item-section>
          </q-item>
        </template>

        <template v-else>
          <q-item class="q-pt-md q-pb-md">
            <q-item-section class="greyed-text text-center"
              >Nothing here yet... Start shooting!</q-item-section
            >
          </q-item>
        </template>
      </q-list>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Icon } from 'src/enums/icon';
import { CombatantDamageEvent } from 'src/models/characters/Combatant';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'DamageEventsDialog',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    damageEvents: {
      type: Array as PropType<CombatantDamageEvent[]>,
      required: true,
    },
  },
  emits: ['closeDialog'],
  setup(props, { emit }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const $q = useQuasar();

    const closeDialog = () => {
      emit('closeDialog');
    };

    return {
      props,
      Icon,
      closeDialog,
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
</style>
