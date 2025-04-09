
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MapPin, Clock, Send, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { useState } from "react";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !subject || !message) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      
      // Reset submitted state after some time
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="bg-rtms-lightblue">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-rtms-blue text-white p-3 rounded-full mb-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                  <p className="text-gray-700">Toll Free Number</p>
                  <p className="text-xl font-semibold mb-2">1800-XXX-XXXX</p>
                  <p className="text-gray-700 text-sm">Monday to Saturday</p>
                  <p className="text-gray-700 text-sm">9:00 AM - 6:00 PM</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-rtms-lightblue">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-rtms-blue text-white p-3 rounded-full mb-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                  <p className="text-gray-700">For General Inquiries</p>
                  <p className="text-rtms-blue font-medium mb-2">help@transportation.gov.in</p>
                  <p className="text-gray-700">For Technical Support</p>
                  <p className="text-rtms-blue font-medium">support@transportation.gov.in</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-rtms-lightblue">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-rtms-blue text-white p-3 rounded-full mb-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                  <p className="text-gray-700">Ministry of Road Transport & Highways</p>
                  <p className="mb-2 text-gray-700">Transport Bhawan, Parliament Street</p>
                  <p className="text-gray-700">New Delhi - 110001</p>
                  <p className="text-gray-700 text-sm mt-2">
                    <Clock className="inline-block h-4 w-4 mr-1" />
                    <span>Office Hours: 9:30 AM - 5:30 PM</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Send className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600">
                    Thank you for contacting us. We will respond to your message within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={subject} onValueChange={setSubject} required>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="fine">Fine Payment Issue</SelectItem>
                        <SelectItem value="vehicle">Vehicle Registration</SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="text-right">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Regional Offices</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Northern Region</CardTitle>
                  <CardDescription>Regional Transport Office</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">A-24, Kasturba Gandhi Marg, New Delhi - 110001</p>
                  <p className="mb-2">Phone: 011-2345-6789</p>
                  <p>Email: north.rto@transportation.gov.in</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Southern Region</CardTitle>
                  <CardDescription>Regional Transport Office</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">89, Mount Road, Chennai - 600002</p>
                  <p className="mb-2">Phone: 044-2876-5432</p>
                  <p>Email: south.rto@transportation.gov.in</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Eastern Region</CardTitle>
                  <CardDescription>Regional Transport Office</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">P-45, Park Street, Kolkata - 700016</p>
                  <p className="mb-2">Phone: 033-4567-8901</p>
                  <p>Email: east.rto@transportation.gov.in</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Western Region</CardTitle>
                  <CardDescription>Regional Transport Office</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">567, Nariman Point, Mumbai - 400021</p>
                  <p className="mb-2">Phone: 022-6789-0123</p>
                  <p>Email: west.rto@transportation.gov.in</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Connect With Us</CardTitle>
              <CardDescription>
                Follow us on social media for updates, news and announcements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-8">
                <a href="#" className="flex flex-col items-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-2">
                    <Facebook className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-sm">Facebook</span>
                </a>
                <a href="#" className="flex flex-col items-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-2">
                    <Twitter className="h-6 w-6 text-blue-500" />
                  </div>
                  <span className="text-sm">Twitter</span>
                </a>
                <a href="#" className="flex flex-col items-center">
                  <div className="bg-pink-100 p-4 rounded-full mb-2">
                    <Instagram className="h-6 w-6 text-pink-600" />
                  </div>
                  <span className="text-sm">Instagram</span>
                </a>
                <a href="#" className="flex flex-col items-center">
                  <div className="bg-red-100 p-4 rounded-full mb-2">
                    <Youtube className="h-6 w-6 text-red-600" />
                  </div>
                  <span className="text-sm">YouTube</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;
