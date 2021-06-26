<template>
  <h4>{{ item.name }}</h4>
  <div>{{ item.description }}</div>
  <q-img :src="item.img"></q-img>
</template>

<script lang='ts'>
import { defineComponent, ref, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { RootState } from 'src/store/RootState';
import { App } from 'src/enums/app';
import { useMeta } from 'quasar';

import { useRoute } from 'vue-router'
import useItemService from 'src/hooks/useItemService';
import { Item } from 'src/models/items/Item';
import Utils from 'src/functions/Utils';

const metaData = {
  title: '',
  titleTemplate: (title: string) => `${title} - ${App.AppName}`,
  meta: {
    description: {
      name: '',
    },
  },
};

const baseState = (): Item => ({});

export default defineComponent({
  name: 'ItemDetails',
  components: {

  },
  setup() {
    const route = useRoute();
    const store = useStore<RootState>();
    const itemBsgId = route.params.id.toString();
    const { getItemByBsgId } = useItemService();
    const item = ref<Item>(baseState());

    onBeforeMount(async () => {
      if (itemBsgId) {
        item.value = await getItemByBsgId(itemBsgId);

        metaData.title = item.value.name;
        metaData.meta.description.name = item.value.description;
        useMeta(metaData);

        store.commit('layout/updateTitle', Utils.truncate(item.value.name, 25));
      }
    });
  
    return {
      item
    };
  },
});
</script>

<style lang='scss'>

</style>