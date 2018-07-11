
const auth = () => {
  return (req, res, next) => {
    if (req.get('User-Id')) {
      return next();
    }

    res.status(401).json({
      error: 'Unauthorized',
    });
  };
};

module.exports = auth;
