import Vehicle from './Vehicle.js';
import Fine from './Fine.js';
import Rto from './Rto.js';
import User from './User.js';

// Define associations
Rto.hasMany(Vehicle, { foreignKey: 'rtoId' });
Vehicle.belongsTo(Rto, { foreignKey: 'rtoId' });

Rto.hasMany(Fine, { foreignKey: 'rtoId' });
Fine.belongsTo(Rto, { foreignKey: 'rtoId' });

Vehicle.hasMany(Fine, { foreignKey: 'vehicleId' });
Fine.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

Vehicle.hasMany(User, { foreignKey: 'registrationNumber', sourceKey: 'registrationNumber' });
User.belongsTo(Vehicle, { foreignKey: 'registrationNumber', targetKey: 'registrationNumber' });

export { Vehicle, Fine, Rto, User };
