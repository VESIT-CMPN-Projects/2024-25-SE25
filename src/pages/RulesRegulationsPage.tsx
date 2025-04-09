
import MainLayout from "@/components/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, FileText, BookOpen } from "lucide-react";

const RulesRegulationsPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Rules & Regulations</h1>
          
          <Tabs defaultValue="traffic">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="traffic">Traffic Rules</TabsTrigger>
              <TabsTrigger value="fines">Fines & Penalties</TabsTrigger>
              <TabsTrigger value="towing">Towing Regulations</TabsTrigger>
              <TabsTrigger value="documents">Required Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="traffic">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-rtms-lightblue p-3 rounded-full mr-4">
                      <BookOpen className="h-6 w-6 text-rtms-blue" />
                    </div>
                    <h2 className="text-2xl font-semibold">Traffic Rules</h2>
                  </div>
                  
                  <p className="text-gray-700 mb-6">
                    The following traffic rules must be followed by all road users to ensure safety and order on our roads. Violation of these rules may result in fines, penalties, or legal action.
                  </p>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Speed Limits</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Urban areas: Maximum speed limit is 50 km/h unless otherwise specified.</li>
                          <li>Highways: Maximum speed limit is 80 km/h for cars and 60 km/h for heavy vehicles.</li>
                          <li>Expressways: Maximum speed limit is 100 km/h for cars and 80 km/h for heavy vehicles.</li>
                          <li>School zones: Maximum speed limit is 30 km/h during school hours.</li>
                          <li>Residential areas: Maximum speed limit is 40 km/h unless otherwise specified.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Parking Regulations</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>No parking within 5 meters of an intersection.</li>
                          <li>No parking in front of entrances to buildings, driveways, or fire hydrants.</li>
                          <li>No parking on footpaths, cycle tracks, or pedestrian crossings.</li>
                          <li>No parking in designated "No Parking" or "No Stopping" zones.</li>
                          <li>Paid parking must be utilized where available.</li>
                          <li>Vehicles must be parked in the direction of traffic flow.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Traffic Signals & Signs</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>All traffic signals and signs must be strictly followed.</li>
                          <li>Red light means complete stop until the signal turns green.</li>
                          <li>Yellow light indicates preparation to stop, not acceleration to beat the red light.</li>
                          <li>Green light allows proceeding with caution, yielding to pedestrians and vehicles already in the intersection.</li>
                          <li>Regulatory signs (like Stop, Yield, No Entry) are mandatory and must be obeyed.</li>
                          <li>Warning signs alert drivers to potential hazards and require appropriate caution.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Vehicle Safety Requirements</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>All vehicles must have functioning headlights, taillights, and turn signals.</li>
                          <li>Seatbelts are mandatory for all occupants in cars.</li>
                          <li>Helmets are mandatory for all two-wheeler riders.</li>
                          <li>Children under 12 years must be seated in the rear seat.</li>
                          <li>Children under 4 years must be secured in appropriate child restraint systems.</li>
                          <li>All vehicles must have a valid Pollution Under Control (PUC) certificate.</li>
                          <li>Overloading of vehicles is prohibited.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>Driving Behavior</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Driving under the influence of alcohol or drugs is strictly prohibited.</li>
                          <li>Using mobile phones while driving is not allowed unless through hands-free devices.</li>
                          <li>Overtaking from the left is prohibited.</li>
                          <li>Maintaining safe distance from vehicles ahead is mandatory.</li>
                          <li>Unnecessary honking is prohibited, especially in silence zones.</li>
                          <li>Lane discipline must be maintained at all times.</li>
                          <li>Dangerous or reckless driving is a serious offense.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="fines">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <AlertTriangle className="h-6 w-6 text-amber-600" />
                    </div>
                    <h2 className="text-2xl font-semibold">Fines & Penalties</h2>
                  </div>
                  
                  <p className="text-gray-700 mb-6">
                    The following schedule of fines and penalties applies to traffic violations. These fines are subject to change as per government notifications.
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border p-3 text-left">Violation</th>
                          <th className="border p-3 text-right">Fine Amount (₹)</th>
                          <th className="border p-3 text-left">Additional Penalties</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border p-3">Speeding</td>
                          <td className="border p-3 text-right">1,000 - 2,000</td>
                          <td className="border p-3">License suspension for repeated offenses</td>
                        </tr>
                        <tr>
                          <td className="border p-3">Red Light Violation</td>
                          <td className="border p-3 text-right">1,000 - 5,000</td>
                          <td className="border p-3">License suspension for repeated offenses</td>
                        </tr>
                        <tr>
                          <td className="border p-3">Driving Without License</td>
                          <td className="border p-3 text-right">5,000</td>
                          <td className="border p-3">Vehicle impoundment</td>
                        </tr>
                        <tr>
                          <td className="border p-3">Driving Without Insurance</td>
                          <td className="border p-3 text-right">2,000</td>
                          <td className="border p-3">Vehicle impoundment</td>
                        </tr>
                        <tr>
                          <td className="border p-3">Parking Violation</td>
                          <td className="border p-3 text-right">500 - 1,000</td>
                          <td className="border p-3">Towing charges, vehicle impoundment</td>
                        </tr>
                        <tr>
                          <td className="border p-3">No Helmet (Two-wheelers)</td>
                          <td className="border p-3 text-right">1,000</td>
                          <td className="border p-3">License suspension for repeated offenses</td>
                        </tr>
                        <tr>
                          <td className="border p-3">Not Wearing Seatbelt</td>
                          <td className="border p-3 text-right">1,000</td>
                          <td className="border p-3">-</td>
                        </tr>
                        <tr>
                          <td className="border p-3">Using Mobile Phone While Driving</td>
                          <td className="border p-3 text-right">1,500 - 5,000</td>
                          <td className="border p-3">License suspension</td>
                        </tr>
                        <tr>
                          <td className="border p-3">Driving Under Influence (DUI)</td>
                          <td className="border p-3 text-right">10,000</td>
                          <td className="border p-3">License suspension, imprisonment</td>
                        </tr>
                        <tr>
                          <td className="border p-3">Rash or Dangerous Driving</td>
                          <td className="border p-3 text-right">5,000</td>
                          <td className="border p-3">License suspension, imprisonment</td>
                        </tr>
                        <tr>
                          <td className="border p-3">Overloading</td>
                          <td className="border p-3 text-right">2,000 per excess passenger</td>
                          <td className="border p-3">Vehicle impoundment</td>
                        </tr>
                        <tr>
                          <td className="border p-3">Driving Without PUC</td>
                          <td className="border p-3 text-right">1,000</td>
                          <td className="border p-3">Vehicle impoundment</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
                    <p className="text-amber-800 text-sm">
                      <strong>Note:</strong> Fines may be increased for subsequent offenses. Payment of fines does not exempt from legal prosecution for serious offenses. The transport authority reserves the right to suspend or revoke driving licenses for repeated or serious violations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="towing">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <FileText className="h-6 w-6 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-semibold">Towing Regulations</h2>
                  </div>
                  
                  <p className="text-gray-700 mb-6">
                    Vehicles may be towed for various violations. Understanding these regulations can help you avoid having your vehicle towed and know your rights if it happens.
                  </p>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Reasons for Towing</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-3">Vehicles may be towed under the following circumstances:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Illegal parking in no-parking zones or restricted areas</li>
                          <li>Blocking driveways, fire hydrants, or emergency exits</li>
                          <li>Parking in handicapped spaces without proper authorization</li>
                          <li>Abandoned vehicles (left unattended for more than 48 hours)</li>
                          <li>Vehicles with multiple unpaid fines</li>
                          <li>Vehicles involved in criminal activities</li>
                          <li>Vehicles without proper registration or insurance</li>
                          <li>Vehicles causing obstruction to traffic flow</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Towing Procedure</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-3">The following procedure is followed when towing a vehicle:</p>
                        <ol className="list-decimal pl-6 space-y-2">
                          <li>Traffic authorities identify the violation and document it with photographs.</li>
                          <li>A notice is placed on the vehicle if possible.</li>
                          <li>Authorized towing personnel are called to remove the vehicle.</li>
                          <li>The vehicle is transported to the nearest authorized towing yard.</li>
                          <li>Vehicle details are entered into the central database.</li>
                          <li>Owner is notified via SMS or call if registration details are available.</li>
                          <li>A detailed report is filed including the condition of the vehicle at the time of towing.</li>
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Retrieving Your Vehicle</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-3">To retrieve your towed vehicle, follow these steps:</p>
                        <ol className="list-decimal pl-6 space-y-2">
                          <li>Use the 'Locate Yards' feature on our website or app to find where your vehicle is stored.</li>
                          <li>Visit the yard with proper identification (Driving License, RC Book, etc.).</li>
                          <li>Pay all applicable fines, towing charges, and storage fees.</li>
                          <li>Complete the required paperwork for release.</li>
                          <li>Inspect your vehicle for any damage and report immediately if found.</li>
                          <li>Take receipt for all payments made.</li>
                        </ol>
                        <p className="mt-3">
                          <strong>Note:</strong> Storage fees accumulate daily, so it's advisable to retrieve your vehicle as soon as possible.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Towing Charges</AccordionTrigger>
                      <AccordionContent>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border p-3 text-left">Vehicle Type</th>
                                <th className="border p-3 text-right">Towing Charge (₹)</th>
                                <th className="border p-3 text-right">Daily Storage Fee (₹)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border p-3">Two-wheelers</td>
                                <td className="border p-3 text-right">500</td>
                                <td className="border p-3 text-right">100</td>
                              </tr>
                              <tr>
                                <td className="border p-3">Cars & Light Vehicles</td>
                                <td className="border p-3 text-right">1,500</td>
                                <td className="border p-3 text-right">300</td>
                              </tr>
                              <tr>
                                <td className="border p-3">Heavy Vehicles</td>
                                <td className="border p-3 text-right">3,000</td>
                                <td className="border p-3 text-right">500</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <p className="mt-3 text-sm text-gray-600">
                          Additional charges may apply for special circumstances such as difficult towing conditions or long-distance transportation.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>Disputes & Complaints</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-3">If you believe your vehicle was wrongfully towed or if you have complaints about the towing process:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>File a complaint at the towing yard or traffic police station.</li>
                          <li>Submit a detailed report on our website through the 'Report Issues' section.</li>
                          <li>Provide evidence supporting your claim (photographs, witnesses, etc.).</li>
                          <li>Keep all receipts and documentation related to the towing.</li>
                        </ul>
                        <p className="mt-3">
                          All complaints are reviewed by a dedicated team. If found valid, appropriate refunds or compensations may be provided as per policy.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-semibold">Required Documents</h2>
                  </div>
                  
                  <p className="text-gray-700 mb-6">
                    All vehicle owners and drivers are required to carry and maintain certain documents. Failure to produce these documents when requested by authorities may result in fines or penalties.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-md p-4">
                      <h3 className="font-semibold text-lg mb-3">For Vehicle Owners</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="min-w-4 min-h-4 rounded-full bg-green-500 mt-1.5 mr-2"></div>
                          <span>Registration Certificate (RC Book)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-4 min-h-4 rounded-full bg-green-500 mt-1.5 mr-2"></div>
                          <span>Valid Insurance Policy</span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-4 min-h-4 rounded-full bg-green-500 mt-1.5 mr-2"></div>
                          <span>Pollution Under Control (PUC) Certificate</span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-4 min-h-4 rounded-full bg-green-500 mt-1.5 mr-2"></div>
                          <span>Tax Token (if applicable)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-4 min-h-4 rounded-full bg-green-500 mt-1.5 mr-2"></div>
                          <span>Fitness Certificate (for commercial vehicles)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-4 min-h-4 rounded-full bg-green-500 mt-1.5 mr-2"></div>
                          <span>Permit (for commercial vehicles)</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="font-semibold text-lg mb-3">For Drivers</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="min-w-4 min-h-4 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                          <span>Valid Driving License</span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-4 min-h-4 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                          <span>Vehicle Registration Certificate</span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-4 min-h-4 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                          <span>Valid Insurance Policy</span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-4 min-h-4 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                          <span>PUC Certificate</span>
                        </li>
                        <li className="flex items-start">
                          <div className="min-w-4 min-h-4 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                          <span>Driver's Badge (for commercial drivers)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 mb-4">
                    <h3 className="font-semibold text-lg mb-3">Digital Documents</h3>
                    <p className="text-gray-700 mb-4">
                      Digital copies of the above documents stored in the DigiLocker or mParivahan app are legally valid and accepted by traffic authorities.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4">
                      <a href="https://digilocker.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border rounded-md hover:bg-gray-50">
                        <img src="https://www.digilocker.gov.in/assets/img/digilocker_logo.png" alt="DigiLocker" className="h-8 mr-2" />
                        <span>DigiLocker</span>
                      </a>
                      <a href="https://play.google.com/store/apps/details?id=com.nic.mparivahan" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border rounded-md hover:bg-gray-50">
                        <img src="https://play-lh.googleusercontent.com/nBnglU19KqJEtZBkRWIVXXjlwbeAsG9eCI4RQl-Havi4uKsQ4CokHGvEDnxcXJl38w=w240-h480-rw" alt="mParivahan" className="h-8 mr-2" />
                        <span>mParivahan</span>
                      </a>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-blue-800 text-sm">
                      <strong>Important:</strong> Always keep the original documents in a safe place and carry either the originals or digital copies when driving. Traffic authorities have the right to verify these documents at any time during routine checks or in case of traffic violations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default RulesRegulationsPage;
