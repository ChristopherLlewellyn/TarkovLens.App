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
          src="https://tarkov-gunsmith.com/img/logo1-transparent-thick.58d66466.svg"
        />

        <div 
          v-if="!miniState || $q.screen.lt.sm" 
          class="text-center q-mb-sm primary"
          style="font-size: 25px"
        >
            Tarkov Lens
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

      <div class="absolute" style="top: 15px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color="primary"
          :icon="chevronIcon"
          @click="toggleDrawer"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { RootState } from 'src/store/RootState'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { SimulatorRoutePath } from 'src/enums/route'
import { Icon } from 'src/enums/icon'

export default defineComponent({
  name: 'MainLayout',
  components: { },

  setup () {
    const $q = useQuasar()
    const store = useStore<RootState>()
    const showDrawer = ref(false)
    const chevronIcon = ref('chevron_left')
    const miniState = ref(false)
    const activeNav = ref(0)

    const navItems = [
      {
        id: 1,
        title: 'Home',
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
      }
    ]

    // example getter method (non-statically typed)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    //console.log(store.getters['layout/getTitle'])


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

      if (chevronIcon.value == 'chevron_right') {
        chevronIcon.value = 'chevron_left'
      } else {
        chevronIcon.value = 'chevron_right'
      }
    }

    return {
      store,
      showDrawer,
      toggleDrawer,
      chevronIcon,
      miniState,
      activeNav,
      navItems,
      setActiveNav
    }
  }
})
</script>
