import { mount, shallowMount, flushPromises } from '@vue/test-utils'
import ListedCartItem from '@/components/ListedCartItem.vue'
import Item from '../../src/store/models/state.model.item';
describe('ListedCartItem.vue', () => {
  let getters: any;
  let $store: any;
  let wrapper: any;
  let dispatch: any;
  let state: any;
  let testData: any;
  let testEditBool: boolean;
  const testItem = new Item('test_item', 4.20, 'foobar');

  beforeEach(() => {
    dispatch = jest.fn();

    getters = {}

    state = {
        cart: [ new Item('Apple', 1.00, 'Fruits'), new Item('Carrot', 1.00, 'Vegetable') ]
    }

    $store = { 
        state,
        getters, 
        dispatch 
    };

    testData = { quantity: 2, item: testItem };

    testEditBool = true;

    wrapper = mount(ListedCartItem, {
      props: {
        data: testData,
        edit: testEditBool
      },
      global: {
        mocks: {
          $store
        }
      }
    });

    flushPromises();
  });

  // DOM
  it('should have the item quantity rendered to the DOM', () => {
    expect(wrapper.find('#item-quantity').exists()).toBeTruthy();
    expect(wrapper.find('#item-quantity').text()).toEqual(testData.quantity.toString())
  });

  it('should have the item name rendered to the DOM', () => {
    expect(wrapper.find('#item-name').exists()).toBeTruthy();
    expect(wrapper.find('#item-name').text()).toEqual(testData.item.getItemName());

  });

  it('should have buttons to adjust item quantity rendered to the DOM if the edit prop is true', () => {
    expect(wrapper.vm.edit).toEqual(true);
    expect(wrapper.find('#controls').exists()).toEqual(true);
    expect(wrapper.find('#increase-item').exists()).toEqual(true);
    expect(wrapper.find('#increase-item').element.tagName).toEqual('BUTTON');
    expect(wrapper.find('#decrease-item').exists()).toEqual(true);
    expect(wrapper.find('#decrease-item').element.tagName).toEqual('BUTTON');
  });

  it('should not have buttons to increase item quantity rendered to the DOM if the edit prop is false', () => {
    wrapper = mount(ListedCartItem, {
      props: {
        data: { quantity: 2, item: testItem },
        edit: false
      }
    });
    expect(wrapper.vm.edit).toEqual(false);
    expect(wrapper.find('#controls').exists()).toEqual(false);
    expect(wrapper.find('#increase-item').exists()).toEqual(false);
    expect(wrapper.find('#decrease-item').exists()).toEqual(false);
  });

  it('should call the "increaseCartItem" method when the increase item button is clicked', () => {
    wrapper.vm.increaseCartItem = jest.fn();
    wrapper.find('#increase-item').trigger('click');
    expect(wrapper.find('#increase-item').exists()).toEqual(true);
  });  

  it('should call the "decreaseCartItem" method when the decrease item button is clicked', () => {
    wrapper.vm.decreaseCartItem = jest.fn();
    wrapper.find('#decrease-item').trigger('click');
    expect(wrapper.find('#decrease-item').exists()).toEqual(true);
  });  

  // Methods
  it('should have a function to get increase the cart quantity of the current item', () => {
    wrapper.vm.increaseCartItem(testItem);
    expect(typeof wrapper.vm.increaseCartItem).toEqual('function');
    expect(dispatch).toHaveBeenCalledWith('increaseCartItem', testItem);
  });

  it('should have a function to get decrease the cart quantity of the current item', () => {
    wrapper.vm.decreaseCartItem(testItem);
    expect(typeof wrapper.vm.decreaseCartItem).toEqual('function');
    expect(dispatch).toHaveBeenCalledWith('decreaseCartItem', testItem);
  });

  // Props
  it('should have a prop for item data', () => {
    expect(wrapper.vm.data).toBeDefined();
    expect(wrapper.vm.data).toEqual(testData);
  });

  it('should have a prop that determines if the item is editable', () => {
    expect(wrapper.vm.edit).toBeDefined();
    expect(wrapper.vm.edit).toEqual(testEditBool);
  });
});
