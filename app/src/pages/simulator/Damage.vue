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
              <body-part-component
                class="head-button all-pointer-events"
                name="Head"
                :max-hp="state.selectedCombatant.healthStatus.head.maxHp"
                :current-hp="state.selectedCombatant.healthStatus.head.currentHp"
                @click="boom(Hitbox.HeadEyes)"
              ></body-part-component>

              <body-part-component
                class="thorax-button all-pointer-events"
                name="Thorax"
                :max-hp="state.selectedCombatant.healthStatus.thorax.maxHp"
                :current-hp="state.selectedCombatant.healthStatus.thorax.currentHp"
                @click="boom(Hitbox.Thorax)"
              ></body-part-component>

              <body-part-component
                class="stomach-button all-pointer-events"
                name="Stomach"
                :max-hp="state.selectedCombatant.healthStatus.stomach.maxHp"
                :current-hp="state.selectedCombatant.healthStatus.stomach.currentHp"
                @click="boom(Hitbox.Stomach)"
              ></body-part-component>

              <body-part-component
                class="right-arm-button all-pointer-events"
                name="Right Arm"
                :max-hp="state.selectedCombatant.healthStatus.rightArm.maxHp"
                :current-hp="state.selectedCombatant.healthStatus.rightArm.currentHp"
                @click="boom(Hitbox.RightArm)"
              ></body-part-component>

              <body-part-component
                class="left-arm-button all-pointer-events"
                name="Left Arm"
                :max-hp="state.selectedCombatant.healthStatus.leftArm.maxHp"
                :current-hp="state.selectedCombatant.healthStatus.leftArm.currentHp"
                @click="boom(Hitbox.LeftArm)"
              ></body-part-component>

              <body-part-component
                class="right-leg-button all-pointer-events"
                name="Right Leg"
                :max-hp="state.selectedCombatant.healthStatus.rightLeg.maxHp"
                :current-hp="state.selectedCombatant.healthStatus.rightLeg.currentHp"
                @click="boom(Hitbox.RightLeg)"
              ></body-part-component>

              <body-part-component
                class="left-leg-button all-pointer-events"
                name="Left Leg"
                :max-hp="state.selectedCombatant.healthStatus.leftLeg.maxHp"
                :current-hp="state.selectedCombatant.healthStatus.leftLeg.currentHp"
                @click="boom(Hitbox.LeftLeg)"
              ></body-part-component>
            </q-img>
          </div>
        </div>
        <div class="Controls">
          <q-btn class="center" color="primary" @click="select()">SELECT</q-btn>
        </div>
      </div>
    </q-page>
  </transition>
</template>

<script lang="ts">
import useCharacterService from 'src/hooks/useCharacterService';
import useItemService from 'src/hooks/useItemService';
import BodyPartComponent from 'src/components/simulator/BodyPart.vue';
import { Combatant, Equipment } from 'src/models/characters/Combatant';
import { Hitbox } from 'src/models/characters/Hitbox';
import { Ammunition } from 'src/models/items/Ammunition';
import { HealthStatus } from 'src/models/characters/HealthStatus';
import { defineComponent, onBeforeMount, reactive } from 'vue';
import { useStore } from 'vuex';
import { RootState } from 'src/store/RootState';

export default defineComponent({
  name: 'DamageSimulator',
  components: {
    BodyPartComponent
  },
  setup() {
    const store = useStore<RootState>();
    store.commit('layout/updateTitle', 'Damage Simulator');

    const { getCombatants, combatants } = useCharacterService();
    const { getAllAmmunitions, ammunitions } = useItemService();

    onBeforeMount(async () => {
      await getCombatants();
      await getAllAmmunitions();
    });

    const state = reactive({
      selectedCombatant: new Combatant(),
      selectedAmmunition: new Ammunition()
    })

    function select() {
      const selectedCombatant = combatants.value.find((x) => x.name === 'PMC') ?? new Combatant();
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

      state.selectedAmmunition =
        ammunitions.value.find((x) => x.shortName === 'SP-6') ??
        new Ammunition();
      console.log(state.selectedCombatant);
      console.log(state.selectedAmmunition);
    }

    function boom(hitbox: Hitbox) {
      console.log('BOOM');
      state.selectedCombatant.getHit(hitbox, state.selectedAmmunition);
      console.log(state.selectedCombatant);
      console.log(`new hp: ${state.selectedCombatant.healthStatus.currentHp()}`);
    }

    return {
      state,
      Hitbox,
      select,
      boom
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

.q-img__content > div {
  position: absolute;
  color: #fff;
  background: rgba(0, 0, 0, 0);
}
</style>
