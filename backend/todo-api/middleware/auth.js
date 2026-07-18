const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: 'error',
        error: { code: 'NO_TOKEN', message: 'No authorization token' },
      });
    }
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    req.user = JSON.parse(decoded);
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      error: { code: 'INVALID_TOKEN', message: 'Invalid token' },
    });
  }
};

module.exports = { authenticate };
