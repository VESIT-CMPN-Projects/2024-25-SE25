import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Vehicle from '../models/Vehicle.js';
import Rto from '../models/Rto.js';
import Fine from '../models/Fine.js';

dotenv.config();

const sampleRtos = [
  {
    name: "Mumbai Central RTO",
    code: "MH01",
    district: "Mumbai",
    state: "Maharashtra",
    address: "123 RTO Complex, Tardeo Road, Mumbai",
    contactNumber: "022-23456789",
    email: "mumbai.central@rto.gov.in"
  },
  {
    name: "Delhi Central RTO",
    code: "DL01",
    district: "Central Delhi",
    state: "Delhi",
    address: "456 Transport Building, Rajpur Road, Delhi",
    contactNumber: "011-23456789",
    email: "delhi.central@rto.gov.in"
  }
];

const sampleVehicles = [
  {
    registrationNumber: "MH01AB1234",
    ownerName: "Rahul Sharma",
    vehicleType: "Car",
    registrationDate: new Date('2024-01-15'),
    insuranceExpiry: new Date('2025-01-14'),
    status: "active"
  },
  {
    registrationNumber: "DL01CD5678",
    ownerName: "Priya Patel",
    vehicleType: "Two Wheeler",
    registrationDate: new Date('2024-02-20'),
    insuranceExpiry: new Date('2025-02-19'),
    status: "active"
  }
];

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    // Clear existing data
    await Vehicle.deleteMany();
    await Rto.deleteMany();
    await Fine.deleteMany();

    // Add RTOs
    const createdRtos = await Rto.insertMany(sampleRtos);
    console.log('RTOs added:', createdRtos);

    // Add Vehicles
    const createdVehicles = await Vehicle.insertMany(sampleVehicles);
    console.log('Vehicles added:', createdVehicles);

    // Add Fines using the created RTOs and Vehicles
    const sampleFines = [
      {
        vehicleId: createdVehicles[0]._id,
        rtoId: createdRtos[0]._id,
        violationType: "speeding",
        amount: 1000,
        status: "pending",
        dueDate: new Date('2025-05-01'),
        description: "Exceeding speed limit by 20km/h on Western Express Highway",
        location: "Western Express Highway, Mumbai"
      },
      {
        vehicleId: createdVehicles[1]._id,
        rtoId: createdRtos[1]._id,
        violationType: "parking",
        amount: 500,
        status: "pending",
        dueDate: new Date('2025-05-01'),
        description: "Illegal parking in no-parking zone",
        location: "Connaught Place, Delhi"
      }
    ];

    const createdFines = await Fine.insertMany(sampleFines);
    console.log('Fines added:', createdFines);

    console.log('Sample data imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Connect to database and import data
connectDB().then(() => {
  importData();
});
