<template>
  <article id="wrapper" >
    <div id="item-quantity">{{data.quantity}}</div><div id="item-name">{{data.item.getItemName()}}</div><div v-if="edit" id="controls"><button id="increase-item" @click="increaseCartItem(data.item)">+</button><button id="decrease-item" @click="decreaseCartItem(data.item)">-</button></div>
  </article>
</template>

<script lang="ts">
import Item from '../store/models/state.model.item';
import { Options, Vue } from 'vue-class-component';
@Options({
    props: ['data', 'edit'],
    methods: {
        increaseCartItem(i: Item) {
            this.$store.dispatch('increaseCartItem', i);
        },
        decreaseCartItem(i: Item) {
            this.$store.dispatch('decreaseCartItem', i);
        }
    }
})
export default class EditCartModal extends Vue {
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #wrapper {
      padding-top: 10px;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    width: 50%;
  }

  #controls {
      display: inline-block;
      padding-left: 18px;
  }
  
</style>
