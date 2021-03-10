<template>
  <Categories :categories="categories" :activeCategory="activeCategory"/>
  <Items :items="items" :activeItem="activeItem" />
  <Cart :cartItems="cartItems" />
  <Modal :activeState="modalActiveState" :activeModal="activeModal"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Categories from './components/Categories.vue';
import Item from './store/models/state.model.item';
// import SelectedItemModal from './components/modal-cards/SelectedItem.vue';
import Items from './components/Items.vue';
import Modal from './components/Modal.vue';
import Cart from './components/Cart.vue';

@Options({
  components: {
    Categories, Items, Modal, Cart, 
  },
  computed: {
    categories() {
      return this.$store.getters.getItemCategories;
    },
    activeCategory() {
      return this.$store.state.activeCategory;
    },
    items() {
      return this.$store.getters.getItemsByActiveCategory;
    },
    activeItem() {
      return this.$store.getters.getActiveItem;
    },
    modalActiveState() {
      return this.$store.getters.getModalState;
    },
    activeModal() {
      return this.$store.getters.getActiveModal;
    },
    cartItems() {
      return this.$store.getters.getCartItems;
    }
  },
  created() {
    const initItems = [
      new Item('Apple', 1.25, 'Fruits'),
      new Item('Banana', 1.00,'Fruits'),
      new Item('Carrot', 0.90, 'Vegetables'),
      new Item('Celery', 0.70, 'Vegetables'),
    ]
    this.$store.dispatch('initItems', initItems);
  },
  provide: {
    stopPropagation: (e: Event) => {
      e.stopPropagation();
    }
  }
 
})
export default class App extends Vue {
  
}
</script>

<style lang="scss">
* {
    vertical-align: top;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
