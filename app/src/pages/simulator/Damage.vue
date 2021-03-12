<template>
  <transition appear enter-active-class="animated fadeIn">
    <q-page key="page">
      <pre>{{ combatant }}</pre>
      <div>
        <q-btn @click="select()">SELECT</q-btn>
      </div>
      <q-btn @click="boom(Hitbox.HeadEyes)">BOOM HEAD</q-btn>
      <q-btn @click="boom(Hitbox.RightArm)">BOOM RIGHT ARM</q-btn>
      <q-btn @click="boom(Hitbox.LeftArm)">BOOM LEFT ARM</q-btn>
    </q-page>
  </transition>
</template>

<script lang="ts">
import useCharacterService from 'src/hooks/useCharacterService'
import useItemService from 'src/hooks/useItemService'
import { Combatant } from 'src/models/characters/Combatant'
import { Hitbox } from 'src/models/characters/Hitbox'
import { Ammunition } from 'src/models/items/Ammunition'
import { defineComponent, onBeforeMount } from 'vue'

export default defineComponent({
  name: 'DamageSimulator',
  setup () {
    const {
      getCombatants,
      combatants
    } = useCharacterService()
    const {
      getAllAmmunitions,
      ammunitions
    } = useItemService()

    onBeforeMount(async () => {
      await getCombatants()
      await getAllAmmunitions()
    })
    
    let combatant = new Combatant()
    let ammunition = new Ammunition()

    function select () {
      let tempCombatant = combatants.value.find(x => x.name === 'PMC') ?? new Combatant()
      combatant = new Combatant(
        tempCombatant.id,
        tempCombatant.type,
        tempCombatant.name,
        tempCombatant.nickname,
        tempCombatant.description,
        tempCombatant.portrait,
        tempCombatant.location,
        tempCombatant.healthStatus,
        tempCombatant.equipment,
        true
      )

      ammunition = ammunitions.value.find(x => x.shortName === 'SP-6') ?? new Ammunition()
      console.log(combatant)
      console.log(ammunition)
    }

    function boom (hitbox: Hitbox) {
      console.log('BOOM')
      combatant.getHit(hitbox, ammunition)
      console.log(combatant)
      console.log(`new hp: ${combatant.healthStatus.currentHp()}`)
    }

    return { Hitbox, combatant, select, boom }
  }
})
</script>

<style scoped lang="scss">

</style>
