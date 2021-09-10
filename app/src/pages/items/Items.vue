<template>
  <transition appear enter-active-class="animated fadeIn">
    <q-page key="page" padding>
      <div class="row center medium-width">
        <div class="q-mt-md">
          <item-search-select
            :navigate-on-select="true"
          ></item-search-select>
        </div>
      </div>
    </q-page>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { RootState } from 'src/store/RootState';
import { App } from 'src/enums/app';
import { useMeta } from 'quasar';
import ItemSearchSelect from 'src/components/_shared/ItemSearchSelect.vue';

const metaData = {
  title: 'Items',
  titleTemplate: (title: string) => `${title} - ${App.AppName}`,
  meta: {
    description: {
      name: 'Search for any item in Escape from Tarkov.',
    },
  },
};

export default defineComponent({
  name: 'Items',
  components: {
    ItemSearchSelect,
    //ItemCard
  },
  setup() {
    useMeta(metaData);
    const store = useStore<RootState>();
    store.commit('layout/updateTitle', 'Items');
  
    return {
      
    };
  },
});
</script>

<style scoped lang="scss">

</style>