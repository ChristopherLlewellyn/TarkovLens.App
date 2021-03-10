import { GetterTree } from 'vuex';
import { RootState } from '../RootState';
import { LayoutState } from './state';

const getters: GetterTree<LayoutState, RootState> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
