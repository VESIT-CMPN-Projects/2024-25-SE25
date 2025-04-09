import { sequelize } from '../config/db.js';
import Rto from '../models/Rto.js';

const initRto = async () => {
  try {
    // Sync the database
    await sequelize.sync();

    // Create default RTO
    const defaultRto = await Rto.create({
      name: "Mumbai Central RTO",
      code: "MH01",
      district: "Mumbai",
      state: "Maharashtra",
      address: "123 RTO Complex, Tardeo Road, Mumbai",
      contactNumber: "022-23456789",
      email: "mumbai.central@rto.gov.in"
    });

    console.log('Default RTO created:', defaultRto.toJSON());
    process.exit(0);
  } catch (error) {
    console.error('Error initializing RTO:', error);
    process.exit(1);
  }
};

initRto();
