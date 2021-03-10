import Item from '../models/state.model.item';
export default {
    addItemToCart: (context: any, item: Item) => {
        context.commit('addItemToCart', item);
      },
      removeItemFromCart: (context: any,  itemToRemove: Item) => {
        context.commit('removeItemFromCart', itemToRemove);
      },
      setActiveCategory: (context: any, category: string) => {
        context.commit('setActiveCategory', category);
      },
      setActiveItem: (context: any, item: Item) => {
        context.commit('setActiveItem', item);
      },
      setActiveModal: (context: any, modal: string) => {
        context.commit('setActiveModal', modal);
      },
      closeModal: (context: any) => {
        context.commit('setModalState', false);
      },
      openModal: (context: any) => {
        context.commit('setModalState', true);
      },
      resetActiveItem: (context: any) => {
        context.commit('setActiveItem', new Item('', 0, ''));
      },
      initItems: (context: any, items: Array<Item>) => {
        context.commit('initItems', items);
      },
      increaseCartItem: (context: any, item: Item) => {
        context.commit('addItemToCart', item);
      },
      decreaseCartItem: (context: any, itemToRemove: Item) => {
        const updatedCart = [] as Array<Item>;
        const indexToRemove = context.state.cart.indexOf(itemToRemove);
        if(indexToRemove > -1) {
          context.state.cart.forEach((i: Item, index: number) => {
            if(index != indexToRemove) updatedCart.push(i);
          }); 
          context.commit('updateCart', updatedCart);
        }
      }
}