"use strict";

var _testUtils = require("@vue/test-utils");

var _Pagination = _interopRequireDefault(require("@/components/Pagination.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Pagination.vue', function () {
  it('renders', function () {
    var currentPage = 1;
    var numberOfPages = 10;
    var wrapper = (0, _testUtils.shallowMount)(_Pagination["default"], {
      props: {
        currentPage: currentPage,
        numberOfPages: numberOfPages
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
  it('Clicking on previous button calls the changeCurrentPage method', function () {
    var currentPage = 1;
    var numberOfPages = 10;
    var wrapper = (0, _testUtils.shallowMount)(_Pagination["default"], {
      props: {
        currentPage: currentPage,
        numberOfPages: numberOfPages
      }
    });
    expect(wrapper.find('.previous-btn').exists()).toBe(true);
    var previousBtn = wrapper.find('.previous-btn');
    var spy = spyOn(wrapper.vm, 'changeCurrentPage');
    previousBtn.trigger('click');
    expect(spy).toHaveBeenCalled();
  });
  it('Clicking on next button calls the changeCurrentPage method', function () {
    var currentPage = 1;
    var numberOfPages = 10;
    var wrapper = (0, _testUtils.shallowMount)(_Pagination["default"], {
      props: {
        currentPage: currentPage,
        numberOfPages: numberOfPages
      }
    });
    expect(wrapper.find('.next-btn').exists()).toBe(true);
    var nextBtn = wrapper.find('.next-btn');
    var spy = spyOn(wrapper.vm, 'changeCurrentPage');
    nextBtn.trigger('click');
    expect(spy).toHaveBeenCalled();
  });
  it('Calling changeCurentPage emits event', function _callee() {
    var currentPage, numberOfPages, wrapper;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            currentPage = 2;
            numberOfPages = 10;
            wrapper = (0, _testUtils.shallowMount)(_Pagination["default"], {
              props: {
                currentPage: currentPage,
                numberOfPages: numberOfPages
              }
            }); // expect(wrapper.find('.next-btn').exists()).toBe(true)
            // const nextBtn = wrapper.find('.next-btn')
            // nextBtn.trigger('click')

            wrapper.vm.changeCurrentPage(3);
            _context.next = 6;
            return regeneratorRuntime.awrap(wrapper.vm.$nextTick());

          case 6:
            expect(wrapper.emitted().currentPageChanged).toBeTruthy();
            expect(wrapper.emitted().currentPageChanged[0]).toEqual([3]);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    });
  });
});