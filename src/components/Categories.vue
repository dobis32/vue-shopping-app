x<template>
  <div id="categories">
    <h2>Item Categories:</h2>
    <div class="listed-category" id="all" v-bind:class="{ active: isActiveCategory('All', activeCategory) }" @click="setActiveCategory('All')">All</div>
    <div class="listed-category" v-bind:class="{ active: isActiveCategory(category, activeCategory) }" @click="setActiveCategory(category)" v-for="(category, index) in categories" v-bind:key="index">
      {{category}}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({
  props: ['categories', 'activeCategory'],
  methods: {
    setActiveCategory(category: string) {
      this.$store.dispatch('setActiveCategory', category);
    },
    isActiveCategory(category: string, activeCategory: string): boolean {
      return category == activeCategory;
    }
  }
})
export default class Categories extends Vue {
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #categories {
    display: inline-block;
  }

  .listed-category {
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    &:hover {
      color: #f00;
    }
  }

  .active {
    color: #d00;
    text-decoration: underline;
  }
</style>
