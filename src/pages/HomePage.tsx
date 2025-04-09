import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  CreditCard, 
  MapPin, 
  AlertTriangle, 
  Phone, 
  Info, 
  Shield, 
  TrendingUp 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rtms-blue to-rtms-darkblue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">MahaTowing</h1>
              <p className="text-xl mb-8">
                A comprehensive platform for Managing Towing Operations and Services.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => navigate("/search-vehicle")} className="bg-white text-rtms-blue hover:bg-gray-100">
                  <Search className="mr-2 h-4 w-4" /> Search Vehicle
                </Button>
                <Button onClick={() => navigate("/pay-fines")} className="bg-white text-rtms-blue hover:bg-gray-100">
                  <CreditCard className="mr-2 h-4 w-4" /> Pay Fines
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              {/* Removed image import */}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-rtms-lightblue p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                  <Search className="h-8 w-8 text-rtms-blue" />
                </div>
                <CardTitle>Search Vehicle</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>Check vehicle status, details, and pending fines.</p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-center">
                <Button variant="outline" onClick={() => navigate("/search-vehicle")}>
                  Search Now
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-rtms-lightblue p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                  <CreditCard className="h-8 w-8 text-rtms-blue" />
                </div>
                <CardTitle>Pay Fines</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>Pay pending traffic violations and fines online.</p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-center">
                <Button variant="outline" onClick={() => navigate("/pay-fines")}>
                  Pay Now
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-rtms-lightblue p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                  <MapPin className="h-8 w-8 text-rtms-blue" />
                </div>
                <CardTitle>Locate Yards</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>Find nearby towing yards and vehicle storage facilities.</p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-center">
                <Button variant="outline" onClick={() => navigate("/locate-yards")}>
                  Find Yards
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-rtms-lightblue p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                  <AlertTriangle className="h-8 w-8 text-rtms-blue" />
                </div>
                <CardTitle>Report Issues</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>Report vehicle thefts, incorrect fines, or system issues.</p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-center">
                <Button variant="outline" onClick={() => navigate("/report-issues")}>
                  Report Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start">
              <div className="bg-rtms-blue p-2 rounded-full mr-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
                <p className="text-gray-600">
                  All transactions are secure and protected with industry-standard encryption.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-rtms-blue p-2 rounded-full mr-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
                <p className="text-gray-600">
                  Get instant updates on vehicle status, fines, and payment confirmations.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-rtms-blue p-2 rounded-full mr-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Mobile Friendly</h3>
                <p className="text-gray-600">
                  Access all services on the go from your smartphone or tablet.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-rtms-blue p-2 rounded-full mr-4">
                <Info className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Data</h3>
                <p className="text-gray-600">
                  Complete information about vehicles, owners, and violation history.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-rtms-blue p-2 rounded-full mr-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Geo-location</h3>
                <p className="text-gray-600">
                  Easily find nearby offices, yards, and payment centers.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-rtms-blue p-2 rounded-full mr-4">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Issue Resolution</h3>
                <p className="text-gray-600">
                  Quick resolution for reported issues and disputes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-rtms-blue text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">5M+</h3>
              <p className="text-xl">Registered Vehicles</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">2M+</h3>
              <p className="text-xl">Monthly Transactions</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">500+</h3>
              <p className="text-xl">Towing Yards</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">99.9%</h3>
              <p className="text-xl">Service Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Assistance?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our support team is available 24/7 to help you with any questions or issues.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => navigate("/contact")} className="bg-rtms-blue hover:bg-rtms-darkblue">
              <Phone className="mr-2 h-4 w-4" /> Contact Support
            </Button>
            <Button variant="outline" onClick={() => navigate("/about")}>
              <Info className="mr-2 h-4 w-4" /> Learn More
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
