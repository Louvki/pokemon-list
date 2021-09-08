import { shallowMount } from '@vue/test-utils';
import Pagination from '@/components/Pagination.vue';

describe('Pagination.vue', () => {
  it('renders', () => {
    const currentPage = 1;
    const numberOfPages = 10;
    const wrapper = shallowMount(Pagination, {
      props: { currentPage, numberOfPages},
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('Clicking on previous button calls the changeCurrentPage method', () => {
    const currentPage = 1;
    const numberOfPages = 10;
    const wrapper = shallowMount(Pagination, {
      props: { currentPage, numberOfPages},
    });
    expect(wrapper.find('.previous-btn').exists()).toBe(true);
    const previousBtn = wrapper.find('.previous-btn');

    const spy = spyOn(wrapper.vm, 'changeCurrentPage');
    previousBtn.trigger('click');
    expect(spy).toHaveBeenCalled();
  });

  it('Clicking on next button calls the changeCurrentPage method', () => {
    const currentPage = 1;
    const numberOfPages = 10;
    const wrapper = shallowMount(Pagination, {
      props: { currentPage, numberOfPages},
    });
    expect(wrapper.find('.next-btn').exists()).toBe(true);
    const nextBtn = wrapper.find('.next-btn');

    const spy = spyOn(wrapper.vm, 'changeCurrentPage');
    nextBtn.trigger('click');
    expect(spy).toHaveBeenCalled();
  });


  it('Calling changeCurentPage within range emits event with new page value', async () => {
    const currentPage = 2;
    const numberOfPages = 10;
    const wrapper = shallowMount(Pagination, {
      props: { currentPage, numberOfPages},
    });
    wrapper.vm.changeCurrentPage(3);

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().currentPageChanged).toBeTruthy();
    expect(wrapper.emitted().currentPageChanged[0]).toEqual([3]);
  });

    it('Calling changeCurrentPage outside the range of "1 - numberOfPages" results in no event emitted', async () => {
    const currentPage = 2;
    const numberOfPages = 10;
    const wrapper = shallowMount(Pagination, {
      props: { currentPage, numberOfPages},
    });

    wrapper.vm.changeCurrentPage(0);
    wrapper.vm.changeCurrentPage(11);

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().currentPageChanged).toBeFalsy();
  });
});
