import { MutationTree } from 'vuex';
import { LayoutState } from './state';

const mutation: MutationTree<LayoutState> = {
  updateTitle (state, payload: string) {
    state.title = payload
  }
};

export default mutation;
