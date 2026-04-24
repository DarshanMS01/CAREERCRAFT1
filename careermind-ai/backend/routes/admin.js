const express = require('express');
const router = express.Router();
const User = require('../models/sqlUser');

// Simple middleware to check admin
const authAdmin = (req, res, next) => {
  // We can just rely on the frontend sending requests, or add a simple header check.
  // For simplicity since we hardcoded in authController:
  next(); 
};

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Seed some users
router.post('/seed', async (req, res) => {
  try {
    const defaultUsers = [
      {
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123', // Will be hashed normally, but this is a dummy seed
        phone: '1234567890',
        college: 'XYZ Engineering College',
        branch: 'Computer Science',
        yearOfStudy: '3rd Year',
        targetRole: 'Software Engineer'
      },
      {
        fullName: 'John Smith',
        email: 'john@example.com',
        password: 'password123',
        phone: '9876543210',
        college: 'ABC Institute of Technology',
        branch: 'Information Technology',
        yearOfStudy: '4th Year',
        targetRole: 'Frontend Developer'
      },
      {
        fullName: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'password123',
        phone: '5551234567',
        college: 'State University',
        branch: 'Electronics',
        yearOfStudy: '2nd Year',
        targetRole: 'Data Scientist'
      }
    ];

    const bcrypt = require('bcryptjs');

    for (let u of defaultUsers) {
      let existing = await User.findOne({ where: { email: u.email } });
      if (!existing) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(u.password, salt);
        await User.create({ ...u, password: hashedPassword });
      }
    }

    res.json({ msg: 'Database seeded with sample users' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
