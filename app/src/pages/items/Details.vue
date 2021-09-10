<template>
  <transition appear enter-active-class="animated fadeIn">
    <q-page key="page" padding>
      <item-card v-if="item?.id?.length > 0" :item="item" :wide="true"></item-card>
      <loading-spinner v-else size="6rem"></loading-spinner>
    </q-page>
  </transition>
</template>

<script lang='ts'>
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { defineComponent, ref, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { RootState } from 'src/store/RootState';
import { App } from 'src/enums/app';
import { useMeta } from 'quasar';

import { useRoute } from 'vue-router'
import useItemService from 'src/hooks/useItemService';
import Utils from 'src/functions/Utils';
import { Kind } from 'src/models/items/_shared';
import { Ammunition } from 'src/models/items/Ammunition';
import { Armor } from 'src/models/items/Armor';
import { Backpack } from 'src/models/items/Backpack';
import { BaseItem } from 'src/models/items/BaseItem';
import { Clothing } from 'src/models/items/Clothing';
import { Container } from 'src/models/items/Container';
import { Firearm } from 'src/models/items/Firearm';
import { Grenade } from 'src/models/items/Grenade';
import { Key } from 'src/models/items/Key';
import { Magazine } from 'src/models/items/Magazine';
import { Medical } from 'src/models/items/Medical';
import { Melee } from 'src/models/items/Melee';
import { BaseModification } from 'src/models/items/BaseModification';
import { ModificationMuzzle } from 'src/models/items/ModificationMuzzle';
import { ModificationReceiver } from 'src/models/items/ModificationReceiver';
import { ModificationStock } from 'src/models/items/ModificationStock';
import { ModificationSight } from 'src/models/items/ModificationSight';
import { Tacticalrig } from 'src/models/items/Tacticalrig';

import ItemCard from 'src/components/_shared/ItemCard.vue';
import LoadingSpinner from 'src/components/_shared/LoadingSpinner.vue';

const metaData = {
  title: '',
  titleTemplate: (title: string) => `${title} - ${App.AppName}`,
  meta: {
    description: {
      name: '',
    },
  },
};

export default defineComponent({
  name: 'ItemDetails',
  components: {
    ItemCard,
    LoadingSpinner
  },
  setup() {
    const route = useRoute();
    const store = useStore<RootState>();
    const itemBsgId = route.params.id.toString();
    const itemKind = route.params.kind.toString();
    const { getItemByBsgId } = useItemService();

    // I've use 'any' type on this page because idk how to statically type all this stuff practically
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let item: any = ref({name: '', description: ''});

    onBeforeMount(async () => {
      if (itemBsgId && itemKind) {
        item.value = await getItem(itemBsgId, itemKind);

        metaData.title = item.value.name;
        metaData.meta.description.name = item.value.description;
        useMeta(metaData);

        store.commit('layout/updateTitle', Utils.truncate(item.value.name, 25));
      }
    });

    async function getItem(bsgId: string, kind: string) {
      switch (kind) {
        case Kind.Ammunition || Kind.Ammunition.toLowerCase():
          return await getItemByBsgId<Ammunition>(bsgId);

        case Kind.Armor || Kind.Armor.toLowerCase():
          return await getItemByBsgId<Armor>(bsgId);

        case Kind.Backpack || Kind.Backpack.toLowerCase():
          return await getItemByBsgId<Backpack>(bsgId);

        case Kind.Barter || Kind.Barter.toLowerCase():
          return await getItemByBsgId<BaseItem>(bsgId);

        case Kind.Clothing || Kind.Clothing.toLowerCase():
          return await getItemByBsgId<Clothing>(bsgId);

        case Kind.Common || Kind.Common.toLowerCase():
          return await getItemByBsgId<BaseItem>(bsgId);

        case Kind.Container || Kind.Container.toLowerCase():
          return await getItemByBsgId<Container>(bsgId);

        case Kind.Firearm || Kind.Firearm.toLowerCase():
          return await getItemByBsgId<Firearm>(bsgId);

        case Kind.Food || Kind.Food.toLowerCase():
          return await getItemByBsgId<BaseItem>(bsgId);

        case Kind.Grenade || Kind.Grenade.toLowerCase():
          return await getItemByBsgId<Grenade>(bsgId);

        case Kind.Headphone || Kind.Headphone.toLowerCase():
          return await getItemByBsgId<BaseItem>(bsgId);

        case Kind.Key || Kind.Key.toLowerCase():
          return await getItemByBsgId<Key>(bsgId);

        case Kind.Magazine || Kind.Magazine.toLowerCase():
          return await getItemByBsgId<Magazine>(bsgId);

        case Kind.Map || Kind.Map.toLowerCase():
          return await getItemByBsgId<BaseItem>(bsgId);

        case Kind.Medical || Kind.Medical.toLowerCase():
          return await getItemByBsgId<Medical>(bsgId);
          
        case Kind.Melee || Kind.Melee.toLowerCase():
          return await getItemByBsgId<Melee>(bsgId);

        case Kind.Modification || Kind.Modification.toLowerCase()
          || Kind.ModificationBipod || Kind.ModificationBipod.toLowerCase()
          || Kind.ModificationCharge || Kind.ModificationCharge.toLowerCase()
          || Kind.ModificationDevice || Kind.ModificationDevice.toLowerCase()
          || Kind.ModificationForegrip || Kind.ModificationForegrip.toLowerCase()
          || Kind.ModificationGasblock || Kind.ModificationGasblock.toLowerCase()
          || Kind.ModificationGoggles || Kind.ModificationGoggles.toLowerCase()
          || Kind.ModificationHandguard || Kind.ModificationHandguard.toLowerCase()
          || Kind.ModificationLauncher || Kind.ModificationLauncher.toLowerCase()
          || Kind.ModificationMount || Kind.ModificationMount.toLowerCase()
          || Kind.ModificationPistolgrip || Kind.ModificationPistolgrip.toLowerCase():
          return await getItemByBsgId<BaseModification>(bsgId);

        case Kind.ModificationMuzzle || Kind.ModificationMuzzle.toLowerCase():
          return await getItemByBsgId<ModificationMuzzle>(bsgId);

        case Kind.ModificationReceiver || Kind.ModificationReceiver.toLowerCase():
          return await getItemByBsgId<ModificationReceiver>(bsgId);

        case Kind.ModificationSight || Kind.ModificationSight.toLowerCase()
          || Kind.ModificationSightSpecial || Kind.ModificationSightSpecial.toLowerCase():
          return await getItemByBsgId<ModificationSight>(bsgId);

        case Kind.ModificationStock || Kind.ModificationStock.toLowerCase():
          return await getItemByBsgId<ModificationStock>(bsgId);

        case Kind.Money || Kind.Money.toLowerCase():
          return await getItemByBsgId<BaseItem>(bsgId);

        case Kind.Tacticalrig || Kind.Tacticalrig.toLowerCase():
          return await getItemByBsgId<Tacticalrig>(bsgId);

        default:
          return await getItemByBsgId<BaseItem>(bsgId);
      }
    }
  
    return {
      item
    };
  },
});
</script>

<style lang='scss'>

</style>