
module.exports = {};

module.exports.req = ({
  headers = {},
  params = {},
  body = {},
} = {}) => ({
  params,
  body,
  get: jest.fn(key => (
    headers[key]
  )),
});

module.exports.res = (config = {}) => {
  const res = {
    status: jest.fn(),
    json: jest.fn(),
  };

  res.status.mockImplementation(() => res);
  res.json.mockImplementation(() => res);

  return res;
};
