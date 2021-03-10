<template>
  <div id="modal-wrapper" v-if="activeState" @click="closeModal">
    <SelectedItemModal id="selected-item-modal" v-if="activeModal == 'selectedItemModal'" />
    <EditCartModal id="edit-cart-modal" v-if="activeModal == 'editCartModal'" :cartItems="cartItems" :cartIsEmpty="cartIsEmpty" :cartTotal="cartTotal" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SelectedItemModal from './modal-cards/SelectedItemModal.vue';
import EditCartModal from './modal-cards/EditCartModal.vue';

import Item from '../store/models/state.model.item';
@Options({
  props: ['activeState', 'activeModal'],
  components: {
    SelectedItemModal, EditCartModal
  },
  computed: { // TODO unit tests for computued functions
    cartIsEmpty() {
      return this.$store.getters.cartIsEmpty;
    },
    cartItems() {
      return this.$store.getters.getCartItems;
    },
    cartTotal() {
      return this.$store.getters.getCartTotal;
    },
     activeItem() {
        return this.$store.getters.getActiveItem;
    },
    activeItemInCart() {
        return this.$store.getters.activeItemInCart;
    },
    quantityOfActiveItemInCart() {
        return this.$store.getters.quantityOfActiveItemInCart;
    }
  },
  methods: {
    closeModal() {
        this.$store.dispatch('resetActiveItem');
        this.$store.dispatch('closeModal');
    }
  }
})
export default class Modal extends Vue {
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #modal-wrapper {
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 9; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */  
 }

 
</style>
