import { mount, shallowMount, flushPromises } from '@vue/test-utils';
import EditCartModal from '@/components/modal-cards/EditCartModal.vue';
import ListedCartItem from '../../src/components/ListedCartItem.vue';
import Item from '../../src/store/models/state.model.item';
describe('EditCartModal.vue', () => {
  let getters: any;
  let $store: any;
  let wrapper: any;
  let dispatch: any;
  const cartItems = [new Item('Apple', 1.00, 'Fruits'), new Item('Carrot', 0.80, 'Vegetable')];
  const cartIsEmpty = false;
  const stopPropagation = jest.fn((e : Event) => { e.stopPropagation() });
  const cartTotal = cartItems.map((i: Item) => i.getItemPrice()).reduce((t, v) => t += v);
  beforeEach(() => {
    dispatch = jest.fn();

    $store = { 
      state: {
        
      },
      dispatch 
    };

    wrapper = shallowMount(EditCartModal, {
      data: () => {
          return { editable: true }
      },
      props: {
        cartItems,
        cartIsEmpty,
        cartTotal
      },
      global: {
        mocks: {
          $store
        },
        provide: {
          stopPropagation
        }
      }
    });

    flushPromises();
  });

  // DOM
  it('should call the provided/injected "stopPropagation" function when the modal card is clicked', () => {
    wrapper.find('#modal-card').trigger('click');
    expect(stopPropagation).toHaveBeenCalled();
  });

  it('should render a message stating that the cart is empty, if the cart is empty', () => {
    const isEmpty = true;
    const wrapperEmptyCart = mount(EditCartModal, {
        props: {
          cartItems,
          cartIsEmpty: isEmpty,
          cartTotal
        },
        global: {
          mocks: {
            $store
          },
          provide: {
            stopPropagation
          }
        }
      });
      const msg = wrapperEmptyCart.find('#empty-cart-message')
      expect(wrapperEmptyCart.vm.cartIsEmpty)
      expect(msg.exists()).toEqual(true);
      expect(msg.text()).toEqual('Your cart is empty!');
  });

  it('should render the items list to the DOM, if the cart is not empty', () => {
    expect(wrapper.vm.cartIsEmpty).toEqual(false);
    expect(wrapper.find('#item-list').exists()).toEqual(true);
  });

  it('should have a ListedCartItem for each item in the cart', () => {
    expect(wrapper.findAllComponents(ListedCartItem).length).toEqual(cartItems.length);
  });

  it('should have the cart total rendered to the DOM, if the cart is not empty', () => {
    const el = wrapper.find('#cart-total');
    expect(el.exists()).toEqual(true);
    expect(el.text()).toEqual(`$${cartTotal.toFixed(2)}`);
  });

  // Methods
  it('should have a function for stopping event propagation', () => {
    const e = new Event('foo');
    e.stopPropagation = jest.fn(e.stopPropagation);
    wrapper.vm.stopPropagation(e);
    expect(typeof wrapper.vm.stopPropagation).toEqual('function');
    expect(e.stopPropagation).toHaveBeenCalled();
  });

  // Props
  it('should have a prop for the items in the cart', () => {
    expect(wrapper.vm.cartItems).toBeDefined();
    expect(wrapper.vm.cartItems).toEqual(cartItems);
  });

  it('should have a prop for determining if the cart is empty', () => {
    expect(wrapper.vm.cartIsEmpty).toBeDefined();
    expect(wrapper.vm.cartIsEmpty).toEqual(cartIsEmpty);
  });
  
  it('should have a prop for the cart total', () => {
    expect(wrapper.vm.cartTotal).toBeDefined();
    expect(wrapper.vm.cartTotal).toEqual(cartTotal);
  });
});
