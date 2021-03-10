<template>
  <div id="cart-items">
    <h2 id="edit-cart" @click="editCart">Your Cart (edit)</h2>
    <div id="cart-items-list">
      <ListedCartItem class="listed-cart-item" v-for="(value, index) in cartItems" v-bind:key="index" :data="value"></ListedCartItem>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ListedCartItem from './ListedCartItem.vue';

@Options({
  components: {
    ListedCartItem
  },
  props: ['cartItems'],
  methods: {
    editCart() {
        this.$store.dispatch('setActiveModal', 'editCartModal');
        this.$store.dispatch('openModal');
    }
  }
})
export default class Cart extends Vue {
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #cart-items {
    width: 160px;
    display: inline-block;
    text-align: center;
  }

  #edit-cart {
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    &:hover {
      color: #f00;
    }
  }

  #cart-items-list {
    display: flex;
      flex-direction: column;
  }

  .listed-cart-item {
    font-size: 20px;
    padding-right: 10px;
    font-weight: bold;
    text-align: right;
    width: 100%;
    display: block;
  }

  .cart-item-name {
      float: right;
      padding-right: 15px;
  }

  .cart-item-quantity {
      float: left;
      padding-left: 15px;
  }
</style>