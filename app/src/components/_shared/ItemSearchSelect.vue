<template>
  <q-select
    v-model="model"
    :options="options"
    filled
    use-input
    input-debounce="350"
    label="Item name"
    clearable
    class="select center"
    @filter="filterFn"
    @update:model-value="onModelChanged"
  >
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">No results</q-item-section>
      </q-item>
    </template>

    <template #prepend>
      <q-icon name="mdi-magnify" />
    </template>

    <template #option="scope">
      <q-item
        v-bind="scope.itemProps"
        v-on="scope.itemEvents"
      >
        <q-item-section avatar>
          <q-intersection once transition="scale" class="avatar-intersection">
            <q-avatar
              size="6vh"
              rounded
            >
              <img
                style="object-fit: contain"
                :src="scope.opt.icon"
                @error="$event.target.src = fetchedItems.find(x => x.id === scope.opt.value)?.img"
              />
            </q-avatar>
          </q-intersection>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
          <q-item-label caption><span class="greyed-text">{{ scope.opt.description }}</span></q-item-label>
          <q-item-label caption>
            <div class="money">
              <q-icon :name="Icon.MoneyRubles" /><span>{{ getMarketPriceDisplay(scope.opt.value) }}</span>
            </div>
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from 'vue';
import useItemService from 'src/hooks/useItemService';
import { Item } from 'src/models/items/Item';
import Utils from 'src/functions/Utils';
import { Icon } from 'src/enums/icon'

interface Option {
  label: string;
  value: string;
  description: string;
  icon: string;
}

export default defineComponent({
  name: 'ItemSearchSelect',
  emits: [
    'itemSelected',
  ],
  setup(_props, { emit }) {
    const { getItemByName } = useItemService();

    const options = ref<Option[]>([]);
    const fetchedItems = ref<Item[]>([]);
    const model = ref(null);

    function filterFn(val: string, update: (callback: () => void) => void) {
      if (val.length > 2) {
        getItemByName(val)
          .then((data) => {
            fetchedItems.value = data
            const newOptions: Option[] = [];
            for (let item of data) {
              newOptions.push({
                label: item.name,
                value: item.id,
                description: Utils.humanizeItemKind(item._kind),
                icon: item.blightbusterIcon,
              });
            }

            update(() => {
              options.value = newOptions;
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        fetchedItems.value = []
        update(() => {
          options.value = [];
        });
      }
    }

    function onModelChanged(model: Option) {
      const item = fetchedItems.value.find(x => x.id === model.value) ?? undefined
      emit('itemSelected', item)
    }

    function getMarketPriceDisplay(id: string) {
      const item = fetchedItems.value.find(x => x.id === id)
      if (item) {
        return item.avg24hPrice > 0 ? Utils.numberWithCommas(item.avg24hPrice) : '?'
      }
      return '?'
    }

    return {
      model,
      options,
      fetchedItems,
      filterFn,
      onModelChanged,
      getMarketPriceDisplay,
      Icon
    };
  },
});
</script>

<style scoped>
.select {
  max-width: 500px;
}

.avatar-intersection {
  height: 6vh;
  width: 6vh;
}
</style>