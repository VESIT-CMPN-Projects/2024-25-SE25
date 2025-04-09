
import MainLayout from "@/components/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Award, Clock, Check, User, FileText, MapPin } from "lucide-react";

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About Us</h1>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-gray-700 mb-4">
                The Road Transport Management System is a comprehensive initiative by the Ministry of Road Transport & Highways, Government of India, aimed at revolutionizing how citizens interact with transport authorities. Our vision is to create a transparent, efficient, and accessible platform for all transport-related services.
              </p>
              <p className="text-gray-700 mb-6">
                We are committed to leveraging technology to reduce paperwork, minimize corruption, and provide citizens with a seamless experience when dealing with vehicle registrations, fine payments, and other transport services.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-rtms-lightblue p-3 rounded-full mb-3">
                    <Shield className="h-6 w-6 text-rtms-blue" />
                  </div>
                  <h3 className="font-semibold mb-2">Transparency</h3>
                  <p className="text-sm text-gray-600">
                    Ensuring complete transparency in all transactions and processes
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-rtms-lightblue p-3 rounded-full mb-3">
                    <Award className="h-6 w-6 text-rtms-blue" />
                  </div>
                  <h3 className="font-semibold mb-2">Quality Service</h3>
                  <p className="text-sm text-gray-600">
                    Providing high-quality services that meet international standards
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-rtms-lightblue p-3 rounded-full mb-3">
                    <Clock className="h-6 w-6 text-rtms-blue" />
                  </div>
                  <h3 className="font-semibold mb-2">Efficiency</h3>
                  <p className="text-sm text-gray-600">
                    Reducing processing times and improving service delivery
                  </p>
                </div>
              </div>
              
              <Separator className="my-8" />
              
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                Our mission is to create a unified platform that integrates all road transport services, making them accessible to citizens across the country. We aim to:
              </p>
              
              <ul className="space-y-4 mb-6">
                <li className="flex">
                  <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium">Digitize all transport services</span> - Reducing paper-based processes and enabling online access to all services.
                  </div>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium">Streamline fine payments</span> - Making it easier for citizens to check and pay their traffic fines online.
                  </div>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium">Improve transparency</span> - Ensuring that all processes are transparent and trackable by citizens.
                  </div>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium">Enhance road safety</span> - Using data analytics to identify traffic violation patterns and implement preventive measures.
                  </div>
                </li>
              </ul>
              
              <Separator className="my-8" />
              
              <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
              <p className="text-gray-700 mb-6">
                Our team consists of dedicated professionals working across various departments to ensure the smooth functioning of transport services across the country.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-rtms-lightblue p-3 rounded-full mb-3">
                    <User className="h-6 w-6 text-rtms-blue" />
                  </div>
                  <h3 className="font-semibold mb-2">Administrative Staff</h3>
                  <p className="text-sm text-gray-600">
                    Managing day-to-day operations and policy implementation
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-rtms-lightblue p-3 rounded-full mb-3">
                    <FileText className="h-6 w-6 text-rtms-blue" />
                  </div>
                  <h3 className="font-semibold mb-2">Technical Team</h3>
                  <p className="text-sm text-gray-600">
                    Developing and maintaining our digital infrastructure
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-rtms-lightblue p-3 rounded-full mb-3">
                    <MapPin className="h-6 w-6 text-rtms-blue" />
                  </div>
                  <h3 className="font-semibold mb-2">Field Officers</h3>
                  <p className="text-sm text-gray-600">
                    Working on the ground to enforce regulations and assist citizens
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
