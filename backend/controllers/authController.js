import { User, Vehicle } from '../models/index.js';
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '30d' }
  );
};

// Register new user
export const register = async (req, res) => {
  try {
    const { registrationNumber, phoneNumber, name, email } = req.body;

    // Check if vehicle exists
    const vehicle = await Vehicle.findOne({
      where: { 
        registrationNumber,
        phoneNumber
      }
    });

    if (!vehicle) {
      return res.status(400).json({
        message: 'Vehicle not found with this registration number and phone number'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      where: { registrationNumber }
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already registered with this registration number'
      });
    }

    // Create user
    const user = await User.create({
      registrationNumber,
      phoneNumber,
      name,
      email
    });

    const token = generateToken(user);

    res.status(201).json({
      id: user.id,
      registrationNumber: user.registrationNumber,
      name: user.name,
      role: user.role,
      token
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { registrationNumber, phoneNumber } = req.body;

    // Find user
    const user = await User.findOne({
      where: { 
        registrationNumber,
        phoneNumber,
        status: 'active'
      }
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid registration number or phone number'
      });
    }

    const token = generateToken(user);

    res.json({
      id: user.id,
      registrationNumber: user.registrationNumber,
      name: user.name,
      role: user.role,
      token
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (user) {
      res.json({
        id: user.id,
        registrationNumber: user.registrationNumber,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
