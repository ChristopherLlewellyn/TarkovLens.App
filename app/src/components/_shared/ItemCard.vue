<template>
  <q-card class="item-card-width margin center" flat>
    <q-card-section horizontal>
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
                  {{
                    item.avg24hPrice
                      ? Utils.numberWithCommas(item.avg24hPrice)
                      : '?'
                  }}
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

      <q-card-section class="col-3 flex flex-center">
        <q-intersection once transition="scale" class="avatar-intersection">
          <q-avatar class="center q-mt-xs" size="70px" rounded>
            <img
              style="object-fit: contain"
              :src="item.blightbusterIcon"
              @error="$event.target.src = item.img"
            />
          </q-avatar>
        </q-intersection>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Item } from 'src/models/items/Item';
import Utils from 'src/functions/Utils';
import { Icon } from 'src/enums/icon';

export default defineComponent({
  name: 'ItemCard',
  props: {
    item: {
      type: Object as () => Item,
      required: true,
    },
  },
  setup() {
    return {
      Icon,
      Utils,
    };
  },
});
</script>

<style lang="scss" scoped>
.item-card-width {
  width: 100%;
  max-width: 350px;
}

.item-info {
  margin-top: 10px;
}
</style>