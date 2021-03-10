import { mount, shallowMount } from '@vue/test-utils'
import Cart from '@/components/Cart.vue'
import ListedCartItem from '@/components/ListedCartItem.vue'
import Item from '../../src/store/models/state.model.item';
describe('Cart.vue', () => {
  let getters: any;
  let $store: any;
  let wrapper: any;
  let dispatch: any;
  const testCart = [ new Item('Apple', 1.00, 'Fruits'), new Item('Carrot', 1.00, 'Vegetable') ];

  beforeEach(() => {
    dispatch = jest.fn();
    
    $store = { 
    state: {
      testCart
    },
    dispatch 
  };

    wrapper = shallowMount(Cart, {
      props: {
        cartItems: testCart
      },
      global: {
        components: {
          ListedCartItem
        },
        
        mocks: {
          $store
        }
      }
    });
  });

  // DOM
  it('should have an element in the DOM that triggers the "editCart" method on click', () => {
    wrapper.vm.editCart = jest.fn();
    wrapper.find('#edit-cart').trigger('click');
    expect(wrapper.vm.editCart).toHaveBeenCalled();
  });

  it('should have a .listed-cart-item element for each cart item rendered to the DOM', () => {
    expect(wrapper.findAllComponents(ListedCartItem).length).toEqual(testCart.length);
  });

  // Props
  it('should have a prop for the items in the cart', () => {
    expect(wrapper.vm.cartItems).toBeDefined();
    expect(wrapper.vm.cartItems).toEqual(testCart);
  });

  // Methods
  it('should have a method that sets the active modal to "editCartModal" and also opens the modal', () => {
    wrapper.vm.editCart();
    expect(typeof wrapper.vm.editCart).toEqual('function');
    expect(dispatch).toHaveBeenCalledWith('setActiveModal', 'editCartModal');
    expect(dispatch).toHaveBeenCalledWith('openModal');
  });
  
});
