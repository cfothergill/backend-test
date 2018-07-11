
const notFound = () => (req, res) => {
  res.status(404).json({ status: 'not_found' });
};

module.exports = notFound;
