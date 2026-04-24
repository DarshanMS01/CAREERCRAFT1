const User = require('../models/sqlUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, phone, college, branch, yearOfStudy, targetRole } = req.body;

    let user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ fullName, email, password, phone, college, branch, yearOfStudy, targetRole });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      const userObj = user.get({ plain: true });
      delete userObj.password;
      res.json({ token, user: userObj });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Registration failed. Please try again.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hardcoded Admin Check
    if (email === 'harsha123' && password === 'harsha1432') {
      const payload = { user: { id: 'admin', isAdmin: true } };
      return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
        if (err) throw err;
        return res.json({ token, user: { id: 'admin', fullName: 'Administrator', email: 'harsha123', isAdmin: true } });
      });
    }

    let user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ msg: 'Account with this email does not exist' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Incorrect password. Please try again.' });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      const userObj = user.get({ plain: true });
      delete userObj.password;
      res.json({ token, user: userObj });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Login failed. Please try again later.' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Could not fetch user profile.' });
  }
};
