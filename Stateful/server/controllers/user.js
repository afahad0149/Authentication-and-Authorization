const User = require('./../models/user');
const Session = require('./../models/user');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const errMsg = 'The user is already registered';
    console.log(errMsg);
    res.status(401).send(errMsg);
  } else {
    try {
      if (password === '') {
        res.status(401).send('Invalid password');
        throw new Error('Invalid password');
      }
      const encryptedPass = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: encryptedPass });
      const { _id } = await newUser.save();
      const newSession = new Session({ userEmail: email, userId: _id });
      const session = await newSession.save();
      const sessionId = session._id;
      res.setHeader('Authorization', 'Bearer ' + sessionId);
      res.status(201).send(newUser);
    } catch (err) {
      console.log(err);
      res.status(401).send(err);
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(401).send('Invalid email');
    } else if (!password) {
      res.status(401).send('Invalid password');
    }
    const user = await User.findOne({ email });
    if (user) {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        const newSession = new Session({
          userEmail: user.email,
          userId: user._id,
        });
        const session = await newSession.save();
        const sessionId = session._id;
        res.setHeader('Authorization', 'Bearer ' + sessionId);
        res.status(201).send(user);
      } else {
        res.status(401).send('Incorrect credentials');
      }
    } else {
      res.status(401).send('You are not registered yet.');
    }
  } catch (err) {
    console.log(err);
    res.status(401).send('Incorrect username or password');
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { register, login, getAllUsers };
