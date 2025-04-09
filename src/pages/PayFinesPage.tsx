import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { useData, Fine } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Search, AlertCircle, CreditCard, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const PayFinesPage = () => {
  const navigate = useNavigate();
  const { vehicles, fines, payFine } = useData();
  const { currentUser } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Fine[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [selectedFine, setSelectedFine] = useState<Fine | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setError("Please enter a registration number");
      return;
    }
    
    setError("");
    setIsSearching(true);
    setSearched(true);

    // Simulate API call delay
    setTimeout(() => {
      const results = fines.filter(
        fine => 
          fine.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
          fine.status === "Unpaid"
      );
      
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  const openPaymentDialog = (fine: Fine) => {
    setSelectedFine(fine);
    setIsPaymentDialogOpen(true);
    setPaymentSuccess(false);
  };

  const handlePayment = async () => {
    if (!selectedFine) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await payFine(selectedFine.id);
      setPaymentSuccess(true);
      
      // Update the search results after payment
      setSearchResults(prev => prev.filter(fine => fine.id !== selectedFine.id));
      
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getVehicleModel = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle?.model || "Unknown";
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Pay Traffic Fines</h1>
          
          <Tabs defaultValue="search">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="search">Search by Vehicle</TabsTrigger>
              <TabsTrigger value="direct" disabled={!currentUser}>
                Your Unpaid Fines
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="search">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Find Unpaid Fines</CardTitle>
                  <CardDescription>
                    Enter the vehicle registration number to check for any unpaid fines
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Input
                        type="text"
                        placeholder="Enter registration number (e.g., DL05CE3456)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" disabled={isSearching}>
                        {isSearching ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Searching...
                          </>
                        ) : (
                          <>
                            <Search className="mr-2 h-4 w-4" />
                            Search
                          </>
                        )}
                      </Button>
                    </div>
                    
                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                  </form>
                </CardContent>
              </Card>
              
              {searched && !isSearching && (
                <div>
                  {searchResults.length > 0 ? (
                    <Card>
                      <CardHeader>
                        <CardTitle>Unpaid Fines</CardTitle>
                        <CardDescription>
                          The following unpaid fines are associated with "{searchTerm}"
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Registration No.</TableHead>
                              <TableHead>Violation Type</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {searchResults.map((fine) => (
                              <TableRow key={fine.id}>
                                <TableCell className="font-medium">{fine.registrationNumber}</TableCell>
                                <TableCell>{fine.violationType}</TableCell>
                                <TableCell>{formatDate(fine.date)}</TableCell>
                                <TableCell>₹{fine.amount.toLocaleString()}</TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    size="sm"
                                    onClick={() => openPaymentDialog(fine)}
                                  >
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Pay Now
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <p className="text-sm text-muted-foreground">
                          Total amount: ₹{searchResults.reduce((sum, fine) => sum + fine.amount, 0).toLocaleString()}
                        </p>
                        <Button 
                          onClick={() => {
                            if (searchResults.length > 0) {
                              openPaymentDialog(searchResults[0]);
                            }
                          }}
                        >
                          Pay All Fines
                        </Button>
                      </CardFooter>
                    </Card>
                  ) : (
                    <Alert className="bg-green-50">
                      <Check className="h-4 w-4 text-green-600" />
                      <AlertDescription>
                        No unpaid fines found for registration number "{searchTerm}".
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="direct">
              {!currentUser ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="mb-4">Please log in to view your unpaid fines.</p>
                      <Button onClick={() => navigate("/login")}>
                        Login
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Unpaid Fines</CardTitle>
                    <CardDescription>
                      Showing all unpaid fines associated with your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* This would typically show fines associated with the logged-in user */}
                    <p className="text-center py-6 text-muted-foreground">
                      You don't have any unpaid fines at the moment.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
          
          {/* Payment Dialog */}
          <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              {!paymentSuccess ? (
                <>
                  <DialogHeader>
                    <DialogTitle>Pay Fine</DialogTitle>
                    <DialogDescription>
                      Complete the payment to clear your fine
                    </DialogDescription>
                  </DialogHeader>
                  
                  {selectedFine && (
                    <div className="space-y-6 py-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Registration Number:</span>
                          <span className="font-medium">{selectedFine.registrationNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Vehicle:</span>
                          <span className="font-medium">{getVehicleModel(selectedFine.vehicleId)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Violation:</span>
                          <span className="font-medium">{selectedFine.violationType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date:</span>
                          <span className="font-medium">{formatDate(selectedFine.date)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Location:</span>
                          <span className="font-medium">{selectedFine.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="font-medium text-lg">₹{selectedFine.amount.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input id="expiryDate" placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cardholderName">Cardholder Name</Label>
                          <Input id="cardholderName" placeholder="John Doe" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handlePayment} disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Pay ₹{selectedFine?.amount.toLocaleString()}
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </>
              ) : (
                <div className="py-12 space-y-6 text-center">
                  <div className="mx-auto bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
                    <p className="text-muted-foreground">
                      Your payment has been processed successfully. A receipt has been sent to your email.
                    </p>
                  </div>
                  <Button onClick={() => setIsPaymentDialogOpen(false)}>
                    Close
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </MainLayout>
  );
};

export default PayFinesPage;
