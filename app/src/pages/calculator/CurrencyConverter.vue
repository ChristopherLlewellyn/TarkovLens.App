<template>
  <transition appear enter-active-class="animated fadeIn">
    <q-page key="page" padding>
      <div class="absolute-center">
        <q-input
          v-model="rubles"
          type="number"
          standout="bg-teal text-white"
          label="Rubles"
          class="q-ma-md limit-width center"
          @update:modelValue="handleRublesInput"
        >
          <template #prepend>
            <q-icon :name="Icon.MoneyRubles" />
          </template>
        </q-input>
        <q-input
          v-model="dollars"
          type="number"
          standout="bg-teal text-white"
          label="Dollars"
          class="q-ma-md limit-width center"
          @update:modelValue="handleDollarsInput"
        >
          <template #prepend>
            <q-icon :name="Icon.MoneyDollars" />
          </template>
        </q-input>
        <q-input
          v-model="euro"
          type="number"
          standout="bg-teal text-white"
          label="Euro"
          class="q-ma-md limit-width center"
          @update:modelValue="handleEuroInput"
        >
          <template #prepend>
            <q-icon :name="Icon.MoneyEuro" />
          </template>
        </q-input>
      </div>
    </q-page>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { RootState } from 'src/store/RootState';
import { Icon } from 'src/enums/icon';
import { App } from 'src/enums/app';
import { useMeta } from 'quasar';
import CurrencyConvert from 'src/functions/CurrencyConvert';

const metaData = {
  title: 'Currency Converter',
  titleTemplate: (title: string) => `${title} - ${App.AppName}`,
  meta: {
    description: { name: 'Convert the various currencies used in Tarkov.' },
  },
};

export default defineComponent({
  name: 'CurrencyConverter',
  setup() {
    useMeta(metaData);
    const store = useStore<RootState>();
    store.commit('layout/updateTitle', 'Currency Converter');
    
    const rubles = ref(0);
    const dollars = ref(0);
    const euro = ref(0);

    function handleRublesInput(value: number) {
      dollars.value = Math.floor(CurrencyConvert.rublesToDollars(value))
      euro.value = Math.floor(CurrencyConvert.rublesToEuro(value))
    }

    function handleDollarsInput(value: number) {
      rubles.value = Math.floor(CurrencyConvert.dollarsToRubles(value))
      euro.value = Math.floor(CurrencyConvert.dollarsToEuro(value))
    }

    function handleEuroInput(value: number) {
      rubles.value = Math.floor(CurrencyConvert.euroToRubles(value))
      dollars.value = Math.floor(CurrencyConvert.euroToDollars(value))
    }

    return {
      Icon,
      rubles,
      dollars,
      euro,
      handleRublesInput,
      handleDollarsInput,
      handleEuroInput,
    };
  },
});
</script>

<style scoped lang="scss">
.limit-width {
  max-width: 200px;
}

.absolute-center {
  left: 50%;
  top: 35%;
}
</style>