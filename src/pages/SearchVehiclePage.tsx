
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Search, AlertCircle, FileText } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Vehicle {
  id: string;
  registrationNumber: string;
  ownerName: string;
  vehicleType: string;
  status: string;
  phoneNumber: string;
}

const SearchVehiclePage = () => {
  console.log('Rendering SearchVehiclePage');
  const navigate = useNavigate();
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchResults, setSearchResults] = useState<Vehicle[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    console.log('Search initiated');
    e.preventDefault();
    
    if (!registrationNumber.trim() || !phoneNumber.trim()) {
      setError("Please enter both registration number and phone number");
      return;
    }
    
    setError("");
    setIsSearching(true);
    setSearched(true);

    try {
      console.log('Making API request with:', { registrationNumber, phoneNumber });
      console.log('Fetching from API...');
      // Remove extra spaces and normalize registration number
      const normalizedRegNumber = registrationNumber.replace(/\s+/g, ' ').trim();
      // Construct the URL with proper encoding
      const url = new URL('http://localhost:5005/api/vehicles/search');
      url.searchParams.append('registrationNumber', normalizedRegNumber);
      url.searchParams.append('phoneNumber', phoneNumber);
      
      console.log('Making request to:', url.toString());
      
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        credentials: 'omit'
      });
      console.log('Normalized registration number:', normalizedRegNumber);
      console.log('API Response:', response);
      let data;
      try {
        const textData = await response.text();
        console.log('Raw response:', textData);
        data = textData ? JSON.parse(textData) : null;
        console.log('Parsed data:', data);
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        console.error('API Error:', { status: response.status, data });
        throw new Error(data?.message || `Server error: ${response.status}`);
      }

      console.log('API Success:', data);
      setSearchResults(data ? [data] : []);
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'Failed to search vehicle');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const getUnpaidFinesCount = (vehicleId: string) => {
    // This will be implemented later when we add fine tracking
    return 0;
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs";
      case "Towed":
        return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs";
      case "Suspended":
        return "bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs";
      default:
        return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs";
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Search Vehicle</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Vehicle Search</CardTitle>
              <CardDescription>
                Enter the vehicle registration number (e.g., DL05CE3456) and associated phone number to search
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      type="text"
                      placeholder="Enter registration number"
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      type="tel"
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  <Button type="submit" disabled={isSearching} className="w-full sm:w-auto">
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
                    <CardTitle>Search Results</CardTitle>
                    <CardDescription>
                      Showing {searchResults.length} vehicle{searchResults.length !== 1 ? 's' : ''}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Registration No.</TableHead>
                          <TableHead>Owner</TableHead>
                          <TableHead>Vehicle Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Unpaid Fines</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {searchResults.map((vehicle) => (
                          <TableRow key={vehicle.id}>
                            <TableCell className="font-medium">{vehicle.registrationNumber}</TableCell>
                            <TableCell>{vehicle.ownerName}</TableCell>
                            <TableCell>{vehicle.vehicleType}</TableCell>
                            <TableCell>
                              <span className={getStatusBadgeClass(vehicle.status)}>
                                {vehicle.status}
                              </span>
                            </TableCell>
                            <TableCell>{getUnpaidFinesCount(vehicle.id)}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/vehicle/${vehicle.id}`)}
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ) : (
                <Alert className="bg-amber-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    No vehicles found matching "{registrationNumber}". Please check the registration number and phone number and try again.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchVehiclePage;
