import MainLayout from "@/components/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Search, MapPin, Phone, Clock, Car } from "lucide-react";

interface TowingYard {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  capacity: number;
  currentVehicles: number;
}

const YARDS_DATA: TowingYard[] = [
  {
    id: "yard1",
    name: "Trombay Towing Yard",
    address: "14-A, Connaught Place, Trombay - 400007",
    phone: "011-23456789",
    hours: "24 hours",
    capacity: 200,
    currentVehicles: 156,
  },
  {
    id: "yard2",
    name: "Kalyan Towing Yard",
    address: "45, Model Town, Delhi - 421306",
    phone: "011-27654321",
    hours: "8:00 AM - 8:00 PM",
    capacity: 150,
    currentVehicles: 82,
  },
  {
    id: "yard3",
    name: "Wadala Towing Yard",
    address: "Plot 7, Nehru Place, Wadala - 400027",
    phone: "011-26574839",
    hours: "24 hours",
    capacity: 300,
    currentVehicles: 215,
  },
  {
    id: "yard4",
    name: "East Delhi Towing Yard",
    address: "23, Laxmi Nagar, Delhi - 110092",
    phone: "011-22446688",
    hours: "8:00 AM - 10:00 PM",
    capacity: 120,
    currentVehicles: 87,
  },
  {
    id: "yard5",
    name: "Ghatkopar Towing Yard",
    address: "89, Rajouri Garden, Ghatkopar - 400207",
    phone: "011-25873159",
    hours: "24 hours",
    capacity: 250,
    currentVehicles: 198,
  },
];

const LocateYardsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredYards, setFilteredYards] = useState<TowingYard[]>(YARDS_DATA);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.trim() === "") {
      setFilteredYards(YARDS_DATA);
      return;
    }

    const filtered = YARDS_DATA.filter(
      (yard) =>
        yard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        yard.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredYards(filtered);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Locate Towing Yards</h1>

          <Card className="mb-8">
            <CardHeader className="pb-4">
              <CardTitle>Find Nearby Towing Yards</CardTitle>
              <CardDescription>
                Search for towing yards by name or location to check if your
                vehicle has been towed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="text"
                    placeholder="Search by yard name or location"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredYards.map((yard) => (
              <Card key={yard.id} className="overflow-hidden">
                <CardHeader className="bg-rtms-lightblue pb-4">
                  <CardTitle className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-rtms-blue shrink-0 mt-1" />
                    <span>{yard.name}</span>
                  </CardTitle>
                  <CardDescription className="ml-7 text-gray-700">
                    {yard.address}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-gray-600 shrink-0 mt-1" />
                      <span>{yard.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-gray-600 shrink-0 mt-1" />
                      <span>{yard.hours}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Car className="h-4 w-4 text-gray-600 shrink-0 mt-1" />
                      <div>
                        <span>
                          Capacity: {yard.currentVehicles}/{yard.capacity}{" "}
                          vehicles
                        </span>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                          <div
                            className="bg-rtms-blue h-2.5 rounded-full"
                            style={{
                              width: `${
                                (yard.currentVehicles / yard.capacity) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredYards.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No towing yards found matching your search criteria.
              </p>
              <Button
                variant="link"
                onClick={() => setFilteredYards(YARDS_DATA)}
              >
                Show all yards
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default LocateYardsPage;
