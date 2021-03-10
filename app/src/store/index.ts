import { store } from 'quasar/wrappers';
import { createStore } from 'vuex';
import { RootState } from './RootState';

import layout from './layout'

export default store(function (/* { ssrContext } */) {
  const Store = createStore<RootState>({
    modules: {
      layout
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
  });

  return Store;
});
