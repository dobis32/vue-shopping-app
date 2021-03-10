<template>
  <div id="items-list-wrapper" >
    <div id="items-list">
      <div class="listed-item" @click="selectItem(item)" v-for="(item, index) in items" v-bind:key="index">
        {{item.getItemName()}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Item from '../store/models/state.model.item';
@Options({
  props: ['items', 'activeItem'],
  methods: {
    selectItem(item: Item) {
      this.$store.dispatch('setActiveItem', item);
      this.$store.dispatch('setActiveModal', 'selectedItemModal');
      this.$store.dispatch('openModal');
    }
  }
})
export default class Items extends Vue {
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #items-list-wrapper {
    display: inline-block;
    padding: 80px 60px;
  }

 .listed-item {
   display: inline-block;
   background-color: #ddd;
   font-size: 22px;
   width: 80px;
   padding: 22px 0px;
   margin: 5px;
   text-align: center;
   cursor: pointer;
   &:hover {
     text-decoration: underline;
     color: #d00;
   }
 }
</style>
