import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

// Define Types
export interface Vehicle {
  id: string;
  registrationNumber: string;
  ownerName: string;
  vehicleType: string;
  model: string;
  yearOfMfg: string;
  chassisNumber: string;
  engineNumber: string;
  fuelType: string;
  status: "Active" | "Towed" | "Suspended";
}

export interface Fine {
  id: string;
  vehicleId: string;
  registrationNumber: string;
  violationType: string;
  amount: number;
  date: string;
  location: string;
  status: "Paid" | "Unpaid";
  officerName: string;
  description?: string;
}

export interface Yard {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  capacity: number;
  currentOccupancy: number;
  latitude: number;
  longitude: number;
}

export interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  email: string;
  type: string;
  description: string;
  date: string;
  status: "Pending" | "In Progress" | "Resolved";
  vehicleNumber?: string;
}

interface DataContextType {
  vehicles: Vehicle[];
  fines: Fine[];
  yards: Yard[];
  reports: Report[];
  loading: {
    vehicles: boolean;
    fines: boolean;
    yards: boolean;
    reports: boolean;
  };
  error: string | null;
  addVehicle: (vehicle: Omit<Vehicle, "id">) => Promise<void>;
  updateVehicle: (id: string, vehicleData: Partial<Vehicle>) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
  getVehicleById: (id: string) => Vehicle | undefined;
  getVehicleByRegistration: (registrationNumber: string) => Vehicle | undefined;
  addFine: (fine: Omit<Fine, "id">) => Promise<void>;
  updateFine: (id: string, fineData: Partial<Fine>) => Promise<void>;
  payFine: (id: string) => Promise<void>;
  deleteFine: (id: string) => Promise<void>;
  getFineById: (id: string) => Fine | undefined;
  getFinesByVehicle: (vehicleId: string) => Fine[];
  getUnpaidFinesByVehicle: (vehicleId: string) => Fine[];
  addReport: (report: Omit<Report, "id" | "date" | "status">) => Promise<void>;
  updateReportStatus: (id: string, status: Report["status"]) => Promise<void>;
}

// Mock Data
const mockVehicles: Vehicle[] = [
  {
    id: "v1",
    registrationNumber: "DL05CE3456",
    ownerName: "Rahul Sharma",
    vehicleType: "Car",
    model: "Maruti Swift",
    yearOfMfg: "2018",
    chassisNumber: "MABC123456XY78901",
    engineNumber: "EN123456789",
    fuelType: "Petrol",
    status: "Active"
  },
  {
    id: "v2",
    registrationNumber: "MH02BT7890",
    ownerName: "Priya Patel",
    vehicleType: "Motorcycle",
    model: "Honda Activa",
    yearOfMfg: "2020",
    chassisNumber: "HOND987654AB32109",
    engineNumber: "EN987654321",
    fuelType: "Petrol",
    status: "Towed"
  },
  {
    id: "v3",
    registrationNumber: "KA01MX5432",
    ownerName: "Arun Kumar",
    vehicleType: "Car",
    model: "Hyundai i10",
    yearOfMfg: "2019",
    chassisNumber: "HYUN567890CD45678",
    engineNumber: "EN567891234",
    fuelType: "CNG",
    status: "Active"
  },
  {
    id: "v4",
    registrationNumber: "TN07AK2468",
    ownerName: "Divya Krishnan",
    vehicleType: "Car",
    model: "Toyota Innova",
    yearOfMfg: "2021",
    chassisNumber: "TOYT246813EF79012",
    engineNumber: "EN246813579",
    fuelType: "Diesel",
    status: "Suspended"
  }
];

const mockFines: Fine[] = [
  {
    id: "f1",
    vehicleId: "v1",
    registrationNumber: "DL05CE3456",
    violationType: "Speeding",
    amount: 2000,
    date: "2023-06-15",
    location: "MG Road, Delhi",
    status: "Paid",
    officerName: "Officer Singh",
    description: "Caught speeding at 80km/h in a 50km/h zone"
  },
  {
    id: "f2",
    vehicleId: "v1",
    registrationNumber: "DL05CE3456",
    violationType: "No Parking",
    amount: 1000,
    date: "2023-07-20",
    location: "Connaught Place, Delhi",
    status: "Unpaid",
    officerName: "Officer Kumar",
    description: "Parked in a no-parking zone"
  },
  {
    id: "f3",
    vehicleId: "v2",
    registrationNumber: "MH02BT7890",
    violationType: "No Helmet",
    amount: 1500,
    date: "2023-08-05",
    location: "Bandra, Mumbai",
    status: "Unpaid",
    officerName: "Officer Patil",
    description: "Riding without helmet"
  },
  {
    id: "f4",
    vehicleId: "v3",
    registrationNumber: "KA01MX5432",
    violationType: "Red Light Violation",
    amount: 2500,
    date: "2023-09-10",
    location: "MG Road, Bangalore",
    status: "Paid",
    officerName: "Officer Reddy",
    description: "Crossed red light at junction"
  }
];

const mockYards: Yard[] = [
  {
    id: "y1",
    name: "Central Yard Delhi",
    address: "123 Transport Nagar",
    city: "Delhi",
    state: "Delhi",
    phone: "+91-1122334455",
    capacity: 200,
    currentOccupancy: 156,
    latitude: 28.7041,
    longitude: 77.1025
  },
  {
    id: "y2",
    name: "Mumbai West Yard",
    address: "456 Transport Complex",
    city: "Mumbai",
    state: "Maharashtra",
    phone: "+91-9988776655",
    capacity: 150,
    currentOccupancy: 103,
    latitude: 19.0760,
    longitude: 72.8777
  },
  {
    id: "y3",
    name: "Bangalore South Yard",
    address: "789 Vehicle Park",
    city: "Bangalore",
    state: "Karnataka",
    phone: "+91-8877665544",
    capacity: 120,
    currentOccupancy: 89,
    latitude: 12.9716,
    longitude: 77.5946
  }
];

const mockReports: Report[] = [
  {
    id: "r1",
    reporterId: "u1",
    reporterName: "Vikram Singh",
    email: "vikram@example.com",
    type: "Vehicle Theft",
    description: "My car was stolen from outside my house last night.",
    date: "2023-09-15",
    status: "In Progress",
    vehicleNumber: "DL05CE3456"
  },
  {
    id: "r2",
    reporterId: "u2",
    reporterName: "Meera Joshi",
    email: "meera@example.com",
    type: "Incorrect Fine",
    description: "I received a fine for a vehicle I don't own.",
    date: "2023-09-20",
    status: "Pending",
    vehicleNumber: "MH02BT7890"
  },
  {
    id: "r3",
    reporterId: "u3",
    reporterName: "Sanjay Kumar",
    email: "sanjay@example.com",
    type: "System Issue",
    description: "Unable to pay fine online, getting error.",
    date: "2023-09-25",
    status: "Resolved"
  }
];

// Create Context
const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [fines, setFines] = useState<Fine[]>([]);
  const [yards, setYards] = useState<Yard[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState({
    vehicles: true,
    fines: true,
    yards: true,
    reports: true,
  });
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data - in a real app, this would call APIs
  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate API calls with a slight delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setVehicles(mockVehicles);
        setFines(mockFines);
        setYards(mockYards);
        setReports(mockReports);
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setLoading({
          vehicles: false,
          fines: false,
          yards: false,
          reports: false,
        });
      }
    };

    loadData();
  }, []);

  // Vehicle functions
  const addVehicle = async (vehicle: Omit<Vehicle, "id">) => {
    try {
      const newVehicle: Vehicle = {
        ...vehicle,
        id: `v${Date.now()}`,
      };
      setVehicles(prev => [...prev, newVehicle]);
      toast({
        title: "Vehicle Added",
        description: `Vehicle ${vehicle.registrationNumber} has been added successfully.`,
      });
    } catch (err) {
      setError("Failed to add vehicle");
      throw err;
    }
  };

  const updateVehicle = async (id: string, vehicleData: Partial<Vehicle>) => {
    try {
      setVehicles(prev =>
        prev.map(vehicle =>
          vehicle.id === id ? { ...vehicle, ...vehicleData } : vehicle
        )
      );
      toast({
        title: "Vehicle Updated",
        description: "Vehicle details have been updated successfully.",
      });
    } catch (err) {
      setError("Failed to update vehicle");
      throw err;
    }
  };

  const deleteVehicle = async (id: string) => {
    try {
      setVehicles(prev => prev.filter(vehicle => vehicle.id !== id));
      toast({
        title: "Vehicle Deleted",
        description: "Vehicle has been deleted successfully.",
      });
    } catch (err) {
      setError("Failed to delete vehicle");
      throw err;
    }
  };

  const getVehicleById = (id: string) => {
    return vehicles.find(vehicle => vehicle.id === id);
  };

  const getVehicleByRegistration = (registrationNumber: string) => {
    return vehicles.find(vehicle => vehicle.registrationNumber === registrationNumber);
  };

  // Fine functions
  const addFine = async (fine: Omit<Fine, "id">) => {
    try {
      const newFine: Fine = {
        ...fine,
        id: `f${Date.now()}`,
      };
      setFines(prev => [...prev, newFine]);
      toast({
        title: "Fine Added",
        description: `Fine for vehicle ${fine.registrationNumber} has been added successfully.`,
      });
    } catch (err) {
      setError("Failed to add fine");
      throw err;
    }
  };

  const updateFine = async (id: string, fineData: Partial<Fine>) => {
    try {
      setFines(prev =>
        prev.map(fine =>
          fine.id === id ? { ...fine, ...fineData } : fine
        )
      );
      toast({
        title: "Fine Updated",
        description: "Fine details have been updated successfully.",
      });
    } catch (err) {
      setError("Failed to update fine");
      throw err;
    }
  };

  const payFine = async (id: string) => {
    try {
      setFines(prev =>
        prev.map(fine =>
          fine.id === id ? { ...fine, status: "Paid" } : fine
        )
      );
      toast({
        title: "Payment Successful",
        description: "Fine has been paid successfully.",
      });
    } catch (err) {
      setError("Failed to process payment");
      throw err;
    }
  };

  const deleteFine = async (id: string) => {
    try {
      setFines(prev => prev.filter(fine => fine.id !== id));
      toast({
        title: "Fine Deleted",
        description: "Fine has been deleted successfully.",
      });
    } catch (err) {
      setError("Failed to delete fine");
      throw err;
    }
  };

  const getFineById = (id: string) => {
    return fines.find(fine => fine.id === id);
  };

  const getFinesByVehicle = (vehicleId: string) => {
    return fines.filter(fine => fine.vehicleId === vehicleId);
  };

  const getUnpaidFinesByVehicle = (vehicleId: string) => {
    return fines.filter(fine => fine.vehicleId === vehicleId && fine.status === "Unpaid");
  };

  // Report functions
  const addReport = async (report: Omit<Report, "id" | "date" | "status">) => {
    try {
      const newReport: Report = {
        ...report,
        id: `r${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        status: "Pending",
      };
      setReports(prev => [...prev, newReport]);
      toast({
        title: "Report Submitted",
        description: "Your report has been submitted successfully.",
      });
    } catch (err) {
      setError("Failed to submit report");
      throw err;
    }
  };

  const updateReportStatus = async (id: string, status: Report["status"]) => {
    try {
      setReports(prev =>
        prev.map(report =>
          report.id === id ? { ...report, status } : report
        )
      );
      toast({
        title: "Report Updated",
        description: `Report status has been updated to ${status}.`,
      });
    } catch (err) {
      setError("Failed to update report");
      throw err;
    }
  };

  const value = {
    vehicles,
    fines,
    yards,
    reports,
    loading,
    error,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    getVehicleById,
    getVehicleByRegistration,
    addFine,
    updateFine,
    payFine,
    deleteFine,
    getFineById,
    getFinesByVehicle,
    getUnpaidFinesByVehicle,
    addReport,
    updateReportStatus,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
