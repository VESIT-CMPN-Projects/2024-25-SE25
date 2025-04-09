import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const normalizeRegistrationNumber = (regNum) => {
  return regNum.replace(/\s+/g, ' ').trim().toUpperCase();
};

const Vehicle = sequelize.define('Vehicle', {
  registrationNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  ownerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  registrationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  insuranceExpiry: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'expired', 'suspended'),
    defaultValue: 'active',
  }
}, {
  timestamps: true,
  hooks: {
    beforeValidate: (vehicle) => {
      if (vehicle.registrationNumber) {
        vehicle.registrationNumber = normalizeRegistrationNumber(vehicle.registrationNumber);
      }
    }
  }
});

export default Vehicle;
