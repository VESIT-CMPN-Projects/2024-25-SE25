
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Eye, Download, FileText, AlertTriangle } from "lucide-react";

type PaymentRecord = {
  id: string;
  date: string;
  amount: number;
  paymentMethod: string;
  referenceNumber: string;
  status: "success" | "pending" | "failed";
  type: "fine" | "tax" | "permit";
  details: string;
};

const DEMO_PAYMENTS: PaymentRecord[] = [
  {
    id: "pay1",
    date: "2023-09-15",
    amount: 1500,
    paymentMethod: "Credit Card",
    referenceNumber: "TRX123456789",
    status: "success",
    type: "fine",
    details: "Speeding Violation - DL05CE3456"
  },
  {
    id: "pay2",
    date: "2023-08-22",
    amount: 2000,
    paymentMethod: "Debit Card",
    referenceNumber: "TRX987654321",
    status: "success",
    type: "fine",
    details: "Illegal Parking - DL05CE3456"
  },
  {
    id: "pay3",
    date: "2023-07-10",
    amount: 5000,
    paymentMethod: "Net Banking",
    referenceNumber: "TRX456789123",
    status: "success",
    type: "tax",
    details: "Annual Road Tax - DL05CE3456"
  },
  {
    id: "pay4",
    date: "2023-06-05",
    amount: 1200,
    paymentMethod: "UPI",
    referenceNumber: "TRX789123456",
    status: "success",
    type: "fine",
    details: "Wrong Side Driving - DL05CE3456"
  },
  {
    id: "pay5",
    date: "2023-05-18",
    amount: 3000,
    paymentMethod: "Credit Card",
    referenceNumber: "TRX321654987",
    status: "success",
    type: "permit",
    details: "Commercial Vehicle Permit Renewal"
  }
];

const PaymentHistoryPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { fines } = useData();
  
  const [paymentRecords, setPaymentRecords] = useState<PaymentRecord[]>(DEMO_PAYMENTS);
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [paymentType, setPaymentType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Filter payments based on search criteria
  const filteredPayments = paymentRecords.filter(payment => {
    // Date filter
    if (dateFrom && new Date(payment.date) < dateFrom) return false;
    if (dateTo && new Date(payment.date) > dateTo) return false;
    
    // Type filter
    if (paymentType && payment.type !== paymentType) return false;
    
    // Search query filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        payment.referenceNumber.toLowerCase().includes(searchLower) ||
        payment.details.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return "bg-green-100 text-green-800";
      case 'pending':
        return "bg-yellow-100 text-yellow-800";
      case 'failed':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'fine':
        return "Traffic Fine";
      case 'tax':
        return "Road Tax";
      case 'permit':
        return "Permit Fee";
      default:
        return "Payment";
    }
  };
  
  // Handle reset filters
  const resetFilters = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
    setPaymentType("");
    setSearchQuery("");
  };
  
  // If user is not logged in, redirect to login
  if (!currentUser) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-lg mx-auto text-center">
            <Card>
              <CardContent className="pt-6">
                <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
                <h2 className="text-xl font-semibold mb-4">Login Required</h2>
                <p className="text-gray-600 mb-6">
                  Please log in to view your payment history.
                </p>
                <Button onClick={() => navigate("/login")}>
                  Login to Your Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Payment History</h1>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Payments</TabsTrigger>
              <TabsTrigger value="fines">Traffic Fines</TabsTrigger>
              <TabsTrigger value="tax">Road Tax</TabsTrigger>
              <TabsTrigger value="permit">Permit Fees</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle>Filter Payments</CardTitle>
                  <CardDescription>
                    Use the filters below to search through your payment history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">From Date</label>
                      <DatePicker date={dateFrom} setDate={setDateFrom} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">To Date</label>
                      <DatePicker date={dateTo} setDate={setDateTo} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Payment Type</label>
                      <Select value={paymentType} onValueChange={setPaymentType}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="fine">Traffic Fine</SelectItem>
                          <SelectItem value="tax">Road Tax</SelectItem>
                          <SelectItem value="permit">Permit Fee</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Search</label>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Reference no. or details"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="flex-1"
                        />
                        <Button variant="outline" size="icon" onClick={resetFilters}>
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Payment Records</CardTitle>
                  <CardDescription>
                    Showing {filteredPayments.length} payment records
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredPayments.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Details</TableHead>
                          <TableHead>Reference No.</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPayments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>
                              <div className="font-medium">{formatDate(payment.date)}</div>
                              <div className="text-xs text-gray-500">{payment.paymentMethod}</div>
                            </TableCell>
                            <TableCell>
                              <div>{payment.details}</div>
                              <Badge variant="outline" className="mt-1">
                                {getTypeLabel(payment.type)}
                              </Badge>
                            </TableCell>
                            <TableCell>{payment.referenceNumber}</TableCell>
                            <TableCell className="font-medium">₹{payment.amount.toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(payment.status)}>
                                {payment.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">No payment records found matching your criteria.</p>
                      <Button variant="link" onClick={resetFilters}>
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="fines">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Fine Payments</CardTitle>
                  <CardDescription>
                    Only showing payments related to traffic fines
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Violation Details</TableHead>
                        <TableHead>Reference No.</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentRecords
                        .filter(payment => payment.type === 'fine')
                        .map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>
                              <div className="font-medium">{formatDate(payment.date)}</div>
                              <div className="text-xs text-gray-500">{payment.paymentMethod}</div>
                            </TableCell>
                            <TableCell>{payment.details}</TableCell>
                            <TableCell>{payment.referenceNumber}</TableCell>
                            <TableCell className="font-medium">₹{payment.amount.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Receipt
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tax">
              <Card>
                <CardHeader>
                  <CardTitle>Road Tax Payments</CardTitle>
                  <CardDescription>
                    Only showing payments related to road tax
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Reference No.</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentRecords
                        .filter(payment => payment.type === 'tax')
                        .map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>
                              <div className="font-medium">{formatDate(payment.date)}</div>
                              <div className="text-xs text-gray-500">{payment.paymentMethod}</div>
                            </TableCell>
                            <TableCell>{payment.details}</TableCell>
                            <TableCell>{payment.referenceNumber}</TableCell>
                            <TableCell className="font-medium">₹{payment.amount.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Receipt
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="permit">
              <Card>
                <CardHeader>
                  <CardTitle>Permit Fee Payments</CardTitle>
                  <CardDescription>
                    Only showing payments related to vehicle permits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Reference No.</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentRecords
                        .filter(payment => payment.type === 'permit')
                        .map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>
                              <div className="font-medium">{formatDate(payment.date)}</div>
                              <div className="text-xs text-gray-500">{payment.paymentMethod}</div>
                            </TableCell>
                            <TableCell>{payment.details}</TableCell>
                            <TableCell>{payment.referenceNumber}</TableCell>
                            <TableCell className="font-medium">₹{payment.amount.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Receipt
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentHistoryPage;
