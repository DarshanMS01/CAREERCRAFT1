const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING
  },
  college: {
    type: DataTypes.STRING
  },
  branch: {
    type: DataTypes.STRING
  },
  yearOfStudy: {
    type: DataTypes.STRING
  },
  targetRole: {
    type: DataTypes.STRING
  },
  resumeURL: {
    type: DataTypes.STRING
  },
  interviewAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  joinedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

module.exports = User;
