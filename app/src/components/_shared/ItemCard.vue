<template>
  <q-card class="margin center" :class="{ 'item-card-width-wide': wide, 'item-card-width-regular': !wide }" flat>
    <q-card-section :horizontal="!q.screen.lt.sm">
      <q-card-section class="col-3 flex flex-center">
        <q-intersection once transition="scale" class="avatar-intersection">
          <q-avatar class="center" :size="wide || q.screen.lt.sm ? '140px' : '70px'" rounded>
            <img
              style="object-fit: contain"
              :src="item.blightbusterIcon"
              @error="$event.target.src = item.img"
            />
          </q-avatar>
        </q-intersection>
      </q-card-section>
      
      <q-card-section class="q-pt-xs">
        <div class="text-overline">{{ item.name }}</div>
        <div class="text-caption text-grey">
          {{ item.description }}
        </div>
        <q-separator class="q-mt-sm" />
        <div class="item-info">
          <div class="row">
            <div class="col text-left">
              <span class="greyed-text">Type</span>
            </div>
            <div class="col text-right">
              <div class="greyed-text">
                <span>{{ Utils.humanizeItemKind(item._kind) }}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col text-left">
              <span class="greyed-text">Market Price</span>
            </div>
            <div class="col text-right">
              <div class="money">
                <q-icon :name="Icon.MoneyRubles" />
                <span>
                  {{ item.avg24hPrice ? Utils.numberWithCommas(item.avg24hPrice) : '?' }}
                </span>
              </div>
            </div>
          </div>
          <div v-if="!item.price" class="row">
            <div class="col text-right text-red">
              <span>Not tradeable</span>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Item } from 'src/models/items/Item';
import Utils from 'src/functions/Utils';
import { Icon } from 'src/enums/icon';
import { useQuasar } from 'quasar'
import { BaseItem } from 'src/models/items/BaseItem';
import { Armor } from 'src/models/items/Armor';
import { BaseModification } from 'src/models/items/BaseModification';

interface AnyItem extends Item, Armor, BaseModification {

}

export default defineComponent({
  name: 'ItemCard',
  props: {
    item: {
      type: Object as PropType<AnyItem>,
      required: true,
    },
    wide: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup() {
    const q = useQuasar();
    return {
      Icon,
      Utils,
      q
    };
  },
});
</script>

<style lang="scss" scoped>
.item-card-width-regular {
  width: 100%;
  max-width: 350px;
}

.item-card-width-wide {
  width: 100%;
  max-width: 700px;
}

.item-info {
  margin-top: 10px;
}

.avatar-intersection {
  width: 100%;
}
</style>