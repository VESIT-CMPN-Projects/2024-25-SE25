import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Vehicle from './Vehicle.js';
import Rto from './Rto.js';

const Fine = sequelize.define('Fine', {
  vehicleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Vehicle,
      key: 'id'
    }
  },
  rtoId: {
    type: DataTypes.INTEGER,
    references: {
      model: Rto,
      key: 'id'
    }
  },
  violationType: {
    type: DataTypes.ENUM('speeding', 'parking', 'signal', 'documents', 'others'),
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'disputed'),
    defaultValue: 'pending',
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: true
});

// Define associations
Fine.belongsTo(Vehicle, { foreignKey: 'vehicleId' });
Fine.belongsTo(Rto, { foreignKey: 'rtoId' });

export default Fine;
