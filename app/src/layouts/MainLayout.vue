<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar class="bg-dark" :class="!$q.screen.lt.sm ? 'text-center' : ''">
        <q-btn
          v-if="$q.screen.lt.sm"
          flat
          round
          icon="mdi-menu"
          aria-label="Menu"
          @click="toggleDrawer"
        />

        <q-toolbar-title class="text-primary">
          {{ store.state.layout.title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="showDrawer"
      show-if-above
      :mini="miniState"
      :mini-width="80"
      :width="250"
      :breakpoint="500"
      bordered
    >
      <q-list padding>
        <q-img
          class="q-mb-sm"
          style="max-height: 150px"
          fit="contain" 
          src="tarkovlens-large.png"
        />

        <div 
          v-if="!miniState || $q.screen.lt.sm" 
          class="text-center q-mb-sm primary"
          style="font-size: 25px"
        >
            {{ App.AppName }}
        </div>

        <q-separator></q-separator>

        <q-item 
          v-for="nav in navItems"
          :key="nav.id"
          v-ripple 
          clickable
          class="primary"
          :active="activeNav === nav.id"
          :active-class="nav.activeClass"
          :to="nav.link"
          @click="setActiveNav(nav.id)"
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>

          <q-item-section>
            {{ nav.title }}
          </q-item-section>
        </q-item>
      </q-list>

      <div class="external-links">
        <div class="q-mb-md">
          <a href="https://discord.gg/eKqdgcSZdz" target="__blank">
            <q-img
              fit="contain"
              width="70%"
              class="center external-link-image"
              src="join-discord.png"
            />
          </a>
        </div>

        <div>
          <a href="https://www.patreon.com/chrisllewellyn?fan_landing=true" target="__blank">
            <q-img
              fit="contain"
              width="70%"
              class="center external-link-image"
              src="https://c5.patreon.com/external/logo/become_a_patron_button.png"
            />
          </a>
        </div>
      </div>

      <div class="absolute" style="top: 15px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color="primary"
          icon="chevron_right"
          @click="toggleDrawer"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view 
        v-touch-swipe.mouse.right="handleSwipeRight" 
      />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { RootState } from 'src/store/RootState'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { CalculatorRoutePath, SimulatorRoutePath } from 'src/enums/route'
import { Icon } from 'src/enums/icon'
import { App } from 'src/enums/app'
import QSwipeEvent from 'src/models/_quasar/QSwipeEvent'

export default defineComponent({
  name: 'MainLayout',
  components: { },

  setup () {
    const $q = useQuasar()
    const store = useStore<RootState>()
    const showDrawer = ref(false)
    const miniState = ref(false)
    const activeNav = ref(0)

    const navItems = [
      {
        id: 1,
        title: 'Overview',
        icon: 'mdi-home',
        activeClass: 'white',
        link: '/'
      },
      {
        id: 2,
        title: 'Pen Chance',
        icon: Icon.Penetration,
        activeClass: 'white',
        link: SimulatorRoutePath.PenetrationChance
      },
      {
        id: 3,
        title: 'Damage Simulator',
        icon: Icon.Damage,
        activeClass: 'white',
        link: SimulatorRoutePath.Damage
      },
      {
        id: 4,
        title: 'Currency Converter',
        icon: Icon.MoneyRubles,
        activeClass: 'white',
        link: CalculatorRoutePath.CurrencyConvert
      },
      {
        id: 5,
        title: 'Market Fee',
        icon: Icon.Fee,
        activeClass: 'white',
        link: CalculatorRoutePath.MarketFeeCalculator
      }
    ]

    function setActiveNav (navId: number) {
      activeNav.value = navId
    }

    function toggleDrawer () {
      if ($q.screen.lt.sm) {
        showDrawer.value = !showDrawer.value
      }
      else {
        miniState.value = !miniState.value
      }
    }

    function handleSwipeRight (qSwipeEvent: QSwipeEvent) {
      if (qSwipeEvent.touch && qSwipeEvent.distance.x > 9) {
        showDrawer.value = true
      }
    }

    return {
      store,
      App,
      showDrawer,
      handleSwipeRight,
      toggleDrawer,
      miniState,
      activeNav,
      navItems,
      setActiveNav
    }
  }
})
</script>

<style scoped>
.external-links {
  margin-top: 5vh;
}

.external-link-image {
  max-height: 45px;
}
</style>