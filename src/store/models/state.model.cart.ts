import Item from './state.model.item';
export default class Cart {
    private items: Array<Item>
    constructor(items: Array<any>) {
        this.items = items;

    }
    
    getCartItems(): Array<Item> {
        return this.items;
    }

    setCartItems(items: Array<Item>) {
        this.items = items;
    }
}