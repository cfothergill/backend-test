
const required = (obj) => {
  Object.keys(obj).forEach(key => {
    const value = obj[key];

    if (typeof value === 'undefined' || value === null) {
      throw new Error(`${key} is required.`);
    }
  });
};

module.exports = { required };
