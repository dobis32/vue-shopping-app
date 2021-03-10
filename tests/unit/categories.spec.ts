import { mount, shallowMount } from '@vue/test-utils'
import Categories from '@/components/Categories.vue'
import Item from '../../src/store/models/state.model.item';

describe('Categories.vue', () => {
  let $store: any;
  let wrapper: any;
  let dispatch: any;
  let state: any;
  const testItems = [ new Item('Apple', 1.00, 'Fruits'), new Item('Carrot', 1.00, 'Vegetable') ];
  const testCategories = testItems.map((i: Item) => i.getItemCategory());
  const activeCategory = testCategories[0];
  beforeEach(() => {
    dispatch = jest.fn();

    state = {
        activeCategory: testItems[0].getItemCategory(),
        cart: testItems
    }

    $store = { 
      state,
      dispatch,
    };

    wrapper = shallowMount(Categories, {
      props: {
        categories: testCategories,
        activeCategory
      },
      global: {
        mocks: {
          $store
        }
      }
    });
  });

  // DOM
  it('should have a way to set the active category to "All"', () => {
    let allOption = wrapper.find('#all');
    allOption.trigger('click');
    expect(dispatch).toHaveBeenCalledWith('setActiveCategory', 'All');
    expect(allOption.text()).toEqual('All');
  });

  it('should render the category string of each item category rendered in each .listed-category element', () => {
    let item1 = testItems[0];
    let item2 = testItems[1];
    let listedCategories = wrapper.findAll('.listed-category');
    expect(listedCategories[1].text()).toEqual(item1.getItemCategory());
    expect(listedCategories[2].text()).toEqual(item2.getItemCategory());
  });

  it('should call the "setActiveCetegory" method with the corresponding cateogry according to which DOM element was selected', () => {
    wrapper.vm.setActiveCategory = jest.fn(wrapper.vm.setActiveCategory);
    const els = wrapper.findAll('.listed-category');
    els[0].trigger('click');
    expect(wrapper.vm.setActiveCategory).toHaveBeenLastCalledWith(els[0].text());
    els[1].trigger('click');
    expect(wrapper.vm.setActiveCategory).toHaveBeenLastCalledWith(els[1].text());
    els[2].trigger('click');
    expect(wrapper.vm.setActiveCategory).toHaveBeenLastCalledWith(els[2].text());
  }); 
  
  it('should an element w the "active" corresponding to the active-category', () => {
    expect(wrapper.find('.active').text()).toEqual(activeCategory);
  });

  it('should have an "All" category listing', () => {
    expect(wrapper.find('#all').exists()).toEqual(true);
    expect(wrapper.findAll('.listed-category').length).toEqual(testCategories.length + 1);
  });

  it('should have an "All" category listing, even when no other item category exists', () => {
    wrapper = mount(Categories, {
      props: {
        categories: []
      },
      global: {
        mocks: {
          $store
        }
      }
    });
    expect(wrapper.find('#all').exists()).toEqual(true);
    expect(wrapper.findAll('.listed-category').length).toEqual(1);
  });

  it('should have the "active" class applied to the corresponding .listed-category element', () => {
    let listedCategory = wrapper.findAll('.listed-category')[1]
    expect(listedCategory.classes().find((c: string) => c == 'active'));
    expect(listedCategory.text()).toEqual(activeCategory);
  });

  // Props
  it('should have a prop for the available categories array', () => {
    expect(wrapper.vm.categories).toBeDefined();
    expect(wrapper.vm.categories).toEqual(testCategories);
  });

  it('should have a prop for the active category', () => {
    expect(wrapper.vm.activeCategory).toBeDefined();
    expect(wrapper.vm.activeCategory).toEqual(activeCategory);
  });

  // Methods
  it('should have a function to set the active category', () => {
    const category = 'foo'
    wrapper.vm.setActiveCategory(category);
    expect(typeof wrapper.vm.setActiveCategory).toEqual('function');
    expect(dispatch).toHaveBeenCalledWith('setActiveCategory', category)
  });

  it('should have a function to discern if a given category is the same as another category (the active category)', () => {
    const activeCategory = 'foobar';
    const otherCategory = 'something';
    expect(typeof wrapper.vm.isActiveCategory).toEqual('function');
    expect(wrapper.vm.isActiveCategory(otherCategory, activeCategory)).toBeFalsy();
    expect(wrapper.vm.isActiveCategory(activeCategory, activeCategory)).toBeTruthy();
  });
});
