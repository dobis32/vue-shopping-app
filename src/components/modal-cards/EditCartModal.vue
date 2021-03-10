<template>
  <div id="modal-card" @click="stopPropagation">
    <h2 id="empty-cart-message" v-if="cartIsEmpty">Your cart is empty!</h2>
    <div v-else id="item-list">
      <h2>Your cart:</h2>
      <ListedCartItem class="listed-cart-item" v-for="(value, name, index) in cartItems" :data="value" :edit="editable" :key="index"></ListedCartItem>
      <hr>
      <div id="cart-total">${{cartTotal.toFixed(2)}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Item from '../../store/models/state.model.item';
import { Options, Vue } from 'vue-class-component';
import ListedCartItem from '../ListedCartItem.vue';
@Options({
  data: () => {
    return { editable: true }
  },
  components: { ListedCartItem },
  inject: ['stopPropagation'],
  props: ['cartItems', 'cartIsEmpty', 'cartTotal']
})
export default class EditCartModal extends Vue {
  
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
    width: 400px; /* Could be more or less, depending on screen size */
    text-align: center;
    
  }

  #cart-items {
    display: block;
  }

  #edit-cart {
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    &:hover {
      color: #f00;
    }
  }

  .cart-item-quantity {
    float: left;
    padding-left: 10px;
  }

  .cart-item-name {
    float: right;
    padding-right: 10px;
    button {
      padding: 0px 4px;
    }
  }

  #item-list {
    display: flex;
    flex-direction: column;
    // padding-bottom: 20px;
  }
</style>
