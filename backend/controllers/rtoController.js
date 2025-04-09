import Rto from '../models/Rto.js';

// Get all RTOs
export const getRtos = async (req, res) => {
  try {
    const rtos = await Rto.find({});
    res.json(rtos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single RTO
export const getRtoById = async (req, res) => {
  try {
    const rto = await Rto.findById(req.params.id);
    if (rto) {
      res.json(rto);
    } else {
      res.status(404).json({ message: 'RTO not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create RTO
export const createRto = async (req, res) => {
  try {
    const rto = await Rto.create(req.body);
    res.status(201).json(rto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update RTO
export const updateRto = async (req, res) => {
  try {
    const rto = await Rto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (rto) {
      res.json(rto);
    } else {
      res.status(404).json({ message: 'RTO not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete RTO
export const deleteRto = async (req, res) => {
  try {
    const rto = await Rto.findByIdAndDelete(req.params.id);
    if (rto) {
      res.json({ message: 'RTO removed' });
    } else {
      res.status(404).json({ message: 'RTO not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
