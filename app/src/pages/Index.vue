<template>
  <transition appear enter-active-class="animated fadeIn">
    <q-page key="page" padding>
      <menu-card 
        v-for="link in links" :key="link.id"
        class="center" 
        :title="link.title"
        :description="link.description"
        :icon="link.icon"
        :icon-background-color="link.iconBackgroundColor"
        :link="link.link"
      />  
    </q-page>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import MenuCard from 'src/components/_shared/MenuCard.vue'
import { SimulatorRoutePath, CalculatorRoutePath } from 'src/enums/route'
import { RootState } from 'src/store/RootState'
import { Icon } from 'src/enums/icon'
import { App } from 'src/enums/app'
import { useMeta } from 'quasar'

const metaData = {
  title: App.AppName,
  meta: {
    description: { name: 'Helping players understand Escape from Tarkov by providing various damage simulators and calculators.' }
  }
}

export default defineComponent({
  name: 'PageIndex',
  components: { MenuCard },
  setup() {
    useMeta(metaData)

    const links = [
      {
        id: 1,
        title: 'Penetration Chance Simulator',
        description: 'Visualize the % chance for different ammunition to penetrate armor with varying levels of durability.',
        icon: Icon.Penetration,
        iconBackgroundColor: 'bullet',
        link: SimulatorRoutePath.PenetrationChance
      },
      {
        id: 2,
        title: 'Damage Simulator',
        description: "Understand how Tarkov's damage model works. Visualize how much damage different characters can take, both with and without armor.",
        icon: Icon.Damage,
        iconBackgroundColor: 'bullet',
        link: SimulatorRoutePath.Damage
      },
      {
        id: 3,
        title: 'Currency Converter',
        description: 'Convert the various currencies used in Tarkov.',
        icon: Icon.Bank,
        iconBackgroundColor: 'money',
        link: CalculatorRoutePath.CurrencyConvert
      },
      {
        id: 4,
        title: 'Market Fee Calculator',
        description: 'Calculate the market fee for listing an item on the flea market.',
        icon: Icon.MoneyRubles,
        iconBackgroundColor: 'money',
        link: CalculatorRoutePath.MarketFeeCalculator
      }
    ]
    const store = useStore<RootState>()
    store.commit('layout/updateTitle', 'Overview')

    return { links }
  }
})
</script>
