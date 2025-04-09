import { Sequelize } from 'sequelize';
import config from './config.js';

// Debug: Log environment variables
console.log('Database Config:', {
  host: config.host,
  user: config.username,
  database: config.database,
  port: config.port
});

const sequelize = new Sequelize({
  host: config.host,
  port: config.port,
  database: config.database,
  username: config.username,
  password: config.password,
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: false
  }
});

const connectDB = async () => {
  try {
    // First try to connect to postgres database to create our app database
    const tempSequelize = new Sequelize({
      host: config.host,
      port: config.port,
      database: 'postgres',
      username: config.username,
      password: config.password,
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: false
      }
    });

    try {
      // Create database if it doesn't exist
      await tempSequelize.query(`CREATE DATABASE ${config.database}`);
      console.log('Database created');
    } catch (error) {
      if (error.name === 'SequelizeDatabaseError' && error.parent.code === '42P04') {
        console.log('Database already exists');
      } else {
        throw error;
      }
    } finally {
      await tempSequelize.close();
    }

    // Now connect to our app database
    await sequelize.authenticate();
    console.log('PostgreSQL Connected');
    await sequelize.sync({ force: true }); // This will drop and recreate all tables
    console.log('Database synced');
  } catch (error) {
    console.error('Database Connection Error:', error);
    process.exit(1);
  }
};

export { sequelize, connectDB };
