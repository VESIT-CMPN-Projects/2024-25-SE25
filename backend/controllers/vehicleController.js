import Vehicle from '../models/Vehicle.js';
import { Op } from 'sequelize';

// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Public
export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ message: 'Failed to fetch vehicles' });
  }
};

// @desc    Get single vehicle
// @route   GET /api/vehicles/:id
// @access  Public
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (vehicle) {
      res.json(vehicle);
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a vehicle
// @route   POST /api/vehicles
// @access  Public
export const createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a vehicle
// @route   PUT /api/vehicles/:id
// @access  Public
export const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (vehicle) {
      await vehicle.update(req.body);
      res.json(vehicle);
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a vehicle
// @route   DELETE /api/vehicles/:id
// @access  Public
export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (vehicle) {
      await vehicle.destroy();
      res.json({ message: 'Vehicle removed' });
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search vehicle by registration number and phone number
// @route   GET /api/vehicles/search
// @access  Public
const normalizeRegistrationNumber = (regNum) => {
  return regNum.replace(/\s+/g, ' ').trim().toUpperCase();
};

export const searchVehicle = async (req, res) => {
  try {
    const { registrationNumber, phoneNumber } = req.query;
    console.log('Search request received:', { registrationNumber, phoneNumber });

    if (!registrationNumber || !phoneNumber) {
      console.log('Missing required fields');
      return res.status(400).json({
        message: 'Both registration number and phone number are required'
      });
    }

    // Debug: Check existing vehicles
    const allVehicles = await Vehicle.findAll();
    console.log('All vehicles in database:', allVehicles.map(v => ({ 
      registrationNumber: v.registrationNumber, 
      phoneNumber: v.phoneNumber 
    })));

    const normalizedRegNumber = normalizeRegistrationNumber(registrationNumber);
    console.log('Normalized registration number:', normalizedRegNumber);

    const vehicle = await Vehicle.findOne({
      where: {
        registrationNumber: normalizedRegNumber,
        phoneNumber: phoneNumber
      }
    });
    
    console.log('Search result:', vehicle);

    if (!vehicle) {
      return res.status(404).json({
        message: 'No vehicle found with the provided registration number and phone number'
      });
    }

    res.json(vehicle);
  } catch (error) {
    console.error('Error searching vehicle:', error);
    res.status(500).json({ message: 'Failed to search vehicle' });
  }
};
