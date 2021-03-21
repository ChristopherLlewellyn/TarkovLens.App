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
                v-if="!state.showArmorSelectionView"
                class="reset-button pointer all-pointer-events"
                style="margin-right: 30px"
                size="20px"
                round
                flat
                icon="mdi-cached"
                @click="resetCombatant()"
              />

              <body-part
                v-if="state.showDamageSimulatorView"
                class="head-button all-pointer-events"
                name="Head"
                :max-hp="state.selectedCombatant.healthStatus.head.maxHp"
                :current-hp="
                  state.selectedCombatant.healthStatus.head.currentHp
                "
                @click="boom(Hitbox.HeadEyes)"
              ></body-part>

              <body-part
                v-if="state.showDamageSimulatorView"
                class="thorax-button all-pointer-events"
                name="Thorax"
                :max-hp="state.selectedCombatant.healthStatus.thorax.maxHp"
                :current-hp="
                  state.selectedCombatant.healthStatus.thorax.currentHp
                "
                :equipped-armor="thoraxArmor"
                @click="boom(Hitbox.Thorax)"
              ></body-part>

              <body-part
                v-if="state.showDamageSimulatorView"
                class="stomach-button all-pointer-events"
                name="Stomach"
                :max-hp="state.selectedCombatant.healthStatus.stomach.maxHp"
                :current-hp="
                  state.selectedCombatant.healthStatus.stomach.currentHp
                "
                :equipped-armor="stomachArmor"
                @click="boom(Hitbox.Stomach)"
              ></body-part>

              <body-part
                v-if="state.showDamageSimulatorView"
                class="right-arm-button all-pointer-events"
                name="Right Arm"
                :max-hp="state.selectedCombatant.healthStatus.rightArm.maxHp"
                :current-hp="
                  state.selectedCombatant.healthStatus.rightArm.currentHp
                "
                :equipped-armor="rightArmArmor"
                @click="boom(Hitbox.RightArm)"
              ></body-part>

              <body-part
                v-if="state.showDamageSimulatorView"
                class="left-arm-button all-pointer-events"
                name="Left Arm"
                :max-hp="state.selectedCombatant.healthStatus.leftArm.maxHp"
                :current-hp="
                  state.selectedCombatant.healthStatus.leftArm.currentHp
                "
                :equipped-armor="leftArmArmor"
                @click="boom(Hitbox.LeftArm)"
              ></body-part>

              <body-part
                v-if="state.showDamageSimulatorView"
                class="right-leg-button all-pointer-events"
                name="Right Leg"
                :max-hp="state.selectedCombatant.healthStatus.rightLeg.maxHp"
                :current-hp="
                  state.selectedCombatant.healthStatus.rightLeg.currentHp
                "
                @click="boom(Hitbox.RightLeg)"
              ></body-part>

              <body-part
                v-if="state.showDamageSimulatorView"
                class="left-leg-button all-pointer-events"
                name="Left Leg"
                :max-hp="state.selectedCombatant.healthStatus.leftLeg.maxHp"
                :current-hp="
                  state.selectedCombatant.healthStatus.leftLeg.currentHp
                "
                @click="boom(Hitbox.LeftLeg)"
              ></body-part>

              <armor-equipment-slot
                v-if="state.showArmorSelectionView"
                class="body-armor all-pointer-events"
                :title="'Body Armor'"
                :equipped-armor="state.selectedCombatant.equipment.bodyArmor"
                @click="toggleShowBodyArmorDialog()"
              />

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
            class="row items-center"
            style="max-width: 700px; margin-left: auto; margin-right: auto"
          >
            <!-- Combatant Selector -->
            <div v-if="!state.showArmorSelectionView" class="q-ma-sm" style="margin-left: 30px">
              <q-btn round @click="toggleShowCombatants()">
                <q-avatar v-ripple.early color="dark" size="10vh">
                  <q-badge
                    v-if="state.selectedCombatant.id.length == 0"
                    rounded
                    floating
                    class="attention-pulse"
                    color="rgba(255, 0, 30, 0.7)"
                    >&nbsp;</q-badge
                  >
                  <img
                    v-if="state.selectedCombatant.id.length > 0"
                    :src="
                      state.selectedCombatant.id.length > 0
                        ? state.selectedCombatant.portrait
                        : ''
                    "
                  />
                  <template v-else>
                    <q-icon :name="Icon.Combatant" color="grey" />
                  </template>
                </q-avatar>
              </q-btn>
              <div class="text-center q-mt-xs" style="font-weight: bold">
                <span v-if="state.selectedCombatant.id.length > 0">{{
                  state.selectedCombatant.name
                }}</span>
                <span v-else class="greyed-text">Combatant</span>
              </div>
            </div>

            <!-- Ammo Selector -->
            <div v-if="!state.showArmorSelectionView" class="q-ma-sm">
              <q-btn round @click="toggleShowAmmunition()">
                <q-avatar v-ripple.early size="10vh" color="dark">
                  <q-badge
                    v-if="state.selectedAmmunition.id.length == 0"
                    rounded
                    floating
                    class="attention-pulse"
                    color="rgba(255, 0, 30, 0.7)"
                    >&nbsp;</q-badge
                  >
                  <img
                    v-if="state.selectedAmmunition.id.length > 0"
                    :src="
                      state.selectedAmmunition.id.length > 0
                        ? state.selectedAmmunition.blightbusterIcon
                        : ''
                    "
                    @error="$event.target.src = state.selectedAmmunition.img"
                  />
                  <template v-else>
                    <q-icon :name="Icon.Bullet" color="grey"></q-icon>
                  </template>
                  <q-badge
                    v-if="state.selectedAmmunition.id.length > 0"
                    floating
                    color="bullet"
                    rounded
                  >
                    <q-icon :name="Icon.Damage" size="2vh" />
                    <span>{{ state.selectedAmmunition.damage }}</span>
                  </q-badge>
                </q-avatar>
              </q-btn>
              <div class="text-center q-mt-xs" style="font-weight: bold">
                <span v-if="state.selectedAmmunition.id.length > 0">{{
                  state.selectedAmmunition.shortName
                }}</span>
                <span v-else class="greyed-text">Ammo</span>
              </div>
            </div>

            <!-- View Toggle (between armor selection and damage simulator) -->
            <div class="text-center q-ma-sm" :style="{ 'margin-left': state.showArmorSelectionView ? '30px' : '' }">
              <div>
                <q-btn round @click="toggleView()">
                  <q-avatar v-ripple.early size="10vh" color="dark">
                    <q-icon
                      :name="
                        state.showArmorSelectionView ? Icon.Back : Icon.Armor
                      "
                      size="5vh"
                      :color="state.showArmorSelectionView ? 'white' : 'armor'"
                    />
                  </q-avatar>
                </q-btn>
              </div>
              <div class="text-center q-mt-xs" style="font-weight: bold">
                <span class="">{{
                  state.showArmorSelectionView ? 'Back' : 'Armor'
                }}</span>
              </div>
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

      <armor-list-dialog
        :armors="armors.filter((x) => x.type === ArmorType.Body)"
        :show="state.showBodyArmorDialog"
        @closeDialog="toggleShowBodyArmorDialog"
        @selectRow="equipBodyArmor"
      />
    </q-page>
  </transition>
</template>

<script lang="ts">
import useCharacterService from 'src/hooks/useCharacterService';
import useItemService from 'src/hooks/useItemService';
import BodyPart from 'src/components/simulator/BodyPart.vue';
import {
  Combatant,
  Equipment,
  EquippedArmor,
} from 'src/models/characters/Combatant';
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
import ArmorListDialog from 'src/components/_shared/ArmorListDialog.vue';
import ArmorEquipmentSlot from 'src/components/simulator/ArmorEquipmentSlot.vue';
import { AmmunitionRow } from 'src/components/_models/AmmunitionRow';
import { Armor, ArmorType } from 'src/models/items/Armor';
import { ArmorRow } from 'src/components/_models/ArmorRow';

export default defineComponent({
  name: 'DamageSimulator',
  components: {
    BodyPart,
    AmmunitionListDialog,
    CombatantListDialog,
    ArmorListDialog,
    ArmorEquipmentSlot,
  },
  setup() {
    const store = useStore<RootState>();
    store.commit('layout/updateTitle', 'Damage Simulator');

    const { getCombatants, combatants } = useCharacterService();
    const {
      getAllAmmunitions,
      ammunitions,
      getAllArmors,
      armors,
    } = useItemService();

    onBeforeMount(async () => {
      await getCombatants();
      await getAllAmmunitions();
      await getAllArmors();
    });

    const state = reactive({
      selectedCombatant: new Combatant(),
      selectedAmmunition: new Ammunition(),
      showCombatantDialog: false,
      showAmmoDialog: false,
      showBodyArmorDialog: false,
      showDamageSimulatorView: true,
      showArmorSelectionView: false,
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

    function equipBodyArmor(row: ArmorRow) {
      const bodyArmor =
        armors.value.find((x) => x.id === row.id) ?? new Armor();
      state.selectedCombatant.equipment.bodyArmor = new EquippedArmor(
        bodyArmor.armor.durability,
        bodyArmor
      );
    }

    function resetCombatant() {
      state.selectedCombatant.reset();
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

    const thoraxArmor = computed<EquippedArmor>(() => {
      const armorIndex = state.selectedCombatant?.equipment?.bodyArmor?.armor?.zones.findIndex(
        (x) => x === Hitbox.Thorax
      );
      if (armorIndex > -1) {
        return state.selectedCombatant.equipment.bodyArmor;
      }
      return new EquippedArmor();
    });

    const stomachArmor = computed<EquippedArmor>(() => {
      const armorIndex = state.selectedCombatant?.equipment?.bodyArmor?.armor?.zones.findIndex(
        (x) => x === Hitbox.Stomach
      );
      if (armorIndex > -1) {
        return state.selectedCombatant.equipment.bodyArmor;
      }
      return new EquippedArmor();
    });

    const leftArmArmor = computed<EquippedArmor>(() => {
      const armorIndex = state.selectedCombatant?.equipment?.bodyArmor?.armor?.zones.findIndex(
        (x) => x === Hitbox.LeftArm
      );
      if (armorIndex > -1) {
        return state.selectedCombatant.equipment.bodyArmor;
      }
      return new EquippedArmor();
    });

    const rightArmArmor = computed<EquippedArmor>(() => {
      const armorIndex = state.selectedCombatant?.equipment?.bodyArmor?.armor?.zones.findIndex(
        (x) => x === Hitbox.RightArm
      );
      if (armorIndex > -1) {
        return state.selectedCombatant.equipment.bodyArmor;
      }
      return new EquippedArmor();
    });

    function toggleShowAmmunition() {
      state.showAmmoDialog = !state.showAmmoDialog;
    }

    function toggleShowCombatants() {
      state.showCombatantDialog = !state.showCombatantDialog;
    }

    function toggleView() {
      state.showArmorSelectionView = !state.showArmorSelectionView;
      state.showDamageSimulatorView = !state.showDamageSimulatorView;
    }

    function toggleShowBodyArmorDialog() {
      state.showBodyArmorDialog = !state.showBodyArmorDialog;
    }

    return {
      state,
      Hitbox,
      combatants,
      ammunitions,
      armors,
      selectCombatant,
      selectAmmunition,
      equipBodyArmor,
      resetCombatant,
      boom,
      rgb,
      Icon,
      ArmorType,
      toggleShowCombatants,
      toggleShowAmmunition,
      toggleShowBodyArmorDialog,
      toggleView,
      thoraxArmor,
      stomachArmor,
      leftArmArmor,
      rightArmArmor,
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

.body-armor {
  position: absolute;
  left: 35%;
  top: 18%;
}

.animate__pulse {
  --animate-repeat: 20;
}

.q-img__content > div {
  position: absolute;
  color: #fff;
  background: rgba(0, 0, 0, 0);
}
</style>
