<template>
  <transition appear enter-active-class="animated fadeIn">
    <q-page key="page">
      <div class="grid-container full-width">
        <div class="Top">
          <div>
            <q-img
              fit="scale-down"
              src="skeleton.png"
              class="center q-mt-md"
              style="max-height: 80vh; max-width: 500px"
            >
              <q-btn
                class="reset-button pointer all-pointer-events"
                style="margin-right: 30px"
                size="20px"
                round
                flat
                icon="mdi-cached"
                @click="resetCombatant()"
              />

              <body-part
                class="head-button all-pointer-events"
                name="Head"
                :max-hp="state.selectedCombatant.healthStatus.head.maxHp"
                :current-hp="
                  state.selectedCombatant.healthStatus.head.currentHp
                "
                @click="boom(Hitbox.HeadEyes)"
              ></body-part>

              <body-part
                class="thorax-button all-pointer-events"
                name="Thorax"
                :max-hp="state.selectedCombatant.healthStatus.thorax.maxHp"
                :current-hp="
                  state.selectedCombatant.healthStatus.thorax.currentHp
                "
                @click="boom(Hitbox.Thorax)"
              ></body-part>

              <body-part
                class="stomach-button all-pointer-events"
                name="Stomach"
                :max-hp="state.selectedCombatant.healthStatus.stomach.maxHp"
                :current-hp="
                  state.selectedCombatant.healthStatus.stomach.currentHp
                "
                @click="boom(Hitbox.Stomach)"
              ></body-part>

              <body-part
                class="right-arm-button all-pointer-events"
                name="Right Arm"
                :max-hp="state.selectedCombatant.healthStatus.rightArm.maxHp"
                :current-hp="
                  state.selectedCombatant.healthStatus.rightArm.currentHp
                "
                @click="boom(Hitbox.RightArm)"
              ></body-part>

              <body-part
                class="left-arm-button all-pointer-events"
                name="Left Arm"
                :max-hp="state.selectedCombatant.healthStatus.leftArm.maxHp"
                :current-hp="
                  state.selectedCombatant.healthStatus.leftArm.currentHp
                "
                @click="boom(Hitbox.LeftArm)"
              ></body-part>

              <body-part
                class="right-leg-button all-pointer-events"
                name="Right Leg"
                :max-hp="state.selectedCombatant.healthStatus.rightLeg.maxHp"
                :current-hp="
                  state.selectedCombatant.healthStatus.rightLeg.currentHp
                "
                @click="boom(Hitbox.RightLeg)"
              ></body-part>

              <body-part
                class="left-leg-button all-pointer-events"
                name="Left Leg"
                :max-hp="state.selectedCombatant.healthStatus.leftLeg.maxHp"
                :current-hp="
                  state.selectedCombatant.healthStatus.leftLeg.currentHp
                "
                @click="boom(Hitbox.LeftLeg)"
              ></body-part>

              <div class="health-display full-width text-center">
                <q-avatar>
                  <img
                    src="hp-icon.png"
                    style="max-height: 40px; height: 5vh; object-fit: contain"
                  />
                </q-avatar>
                <span
                  :style="{
                    color: `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`,
                  }"
                >
                  {{
                    state.selectedCombatant.healthStatus.currentHp.toFixed(0)
                  }}
                </span>
                <span class="small">
                  / {{ state.selectedCombatant.healthStatus.maxHp }}</span
                >
              </div>
            </q-img>
          </div>
        </div>
        <div class="Controls full-width">
          <div
            class="row"
            style="
              max-width: 700px;
              margin-left: auto;
              margin-right: auto;
              align-items: center;
            "
          >
            <div class="q-ma-sm" style="margin-left: 30px">
              <q-btn round @click="toggleShowCombatants()">
                <q-avatar size="70px">
                  <img :src="state.selectedCombatant.portrait" />
                </q-avatar>
              </q-btn>
              <q-card class="text-center q-mt-xs" style="font-weight: bold">
                {{ state.selectedCombatant.name }}
              </q-card>
            </div>

            <div class="q-ma-sm">
              <q-btn round @click="toggleShowAmmunition()">
                <q-avatar size="70px" color="dark">
                  <img
                    v-if="state.selectedAmmunition.id.length > 0"
                    :src="
                      state.selectedAmmunition.id.length > 0
                        ? state.selectedAmmunition.blightbusterIcon
                        : ''
                    "
                    class="q-pa-sm"
                    @error="$event.target.src = state.selectedAmmunition.img"
                  />
                  <template v-else>
                    <q-icon :name="Icon.Bullet" color="bullet"></q-icon>
                  </template>
                  <q-badge
                    v-if="state.selectedAmmunition.id.length > 0"
                    floating
                    color="bullet"
                    rounded
                  >
                    <q-icon :name="Icon.Damage" size="15px" />
                    <span>{{ state.selectedAmmunition.damage }}</span>
                  </q-badge>
                </q-avatar>
              </q-btn>
              <q-card class="text-center q-mt-xs" style="font-weight: bold">
                <span v-if="state.selectedAmmunition.id.length > 0">{{
                  state.selectedAmmunition.shortName
                }}</span>
                <span v-else class="greyed-text">Ammo</span>
              </q-card>
            </div>
          </div>
        </div>
      </div>

      <combatant-list-dialog
        :combatants="combatants"
        :show="state.showCombatantDialog"
        @closeDialog="toggleShowCombatants"
        @selectRow="selectCombatant"
      />

      <ammunition-list-dialog
        :ammunitions="ammunitions"
        :show="state.showAmmoDialog"
        @closeDialog="toggleShowAmmunition"
        @selectRow="selectAmmunition"
      />
    </q-page>
  </transition>
</template>

<script lang="ts">
import useCharacterService from 'src/hooks/useCharacterService';
import useItemService from 'src/hooks/useItemService';
import BodyPart from 'src/components/simulator/BodyPart.vue';
import { Combatant, Equipment } from 'src/models/characters/Combatant';
import { Hitbox } from 'src/models/characters/Hitbox';
import { Ammunition } from 'src/models/items/Ammunition';
import { HealthStatus } from 'src/models/characters/HealthStatus';
import { defineComponent, onBeforeMount, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { RootState } from 'src/store/RootState';
import Utils, { RGB } from 'src/functions/Utils';
import { Icon } from 'src/enums/icon';
import AmmunitionListDialog from 'src/components/_shared/AmmunitionListDialog.vue';
import CombatantListDialog from 'src/components/_shared/CombatantListDialog.vue';
import { AmmunitionRow } from 'src/components/_models/AmmunitionRow';

export default defineComponent({
  name: 'DamageSimulator',
  components: {
    BodyPart,
    AmmunitionListDialog,
    CombatantListDialog
  },
  setup() {
    const store = useStore<RootState>();
    store.commit('layout/updateTitle', 'Damage Simulator');

    const { getCombatants, combatants } = useCharacterService();
    const { getAllAmmunitions, ammunitions } = useItemService();

    onBeforeMount(async () => {
      await getCombatants();
      await getAllAmmunitions();
      selectCombatant('PMC');
    });

    const state = reactive({
      selectedCombatant: new Combatant(),
      selectedAmmunition: new Ammunition(),
      showCombatantDialog: false,
      showAmmoDialog: false,
    });

    function selectCombatant(name: string) {
      const selectedCombatant =
        combatants.value.find((x) => x.name === name) ?? new Combatant();
      state.selectedCombatant = new Combatant(
        selectedCombatant.id,
        selectedCombatant.type,
        selectedCombatant.name,
        selectedCombatant.nickname,
        selectedCombatant.description,
        selectedCombatant.portrait,
        selectedCombatant.location,
        // Got to do this massive constructor with spread operators so that we don't pass a reference,
        // but instead create a new instance of each healthStatus
        new HealthStatus(
          selectedCombatant.healthStatus.maxHp,
          { ...selectedCombatant.healthStatus.head },
          { ...selectedCombatant.healthStatus.thorax },
          { ...selectedCombatant.healthStatus.stomach },
          { ...selectedCombatant.healthStatus.leftArm },
          { ...selectedCombatant.healthStatus.rightArm },
          { ...selectedCombatant.healthStatus.leftLeg },
          { ...selectedCombatant.healthStatus.rightLeg }
        ),
        new Equipment(),
        true
      );
    }

    function selectAmmunition(row: AmmunitionRow) {
      state.selectedAmmunition =
        ammunitions.value.find((x) => x.id === row.id) ?? new Ammunition();
    }

    function resetCombatant() {
      selectCombatant(state.selectedCombatant.name);
    }

    function boom(hitbox: Hitbox) {
      state.selectedCombatant.getHit(hitbox, state.selectedAmmunition);
    }

    const rgb = computed<RGB>(() => {
      const percentage =
        (state.selectedCombatant.healthStatus.currentHp /
          state.selectedCombatant.healthStatus.maxHp) *
        100;
      return Utils.percentageToRGB(percentage, 220, 100);
    });

    function toggleShowAmmunition() {
      state.showAmmoDialog = !state.showAmmoDialog;
    }

    function toggleShowCombatants() {
      state.showCombatantDialog = !state.showCombatantDialog;
    }

    return {
      state,
      Hitbox,
      combatants,
      ammunitions,
      selectCombatant,
      selectAmmunition,
      resetCombatant,
      boom,
      rgb,
      Icon,
      toggleShowCombatants,
      toggleShowAmmunition
    };
  },
});
</script>

<style scoped lang="scss">
.grid-container {
  display: grid;
  height: 90vh;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1.3fr 0.7fr;
  gap: 0px 0px;
  grid-template-areas:
    'Top Top Top Top'
    'Top Top Top Top'
    'Controls Controls Controls Controls';
}
.Top {
  grid-area: Top;
}
.Controls {
  grid-area: Controls;
}

.head-button {
  position: absolute;
  left: 60%;
}

.thorax-button {
  position: absolute;
  left: 45%;
  top: 18%;
}

.stomach-button {
  position: absolute;
  left: 39%;
  top: 35%;
}

.right-arm-button {
  position: absolute;
  left: 10%;
  top: 30%;
}

.left-arm-button {
  position: absolute;
  right: 5%;
  top: 30%;
}

.right-leg-button {
  position: absolute;
  left: 20%;
  top: 60%;
}

.left-leg-button {
  position: absolute;
  right: 20%;
  top: 60%;
}

.reset-button {
  position: absolute;
  left: 9%;
  top: 2%;
}

.health-display {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  top: 70%;

  span {
    font-size: 4vh;
    font-weight: bold;
    vertical-align: middle;
  }
  .small {
    font-size: 2.5vh;
  }
}

.q-img__content > div {
  position: absolute;
  color: #fff;
  background: rgba(0, 0, 0, 0);
}
</style>
