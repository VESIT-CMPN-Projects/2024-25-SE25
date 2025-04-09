import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars with explicit path
dotenv.config({ path: join(__dirname, '.env') });

const { Client } = pg;

// First connect to default database
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: 'postgres', // Connect to default database first
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

console.log('Attempting to connect with config:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: 'postgres',
  user: process.env.DB_USER
});

try {
  await client.connect();
  console.log('Successfully connected to PostgreSQL');
  
  // Check if our database exists
  const dbExists = await client.query("SELECT 1 FROM pg_database WHERE datname = $1", [process.env.DB_NAME]);
  
  if (dbExists.rows.length === 0) {
    console.log(`Creating database ${process.env.DB_NAME}...`);
    // Create the database
    await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
    console.log('Database created successfully');
  } else {
    console.log(`Database ${process.env.DB_NAME} already exists`);
  }
  
  await client.end();
  
  // Now connect to our new database
  const appClient = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });
  
  await appClient.connect();
  console.log(`Successfully connected to ${process.env.DB_NAME} database`);
  const result = await appClient.query('SELECT version()');
  console.log('PostgreSQL version:', result.rows[0]);
  await appClient.end();
} catch (err) {
  console.error('Connection error:', err);
}
