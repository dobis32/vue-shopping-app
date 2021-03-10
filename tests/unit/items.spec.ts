import { mount, shallowMount } from '@vue/test-utils'
import Items from '@/components/Items.vue'
import Item from '../../src/store/models/state.model.item';
describe('Items.vue', () => {
  let getters: any;
  let $store: any;
  let wrapper: any;
  let dispatch: any;
  let state: any;
  let testItems = [new Item('TestItemA', 5.00, 'TestCategory1'), new Item('TestItemB', 5.00, 'TestCategory2')];
  let testActiveItem = testItems[0];
  
  beforeEach(() => {
    dispatch = jest.fn();

    getters = {
        getItemsByActiveCategory: jest.fn(),
        getActiveItem: jest.fn()
    }

    state = {
      items: testItems,
      activeItem: testItems[0]
    }

    $store = { 
        state,
        getters, 
        dispatch 
    };

    wrapper = mount(Items, {
      props: {
        items: testItems,
        activeItem: testActiveItem
      },
      global: {
        mocks: {
          $store
        }
      }
    });
  });

  // DOM
  it('should have an element w class "listed-item" for each item rendered to the DOM', () => {
    expect(wrapper.findAll('.listed-item').length).toEqual(testItems.length);
  });

  it('should have a corresponding item name rendered in each .listed-item element', () => {
    const i0 = testItems[0];
    const i1 = testItems[1];
    const rendered = wrapper.findAll('.listed-item');
    expect(rendered[0].text()).toEqual(i0.getItemName());
    expect(rendered[1].text()).toEqual(i1.getItemName());
  });

  it('should call the selectItem method when an item rendered on the DOM is clicked', () => {
    let n = 0;
    wrapper.vm.selectItem = jest.fn();
    wrapper.findAll('.listed-item')[n].trigger('click');
    expect(wrapper.vm.selectItem).toHaveBeenCalledWith(testItems[n]);
  });

  it('should render the item name of each .listed-item element', () => {
    let item0 = testItems[0];
    let item1 = testItems[1];
    expect(wrapper.findAll('.listed-item')[0].text()).toEqual(item0.getItemName());
    expect(wrapper.findAll('.listed-item')[1].text()).toEqual(item1.getItemName());
  }); 

  // Props 
  it('should have a prop for the items array', () => {
    expect(wrapper.vm.items).toBeDefined();
    expect(wrapper.vm.items).toEqual(testItems);
  });

  it('should have a prop for the active item', () => {
    expect(wrapper.vm.activeItem).toBeDefined();
    expect(wrapper.vm.activeItem).toEqual(testActiveItem);
  });

  // Methods
  it('should have a method for selecting an item and making it the active-item', () => {
    let item = testItems[0];
    wrapper.vm.selectItem(item);
    expect(typeof wrapper.vm.selectItem).toEqual('function');
    expect(dispatch).toHaveBeenCalledWith('setActiveItem', item);
    expect(dispatch).toHaveBeenCalledWith('setActiveModal', 'selectedItemModal');
    expect(dispatch).toHaveBeenCalledWith('openModal');
  });
});
