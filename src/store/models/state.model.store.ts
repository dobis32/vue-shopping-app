import Item from './state.model.item'

export interface CoreStore {
    activeCategory: string,
    activeItem: Item,
    activeModal: string,
    modalState: boolean,
    items: Array<Item>,
    cart: Array<Item>
}