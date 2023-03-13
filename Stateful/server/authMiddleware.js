const User = require('./models/user');
const Session = require('./models/session');

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers['Authorization'];
  if (!authHeaders) {
    res.status(403).send('You are not authorized!');
  }
  const sessionId = authHeaders.split(' ')[1];
  try {
    const existingSession = await Session.findOne({ sessionId });
    if (!existingSession) {
      res.status(400).send('Session has expired');
    } else {
      const user = await User.findById(existingSession.userId);
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = authMiddleware;
