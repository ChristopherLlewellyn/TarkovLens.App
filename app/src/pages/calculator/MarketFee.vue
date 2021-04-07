<template>
  <transition appear enter-active-class="animated fadeIn">
    <q-page key="page" padding>
      <div class="row center">
        <div class="q-mt-md">
          <item-search-select
            @item-selected="onItemSelected"
          ></item-search-select>
        </div>
        <div v-if="selectedItem" class="center" style="margin-top: 40px">
          <div class="row">
            <item-card :item="selectedItem" class="col-xs-12 col-sm-12 col-md-6" />
            <div class="col-xs-12 col-sm-12 col-md-6">
              <q-input
                v-model="listedPrice"
                type="number"
                filled
                :disable="selectedItem.price ? false : true"
                label="Listed price"
                class="q-ma-md list-price center"
                @update:modelValue="handleListedPriceInput"
              >
                <template #prepend>
                  <q-icon :name="Icon.MoneyRubles" />
                </template>
              </q-input>
              <div class="fee-text text-center">
                <div class="center">Fee</div>
                <q-separator class="center" style="width: 70px" color="money" />
                <span>
                  {{ fee ? Utils.numberWithCommas(parseInt(fee.toFixed(0))) : '-'}}
                </span>
                <q-icon v-if="fee" :name="Icon.MoneyRubles" />
                <div class="profit-text" :style="{'color': profit && profit > 0 ? 'green' : 'red'}">
                  <span v-if="profit && profit > 0">+</span>
                  <span>
                    {{ profit ? Utils.numberWithCommas(parseInt(profit.toFixed(0))) : '' }}
                  </span>
                  <q-icon v-if="profit" :name="Icon.MoneyRubles" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { RootState } from 'src/store/RootState';
import { Icon } from 'src/enums/icon';
import { App } from 'src/enums/app';
import { useMeta } from 'quasar';
import ItemCard from 'src/components/_shared/ItemCard.vue';
import ItemSearchSelect from 'src/components/_shared/ItemSearchSelect.vue';
import { Item } from 'src/models/items/Item';
import MarketFeeCalculator from 'src/functions/MarketFeeCalculator';
import Utils from 'src/functions/Utils';

const metaData = {
  title: 'Market Fee Calculator',
  titleTemplate: (title: string) => `${title} - ${App.AppName}`,
  meta: {
    description: {
      name: 'Calculate the market fee for listing an item on the flea market.',
    },
  },
};

export default defineComponent({
  name: 'MarketFee',
  components: {
    ItemSearchSelect,
    ItemCard,
  },
  setup() {
    useMeta(metaData);
    const store = useStore<RootState>();
    store.commit('layout/updateTitle', 'Market Fee');

    const selectedItem = ref<Item>();
    const listedPrice = ref(0);
    const fee = computed<number | undefined>(() => {
      if (selectedItem.value && listedPrice.value > 0) {
        return MarketFeeCalculator.calculateFee(listedPrice.value, selectedItem.value)
      }
      return undefined
    });
    const profit = computed<number | undefined>(() => {
      if (fee.value && listedPrice.value) {
        return listedPrice.value - fee.value
      }
      return undefined
    });

    function onItemSelected(item: Item) {
      if (item) {
        selectedItem.value = item;
      } else {
        selectedItem.value = undefined;
      }
      listedPrice.value = 0
    }

    function handleListedPriceInput(value: number) {
      listedPrice.value = parseInt(value.toString(), 10);
    }

    return {
      Icon,
      onItemSelected,
      handleListedPriceInput,
      selectedItem,
      listedPrice,
      fee,
      profit,
      Utils
    };
  },
});
</script>

<style scoped lang="scss">
.list-price {
  max-width: 200px;
}

.fee-text {
  font-size: 25px;
}

.profit-text {
  font-size: 16px;
}
</style>