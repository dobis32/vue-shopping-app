import { mount, shallowMount, flushPromises } from '@vue/test-utils';
import Modal from '@/components/Modal.vue';
import Item from '../../src/store/models/state.model.item';
import EditCartModal from '../../src/components/modal-cards/editCartModal.vue';
describe('Modal.vue', () => {
  let getters: any;
  let $store: any;
  let wrapper: any;
  let dispatch: any;
  const cart = [ new Item('Apple', 1.00, 'Fruits'), new Item('Carrot', 1.00, 'Vegetable') ];
  const activeItem = cart[0];
  const itemInCart = cart.find((i: Item) => i == activeItem) ? true : false;
  const quantityInCart = cart.map((i: Item) => i == activeItem ? <number> 1 : <number> 0).reduce((t, v) => t += v);
  const total = 666;
  const empty = false;
  const modalIsActive = true;
  const modalName = 'editCartModal';
  beforeEach(() => {
    dispatch = jest.fn();

    getters = {
        getModalState: jest.fn(() => { return false }),
        getActiveModal: jest.fn(),
        getActiveItem: jest.fn(() => { return activeItem }),
        getCartItems: jest.fn(() => { return cart }),
        getCartTotal: jest.fn(() => { return total }),
        activeItemInCart: jest.fn(() => { return true }),
        cartIsEmpty: jest.fn(() => { return empty }),
        quantityOfActiveItemInCart: jest.fn(() => { return quantityInCart })
    };

    $store = { 
      state: {
        cart
      },
      getters, 
      dispatch 
    };

    wrapper = shallowMount(Modal, {
      props: {
        activeState: modalIsActive,
        activeModal: modalName
      },
      global: {
        mocks: {
          $store
        },
        provide: {
          stopPropagation: (e : Event) => { e.stopPropagation() }
        }
      }
    });

    flushPromises();
  });

  // Computed
  it('should have a function to get cart items from the store', () => {
    const cartItems = wrapper.vm.cartItems();
    expect(typeof wrapper.vm.cartItems).toEqual('function');
    expect(cartItems).toEqual(cart);
    expect(getters.getCartItems).toHaveBeenCalled();
  });

  it('should have a function to get the cart total from the store', () => {
    const cartTotal = wrapper.vm.cartTotal();
    expect(typeof wrapper.vm.cartTotal).toEqual('function');
    expect(cartTotal).toEqual(total);
    expect(getters.getCartTotal).toHaveBeenCalled();
  });

  it('should have a function to determine if the cart is empty or not, according to the store', () => {
    const isEmpty = wrapper.vm.cartIsEmpty();
    expect(typeof wrapper.vm.cartIsEmpty).toEqual('function');
    expect(isEmpty).toEqual(empty);
    expect(getters.cartIsEmpty).toHaveBeenCalled();
  });

  it('should have a function to get the active item from the store', () => {
    const item = wrapper.vm.activeItem();
    expect(typeof wrapper.vm.activeItem).toEqual('function');
    expect(item).toEqual(activeItem);
    expect(getters.getActiveItem).toHaveBeenCalled();
  });

  it('should have a function to determine if the active item is in the cart, according to the store', () => {
    const inCart = wrapper.vm.activeItemInCart();
    expect(typeof wrapper.vm.activeItemInCart).toEqual('function');
    expect(inCart).toEqual(itemInCart);
    expect(getters.activeItemInCart).toHaveBeenCalled();
  });

  it('should have have a function to dtermine how many of the active item are in the cart, according to the store', () => {
    const quantity = wrapper.vm.quantityOfActiveItemInCart();
    expect(typeof wrapper.vm.quantityOfActiveItemInCart).toEqual('function');
    expect(quantity).toEqual(quantityInCart);
    expect(getters.quantityOfActiveItemInCart).toHaveBeenCalled();
  });

  //DOM
  it('should close the modal when the modal wrapper is clicked', () => {
    wrapper.vm.closeModal = jest.fn(wrapper.vm.closeModal);
    wrapper.find('#modal-wrapper').trigger('click');
    expect(wrapper.vm.closeModal).toHaveBeenCalled();
  });

  it('should render the modal wrapper if the activeModal prop is', () => {
    expect(wrapper.find('#modal-wrapper').exists()).toEqual(true);
  });

  it('should not render the modal wrapper if the activeModal prop is false', () => {
    const active = false;
    const wrapperNotActive = shallowMount(Modal, {
      props: {
        activeState: active,
        activeModal: modalName
      },
      global: {
        mocks: {
          $store
        }
      }
    });
    expect(wrapper.find('#modal-wrapper').exists()).toEqual(true);
    expect(wrapper.vm.activeState).toEqual(true);
    expect(wrapperNotActive.find('#modal-wrapper').exists()).toEqual(false);
    expect(wrapperNotActive.vm.activeState).toEqual(false);

  });

  it('should render the EditCartModal if the active modal is "editCartModal"', () => {
    const modal = 'editCartModal';
    const wrapperWithTargetModal = shallowMount(Modal, {
      props: {
        activeState: modalIsActive,
        activeModal: modal
      },
      global: {
        mocks: {
          $store
        }
      }
    });
    expect(wrapper.find('#edit-cart-modal').exists()).toEqual(true);
    expect(wrapperWithTargetModal.vm.activeModal).toEqual(modal);
    expect(wrapperWithTargetModal.find('#edit-cart-modal').exists()).toEqual(true);
  });

  it('should render the SelectedItemModal if the active modal is "selectedItemModal"', () => {
    const modal = 'selectedItemModal';
    const wrapperWithTargetModal = shallowMount(Modal, {
      props: {
        activeState: modalIsActive,
        activeModal: modal
      },
      global: {
        provide: {
          stopPropagation: (e: Event) => { e.stopPropagation()}
        },
        mocks: {
          $store
        }
      }
    });
    expect(wrapper.find('#selected-item-modal').exists()).toEqual(false);
    expect(wrapperWithTargetModal.vm.activeModal).toEqual(modal);
    expect(wrapperWithTargetModal.find('#selected-item-modal').exists()).toEqual(true);
  });

  // Props
  it('should have a prop for the modal active-state', () => {
    expect(wrapper.vm.activeState).toBeDefined();
    expect(wrapper.vm.activeState).toEqual(modalIsActive);
  });

  it('should have a prop for the name of the active modal', () => {
    expect(wrapper.vm.activeModal).toEqual(modalName);
  });

  // Methods
  it('should have a method for closing and reseting the current modal', () => {
    wrapper.vm.closeModal();
    expect(typeof wrapper.vm.closeModal).toEqual('function');
    expect(dispatch).toHaveBeenCalledWith('resetActiveItem');
    expect(dispatch).toHaveBeenCalledWith('closeModal');
  });
});
