<template>
  <div>item kind: {{ kind }}</div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { RootState } from 'src/store/RootState';
import { App } from 'src/enums/app';
import { useMeta } from 'quasar';

import { useRoute } from 'vue-router'

const metaData = {
  title: '',
  titleTemplate: (title: string) => `${title} - ${App.AppName}`,
  meta: {
    description: {
      name: 'Search for any item in Escape from Tarkov.',
    },
  },
};

export default defineComponent({
  name: 'ItemKind',
  components: {

  },
  setup() {
    const route = useRoute();
    const kind = route.params.kind.toString();

    metaData.title = kind;
    useMeta(metaData);
    const store = useStore<RootState>();
    store.commit('layout/updateTitle', kind);    
  
    return {
      kind
    };
  },
});
</script>

<style lang='scss'>

</style>