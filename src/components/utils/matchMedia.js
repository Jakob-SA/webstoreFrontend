function mockFn() {
    return {
      matches: false,
      media: '',
      onchange: null,
      addListener: () => {}, // deprecated
      removeListener: () => {}, // deprecated
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    };
  }
  
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: mockFn,
  });