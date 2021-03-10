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

export default defineComponent({
  name: 'PageIndex',
  components: { MenuCard },
  setup() {
    const links = [
      {
        id: 1,
        title: 'Penetration Chance Simulator',
        description: 'Visualise the % chance for any ammunition to penetrate any armor.',
        icon: Icon.Penetration,
        iconBackgroundColor: 'bullet',
        link: SimulatorRoutePath.PenetrationChance
      }
    ]
    const store = useStore<RootState>()
    store.commit('layout/updateTitle', 'Overview')

    return { links }
  }
})
</script>
