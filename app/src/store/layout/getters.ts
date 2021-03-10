import { GetterTree } from 'vuex';
import { RootState } from '../RootState';
import { LayoutState } from './state';

const getters: GetterTree<LayoutState, RootState> = {
  getTitle (state): string {
    return state.title
  }
};

export default getters;
