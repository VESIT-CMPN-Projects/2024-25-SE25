
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, CheckCircle2, Upload } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";

const ReportIssuesPage = () => {
  const { currentUser } = useAuth();
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validate form
    if (!issueType) {
      setError("Please select an issue type");
      return;
    }
    
    if (!description.trim()) {
      setError("Please provide a description");
      return;
    }
    
    if (!location.trim()) {
      setError("Please provide the location");
      return;
    }
    
    // Simulate form submission
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form
      setIssueType("");
      setDescription("");
      setLocation("");
      setContactNumber("");
      setFile(null);
      
      // Reset submission status after some time
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Report Issues</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Submit an Issue Report</CardTitle>
              <CardDescription>
                Report traffic signals, road conditions, illegal parking, or other traffic-related issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="p-6 text-center">
                  <div className="mx-auto bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Thank You for Your Report</h3>
                  <p className="text-gray-600 mb-4">
                    Your issue has been submitted successfully. Our team will review it and take appropriate action.
                  </p>
                  <p className="text-sm text-gray-500">
                    Reference Number: RTMS-{Math.floor(100000 + Math.random() * 900000)}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="issueType">Issue Type</Label>
                      <Select value={issueType} onValueChange={setIssueType}>
                        <SelectTrigger id="issueType">
                          <SelectValue placeholder="Select type of issue" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="traffic_signal">Traffic Signal Issue</SelectItem>
                          <SelectItem value="road_condition">Road Condition</SelectItem>
                          <SelectItem value="illegal_parking">Illegal Parking</SelectItem>
                          <SelectItem value="signage">Missing/Damaged Signage</SelectItem>
                          <SelectItem value="speeding">Speeding Concerns</SelectItem>
                          <SelectItem value="other">Other Issue</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        type="text"
                        placeholder="Street address or landmark"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Please provide details about the issue"
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="upload">Upload Photo (optional)</Label>
                    <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
                      <Input
                        id="upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <Label htmlFor="upload" className="cursor-pointer block">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          JPG, PNG or GIF (max. 5MB)
                        </p>
                      </Label>
                      {file && (
                        <p className="mt-2 text-sm text-rtms-blue">
                          Selected file: {file.name}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number (optional)</Label>
                    <Input
                      id="contactNumber"
                      type="tel"
                      placeholder="Your phone number for follow-up"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                    />
                  </div>
                </form>
              )}
            </CardContent>
            {!isSubmitted && (
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
              </CardFooter>
            )}
          </Card>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="bg-rtms-lightblue text-rtms-blue w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">1</div>
                <h3 className="font-medium mb-2">Submit Details</h3>
                <p className="text-sm text-gray-600">Provide information about the issue including location and photos</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="bg-rtms-lightblue text-rtms-blue w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">2</div>
                <h3 className="font-medium mb-2">Verification</h3>
                <p className="text-sm text-gray-600">Our team reviews and verifies the reported issue</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="bg-rtms-lightblue text-rtms-blue w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">3</div>
                <h3 className="font-medium mb-2">Resolution</h3>
                <p className="text-sm text-gray-600">The issue is forwarded to the relevant department for resolution</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReportIssuesPage;
