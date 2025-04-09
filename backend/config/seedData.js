import Vehicle from '../models/Vehicle.js';

const testVehicles = [
  {
    registrationNumber: 'MH05CX0520',
    ownerName: 'Sonal',
    phoneNumber: '+918369145238',
    vehicleType: '4-wheeler',
    registrationDate: '2025-04-01',
    insuranceExpiry: '2025-04-30',
    status: 'active'
  },
  {
    registrationNumber: 'MH 01 CD 0987',
    ownerName: 'Amit Patil',
    phoneNumber: '9867484738',
    vehicleType: '3-wheeler',
    registrationDate: '2025-04-24',
    insuranceExpiry: '2025-05-24',
    status: 'active'
  },
  {
    registrationNumber: 'DL 05 CE 3456',
    ownerName: 'Rahul Kumar',
    phoneNumber: '9876543210',
    vehicleType: '4-wheeler',
    registrationDate: '2025-03-15',
    insuranceExpiry: '2026-03-15',
    status: 'active'
  },
  {
    registrationNumber: 'KA 01 AB 1234',
    ownerName: 'Priya Singh',
    phoneNumber: '9898989898',
    vehicleType: '4-wheeler',
    registrationDate: '2025-01-01',
    insuranceExpiry: '2026-01-01',
    status: 'active'
  }
];

export const seedDatabase = async () => {
  try {
    // Add test vehicles
    // First, delete all existing vehicles
    await Vehicle.destroy({
      where: {},
      force: true
    });
    console.log('Cleared existing vehicles');

    // Then create new test vehicles
    await Vehicle.bulkCreate(testVehicles, {
      ignoreDuplicates: true
    });

    console.log('Test data seeded successfully');
  } catch (error) {
    console.error('Error seeding test data:', error);
  }
};
