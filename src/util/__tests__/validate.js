const validate = require('../validate');

test('required does nothing if valid', () => {
  validate.required({
    a: 0,
    b: '',
    c: 1,
    d: false,
  });
});

test('required throws if invalid', () => {
  expect(() => {
    validate.required({
      a: null,
      b: undefined,
    })
  }).toThrow();
});
