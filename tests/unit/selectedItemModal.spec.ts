import { mount, shallowMount, flushPromises } from '@vue/test-utils';
import SelectedItemModal from '@/components/modal-cards/SelectedItemModal.vue';
import Item from '../../src/store/models/state.model.item';
describe('SelectedItemModal.vue', () => {
  let getters: any;
  let $store: any;
  let wrapper: any;
  let dispatch: any;
  const activeItem = new Item('Apple', 1.00, 'Fruits');
  const activeItemInCart = true;
  const quantityOfActiveItemInCart = 666;
  const stopPropagation = jest.fn((e : Event) => { e.stopPropagation() });

  beforeEach(() => {
    dispatch = jest.fn();

    $store = { 
      state: {
        
      },
      dispatch 
    };

    wrapper = mount(SelectedItemModal, {
      props: {
        activeItem,
        activeItemInCart,
        quantityOfActiveItemInCart
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

  it('should have the name of the active item rendered to the DOM', () => {
    expect(wrapper.find('#item-name').text()).toEqual(activeItem.getItemName());
  });

  it('should have the price of the active item rendered to the DOM', () => {
    expect(wrapper.find('#item-price').text()).toEqual(`Price: $${activeItem.getItemPrice().toFixed(2)}`);
  });

  it('should have the category of the active item rendered to the DOM', () => {
    expect(wrapper.find('#item-category').text()).toEqual(`Category: ${activeItem.getItemCategory()}`);
  });

  it('should have a button to add the active item to the cart', () => {
    const btn = wrapper.find('#add-to-cart')
    expect(btn.exists()).toEqual(true);
    expect(btn.element.tagName).toEqual('BUTTON');
  });

  it('should call the appropriate function when the add-to-cart button is clicked', () => {
    wrapper.vm.addItemToCart = jest.fn(wrapper.vm.addItemToCart);
    wrapper.find('#add-to-cart').trigger('click');
    expect(wrapper.vm.addItemToCart).toHaveBeenCalled();
  });

  it('should render the quantity of active item in the cart', () => {
    const el = wrapper.find('#quantity-in-cart')
    expect(wrapper.vm.activeItemInCart).toEqual(true);
    expect(el.exists()).toEqual(true);
    expect(el.text()).toEqual(`Quantity in cart: ${quantityOfActiveItemInCart}`)
  });

  it('should not render the quantity of active item in the cart, if the active item does not exist in the cart', () => {
    const wrapperItemNotInCart = mount(SelectedItemModal, {
      props: {
        activeItem,
        activeItemInCart: false,
        quantityOfActiveItemInCart
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

    expect(wrapperItemNotInCart.find('#quantity-in-cart').exists()).toEqual(false);
  });

  // Methods
  it('should have a function for adding an item to the cart', () => {
    const item = new Item('foo', 420, 'bar');
    wrapper.vm.addItemToCart(item);

    expect(wrapper.vm.addItemToCart).toBeDefined();
    expect(typeof wrapper.vm.addItemToCart).toEqual('function');
    expect(dispatch).toHaveBeenCalledWith('addItemToCart', item);
  });

  it('should have a function for stopping event propagation', () => {
    const e = new Event('foo');
    e.stopPropagation = jest.fn(e.stopPropagation);
    wrapper.vm.stopPropagation(e);
    expect(typeof wrapper.vm.stopPropagation).toEqual('function');
    expect(e.stopPropagation).toHaveBeenCalled();

  });

  // Props
  it('should have a prop for the active item', () => {
    expect(wrapper.vm.activeItem).toBeDefined();
  });

  it('should have a prop for the active item in the cart', () => {
    expect(wrapper.vm.activeItemInCart).toBeDefined();
  });

  it('should have a prop for the quantify of the active item in the cart', () => {
    expect(wrapper.vm.quantityOfActiveItemInCart).toBeDefined();
  });

});
