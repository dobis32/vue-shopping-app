import Item from '../models/state.model.item';
export default {
  getItemCategories: (state: any) => { 
    return state.items
      .map((i: Item) => i.getItemCategory())
      .filter((value: Item, index: number, self: Array<Item>) => {
        return self.indexOf(value) === index;
       }) 
  },
  getItemsByActiveCategory: (state: any) => {
    const activeCategory =  state.activeCategory;
    if(activeCategory && activeCategory != 'All') return state.items.filter((i: Item) => i.getItemCategory() == activeCategory);
    else return state.items;
  },
  getActiveModal: (state: any) => {
    return state.activeModal;
  },
  getModalState: (state: any) => {
    return state.modalState;
  },
  getActiveItem: (state: any) => {
    return state.activeItem;
  },
  quantityOfActiveItemInCart: (state: any) => {
    let count = 0;
    const activeItem = state.activeItem;
    state.cart.forEach((i: Item) => {
     if(activeItem == i) count++;
    })
    return count;
  },
  activeItemInCart: (state: any) => {
    return state.cart.find((i: Item) => i == state.activeItem) ? true : false;
  },
  getCartItems: (state: any) => {
    const cartInventory = {} as any;
    state.cart.forEach((i: Item) => {
      const itemName = i.getItemName()
      if (cartInventory[itemName]) {
        cartInventory[itemName].quantity++;
      } else {
        cartInventory[itemName] =  { quantity: 1, item: i};
      }
    });
    return cartInventory;
  },
  cartIsEmpty: (state: any) => {
    return state.cart.length ? false : true;
  },
  getCartTotal: (state: any) => {
    if (state.cart.length) return state.cart.map((i: Item) => i.getItemPrice()).reduce((accumulator: number, price: number) => accumulator + price);
    else return 0;
  }
}