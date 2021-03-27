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
import { SimulatorRoutePath } from 'src/enums/route'
import { RootState } from 'src/store/RootState'
import { Icon } from 'src/enums/icon'
import { App } from 'src/enums/app'
import { useMeta } from 'quasar'

const metaData = {
  title: App.AppName,
  meta: {
    description: { name: 'Helping players understand Escape from Tarkov, with damage and penetration simulators.' }
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
        description: 'Visualize the % chance for different ammunitions to penetrate armor with any amount of remaining durability.',
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
      }
    ]
    const store = useStore<RootState>()
    store.commit('layout/updateTitle', 'Overview')

    return { links }
  }
})
</script>
