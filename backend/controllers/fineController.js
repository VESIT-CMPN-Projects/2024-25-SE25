import { Fine, Vehicle, Rto } from '../models/index.js';
import { sendFineNotification } from '../services/smsService.js';

// Get all fines
export const getFines = async (req, res) => {
  try {
    const fines = await Fine.findAll({
      include: [
        {
          model: Vehicle,
          attributes: ['registrationNumber', 'ownerName', 'phoneNumber']
        },
        {
          model: Rto,
          attributes: ['name', 'code']
        }
      ]
    });
    res.json(fines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get fines by vehicle and phone number
export const getFinesByVehicle = async (req, res) => {
  try {
    const { registrationNumber, phoneNumber } = req.query;
    
    if (!registrationNumber || !phoneNumber) {
      return res.status(400).json({ message: 'Registration number and phone number are required' });
    }

    const vehicle = await Vehicle.findOne({
      where: {
        registrationNumber,
        phoneNumber
      }
    });

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found or phone number does not match' });
    }

    const fines = await Fine.findAll({
      where: { vehicleId: vehicle.id },
      include: [
        {
          model: Vehicle,
          attributes: ['registrationNumber', 'ownerName', 'phoneNumber']
        },
        {
          model: Rto,
          attributes: ['name', 'code']
        }
      ]
    });
    res.json(fines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single fine
export const getFineById = async (req, res) => {
  try {
    const fine = await Fine.findByPk(req.params.id, {
      include: [
        {
          model: Vehicle,
          attributes: ['registrationNumber', 'ownerName', 'phoneNumber']
        },
        {
          model: Rto,
          attributes: ['name', 'code']
        }
      ]
    });
    
    if (fine) {
      res.json(fine);
    } else {
      res.status(404).json({ message: 'Fine not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create fine
export const createFine = async (req, res) => {
  try {
    console.log('Received fine data:', req.body);
    const { registrationNumber, violationType, amount, dueDate, location, description } = req.body;

    if (!registrationNumber || !violationType || !amount || !dueDate) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['registrationNumber', 'violationType', 'amount', 'dueDate'],
        received: req.body
      });
    }

    // First find the vehicle by registration number
    const vehicle = await Vehicle.findOne({
      where: { registrationNumber }
    });

    console.log('Found vehicle:', vehicle);

    if (!vehicle) {
      return res.status(404).json({ 
        message: 'Vehicle not found',
        registrationNumber
      });
    }

    // Get or create default RTO
    let defaultRto = await Rto.findOne({
      where: { code: 'DEFAULT' }
    });

    if (!defaultRto) {
      defaultRto = await Rto.create({
        name: 'Default RTO',
        code: 'DEFAULT',
        city: 'Default City',
        state: 'Default State'
      });
    }

    // Create the fine with the found vehicle ID and default RTO
    const fine = await Fine.create({
      vehicleId: vehicle.id,
      rtoId: defaultRto.id,
      violationType,
      amount: parseFloat(amount),
      dueDate: new Date(dueDate),
      location: location || 'Not specified',
      description: description || 'No description provided',
      status: 'pending'
    });

    console.log('Created fine:', fine);

    // Return the populated fine with vehicle details
    const populatedFine = await Fine.findByPk(fine.id, {
      include: [
        {
          model: Vehicle,
          attributes: ['registrationNumber', 'ownerName', 'phoneNumber']
        },
        {
          model: Rto,
          attributes: ['name', 'code']
        }
      ]
    });
    // Send SMS notification
    try {
      if (!vehicle.phoneNumber) {
        throw new Error('Vehicle phone number is missing');
      }
      
      console.log('Attempting to send SMS to:', vehicle.phoneNumber);
      const smsResult = await sendFineNotification(vehicle.phoneNumber, {
        amount,
        registrationNumber,
        violationType,
        dueDate
      });
      
      console.log('SMS sent successfully:', smsResult.sid);
      res.status(201).json({
        ...populatedFine.toJSON(),
        smsStatus: 'sent'
      });
    } catch (smsError) {
      console.error('Failed to send SMS notification:', smsError);
      // Return the fine with SMS error status
      res.status(201).json({
        ...populatedFine.toJSON(),
        smsStatus: 'failed',
        smsError: smsError.message
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update fine
export const updateFine = async (req, res) => {
  try {
    const fine = await Fine.findByPk(req.params.id);
    if (fine) {
      await fine.update(req.body);
      const updatedFine = await Fine.findByPk(req.params.id, {
        include: [
          {
            model: Vehicle,
            attributes: ['registrationNumber', 'ownerName', 'phoneNumber']
          },
          {
            model: Rto,
            attributes: ['name', 'code']
          }
        ]
      });
      res.json(updatedFine);
    } else {
      res.status(404).json({ message: 'Fine not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete fine
export const deleteFine = async (req, res) => {
  try {
    const fine = await Fine.findByPk(req.params.id);
    if (fine) {
      await fine.destroy();
      res.json({ message: 'Fine removed' });
    } else {
      res.status(404).json({ message: 'Fine not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
