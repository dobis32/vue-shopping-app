<template>
  <div id="modal-card" @click="stopPropagation">
    <h2 id="item-name">{{ activeItem.getItemName() }}</h2>
    <h4 id="item-price">Price: ${{ activeItem.getItemPrice().toFixed(2) }}</h4>
    <h4 id="item-category">Category: {{ activeItem.getItemCategory() }}</h4>
    <button id="add-to-cart" @click="addItemToCart(activeItem)">Add to cart</button>
    <h4 id="quantity-in-cart" v-if="activeItemInCart">Quantity in cart: {{quantityOfActiveItemInCart}}</h4>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Item from '../../store/models/state.model.item';
@Options({
  inject: ['stopPropagation'],
  props: [ 'activeItem', 'activeItemInCart', 'quantityOfActiveItemInCart'],
  methods: {
    addItemToCart(item: Item) {
      this.$store.dispatch('addItemToCart', item);
    }
  }
})
export default class SelectedItemModal extends Vue {
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #modal-card {    
    z-index: 10; /* Sit on top */
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 200px; /* Could be more or less, depending on screen size */
    text-align: center;
 }
</style>
