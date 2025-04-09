
import AdminLayout from "@/components/AdminLayout";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, BarChart as RechartBarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Car, CreditCard, MapPin, AlertTriangle, User, CircleDollarSign } from "lucide-react";

const DashboardPage = () => {
  const { vehicles, fines, yards, reports } = useData();

  // Calculate statistics
  const activeVehicles = vehicles.filter(v => v.status === "Active").length;
  const towedVehicles = vehicles.filter(v => v.status === "Towed").length;
  const suspendedVehicles = vehicles.filter(v => v.status === "Suspended").length;
  
  const totalFines = fines.reduce((sum, fine) => sum + fine.amount, 0);
  const paidFines = fines.filter(f => f.status === "Paid").reduce((sum, fine) => sum + fine.amount, 0);
  const unpaidFines = fines.filter(f => f.status === "Unpaid").reduce((sum, fine) => sum + fine.amount, 0);
  
  const pendingReports = reports.filter(r => r.status === "Pending").length;
  const inProgressReports = reports.filter(r => r.status === "In Progress").length;
  const resolvedReports = reports.filter(r => r.status === "Resolved").length;

  // Monthly fine collection data (mock data)
  const monthlyFineData = [
    { name: "Jan", amount: 45000 },
    { name: "Feb", amount: 52000 },
    { name: "Mar", amount: 48000 },
    { name: "Apr", amount: 61000 },
    { name: "May", amount: 57000 },
    { name: "Jun", amount: 59000 },
    { name: "Jul", amount: 70000 },
    { name: "Aug", amount: 75000 },
    { name: "Sep", amount: 62000 },
    { name: "Oct", amount: 68000 },
    { name: "Nov", amount: 71000 },
    { name: "Dec", amount: 78000 },
  ];

  // Violation type data (mock data)
  const violationData = [
    { name: "Speeding", count: 320 },
    { name: "No Parking", count: 280 },
    { name: "Red Light", count: 240 },
    { name: "No Helmet", count: 190 },
    { name: "Wrong Side", count: 150 },
    { name: "Others", count: 220 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
          <p className="text-gray-500">Welcome to the Transport Management System dashboard.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
              <Car className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehicles.length}</div>
              <p className="text-xs text-gray-500 mt-1">
                Active: {activeVehicles} | Towed: {towedVehicles} | Suspended: {suspendedVehicles}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Fine Amount</CardTitle>
              <CircleDollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalFines.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">
                Paid: ₹{paidFines.toLocaleString()} | Unpaid: ₹{unpaidFines.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Towing Yards</CardTitle>
              <MapPin className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{yards.length}</div>
              <p className="text-xs text-gray-500 mt-1">
                Total Capacity: {yards.reduce((sum, yard) => sum + yard.capacity, 0)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Reports</CardTitle>
              <AlertTriangle className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reports.length}</div>
              <p className="text-xs text-gray-500 mt-1">
                Pending: {pendingReports} | In Progress: {inProgressReports} | Resolved: {resolvedReports}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="monthly">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Analytics</h3>
            <TabsList>
              <TabsTrigger value="monthly">Monthly Revenue</TabsTrigger>
              <TabsTrigger value="violations">Violation Types</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="monthly" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Fine Collection</CardTitle>
                <CardDescription>Fine amount collected per month in the current year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartBarChart data={monthlyFineData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`₹${value}`, 'Amount']}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Bar dataKey="amount" fill="#004AAD" />
                    </RechartBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="violations" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Violation Distribution</CardTitle>
                <CardDescription>Number of violations by type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartBarChart data={violationData} layout="vertical" margin={{ top: 20, right: 30, left: 80, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip 
                        formatter={(value) => [`${value}`, 'Count']}
                        labelFormatter={(label) => `Violation: ${label}`}
                      />
                      <Bar dataKey="count" fill="#004AAD" />
                    </RechartBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Car className="h-5 w-5 text-rtms-blue" />
                </div>
                <div>
                  <p className="font-medium">New vehicle registered</p>
                  <p className="text-sm text-gray-500">KA01MX5432 - Hyundai i10</p>
                  <p className="text-xs text-gray-400">Today, 10:24 AM</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <CreditCard className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Fine payment received</p>
                  <p className="text-sm text-gray-500">DL05CE3456 - ₹2,000 for Speeding</p>
                  <p className="text-xs text-gray-400">Today, 09:45 AM</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">New report submitted</p>
                  <p className="text-sm text-gray-500">Vehicle Theft - MH02BT7890</p>
                  <p className="text-xs text-gray-400">Yesterday, 05:30 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <User className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">New admin user added</p>
                  <p className="text-sm text-gray-500">Rajesh Kumar - Traffic Department</p>
                  <p className="text-xs text-gray-400">Yesterday, 02:15 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
