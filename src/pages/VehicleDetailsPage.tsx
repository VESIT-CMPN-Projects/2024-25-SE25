
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, AlertTriangle, Car, FileText, Calendar, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const VehicleDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { vehicles, fines, getFinesByVehicle, getVehicleById } = useData();
  
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  
  const vehicle = getVehicleById(id || "");
  const vehicleFines = getFinesByVehicle(id || "");
  
  if (!vehicle) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" onClick={() => navigate("/search-vehicle")} className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button>
            
            <Card>
              <CardContent className="py-16 text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Vehicle Not Found</h2>
                <p className="text-gray-500 mb-6">
                  The vehicle you're looking for doesn't exist or has been removed.
                </p>
                <Button onClick={() => navigate("/search-vehicle")}>
                  Go to Search Page
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    );
  }

  const unpaidFines = vehicleFines.filter(fine => fine.status === "Unpaid");
  const paidFines = vehicleFines.filter(fine => fine.status === "Paid");
  
  const statusColor = {
    Active: "bg-green-100 text-green-800",
    Towed: "bg-red-100 text-red-800",
    Suspended: "bg-amber-100 text-amber-800",
  }[vehicle.status] || "bg-gray-100 text-gray-800";
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={() => navigate("/search-vehicle")} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Search
          </Button>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Vehicle Details</CardTitle>
                    <Badge className={statusColor}>{vehicle.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center pb-4">
                      <div className="mx-auto bg-rtms-lightblue p-4 rounded-full w-20 h-20 flex items-center justify-center mb-3">
                        <Car className="h-10 w-10 text-rtms-blue" />
                      </div>
                      <h3 className="text-xl font-bold">{vehicle.registrationNumber}</h3>
                      <p className="text-gray-500">{vehicle.model}</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Owner Name:</span>
                        <span className="font-medium">{vehicle.ownerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Vehicle Type:</span>
                        <span>{vehicle.vehicleType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Model:</span>
                        <span>{vehicle.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Year:</span>
                        <span>{vehicle.yearOfMfg}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Fuel Type:</span>
                        <span>{vehicle.fuelType}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-gray-500">Chassis No:</span>
                        <span className="font-mono text-sm">{vehicle.chassisNumber}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-gray-500">Engine No:</span>
                        <span className="font-mono text-sm">{vehicle.engineNumber}</span>
                      </div>
                    </div>
                    
                    {vehicle.status === "Towed" && (
                      <div className="mt-4 p-3 bg-red-50 rounded-md border border-red-200">
                        <h4 className="font-semibold text-red-700 flex items-center">
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Vehicle Towed
                        </h4>
                        <p className="text-sm text-red-600 mt-1">
                          This vehicle has been towed. Please contact the nearest traffic police station.
                        </p>
                        <Button variant="outline" className="w-full mt-2" size="sm">
                          <MapPin className="mr-2 h-4 w-4" />
                          Locate Vehicle
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:w-2/3">
              <Card>
                <CardHeader>
                  <CardTitle>Fines & Violations</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="unpaid">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="unpaid">
                        Unpaid Fines ({unpaidFines.length})
                      </TabsTrigger>
                      <TabsTrigger value="paid">
                        Payment History ({paidFines.length})
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="unpaid">
                      {unpaidFines.length > 0 ? (
                        <div>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Violation Type</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {unpaidFines.map(fine => (
                                <TableRow key={fine.id}>
                                  <TableCell className="font-medium">{fine.violationType}</TableCell>
                                  <TableCell>{formatDate(fine.date)}</TableCell>
                                  <TableCell>{fine.location}</TableCell>
                                  <TableCell>₹{fine.amount.toLocaleString()}</TableCell>
                                  <TableCell className="text-right">
                                    <Button size="sm" onClick={() => navigate(`/pay-fines`)}>
                                      <CreditCard className="mr-2 h-4 w-4" />
                                      Pay Now
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          <div className="flex justify-between items-center mt-6">
                            <div>
                              <p className="text-sm text-gray-500">
                                Total Amount Due: 
                                <span className="ml-2 font-bold text-red-600">
                                  ₹{unpaidFines.reduce((sum, fine) => sum + fine.amount, 0).toLocaleString()}
                                </span>
                              </p>
                            </div>
                            <Button onClick={() => navigate('/pay-fines')}>Pay All Fines</Button>
                          </div>
                        </div>
                      ) : (
                        <div className="py-12 text-center">
                          <div className="mx-auto bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                            <FileText className="h-6 w-6 text-green-600" />
                          </div>
                          <h3 className="text-lg font-semibold mb-2">No Unpaid Fines</h3>
                          <p className="text-gray-500 max-w-md mx-auto">
                            This vehicle doesn't have any pending fines or violations.
                          </p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="paid">
                      {paidFines.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Violation Type</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Paid On</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {paidFines.map(fine => (
                              <TableRow key={fine.id}>
                                <TableCell className="font-medium">{fine.violationType}</TableCell>
                                <TableCell>{formatDate(fine.date)}</TableCell>
                                <TableCell>₹{fine.amount.toLocaleString()}</TableCell>
                                <TableCell>
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                    Paid
                                  </span>
                                </TableCell>
                                <TableCell>
                                  {/* In a real app, we'd show the actual payment date */}
                                  {formatDate(new Date().toISOString().split('T')[0])}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="py-12 text-center">
                          <div className="mx-auto bg-gray-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                            <Calendar className="h-6 w-6 text-gray-600" />
                          </div>
                          <h3 className="text-lg font-semibold mb-2">No Payment History</h3>
                          <p className="text-gray-500 max-w-md mx-auto">
                            There is no payment history for this vehicle.
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default VehicleDetailsPage;
