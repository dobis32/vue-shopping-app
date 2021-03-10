import Item from '../models/state.model.item';
export default {
    addItemToCart: (state: any, item: Item) => {
        state.cart.push(item);
      },
      removeItemFromCart: (state: any, itemToRemove: Item) => {
        const filtered = state.items.filter((i: Item) => i == itemToRemove);
        state.cart = filtered;
      },
      setActiveCategory: (state: any, activeCategory: string) => {
        state.activeCategory = activeCategory;
      },
      setActiveModal: (state: any, modal: string) => {
        state.activeModal = modal;
      },
      setModalState: (state: any, active: boolean) => {
        state.modalState = active;
      },
      setActiveItem: (state: any, item: Item) => {
        state.activeItem = item;
      },
      initItems: (state: any, items: Array<Item>) => {
        state.items = items;
      },
      updateCart: (state: any, cart: Array<Item>) => {
        state.cart = [...cart];
      }
}