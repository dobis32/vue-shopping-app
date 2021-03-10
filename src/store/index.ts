import { createStore } from 'vuex'
import Item from './models/state.model.item';
import Cart from './models/state.model.cart';
import Mutations from './src/mutations';
import Actions from './src/actions';
import Getters from './src/getters';
import {CoreStore} from './models/state.model.store'
// let items = ;
// let cart = new Array<Item>();

export default createStore({
  state: {
    activeCategory: 'All',
    activeItem: new Item('', 0, ''),
    activeModal: '',
    modalState: false,
    items: new Array<Item>(),
    cart: new Array<Item>()
  } as CoreStore,
  mutations: { // cannot be async
    ...Mutations
  },
  actions: { // can by async
    ...Actions
  },
  getters: {
    ...Getters
  },
  modules: {
    
  }
})
