import { Module } from 'vuex';
import { RootState } from '../RootState';
import state, { LayoutState } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const layout: Module<LayoutState, RootState> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default layout;
