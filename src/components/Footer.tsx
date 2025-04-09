
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-rtms-blue text-white pt-10 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="flex items-center mb-2">
              <Phone className="h-5 w-5 mr-2" />
              <p>Toll Free: 1800-XXX-XXXX</p>
            </div>
            <div className="flex items-center mb-2">
              <Mail className="h-5 w-5 mr-2" />
              <p>help@transportation.gov.in</p>
            </div>
            <div className="flex items-start mb-2">
              <MapPin className="h-5 w-5 mr-2 mt-1" />
              <p>Ministry of Road Transport & Highways, Transport Bhawan, Parliament Street, New Delhi - 110001</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:underline">About Us</Link>
              </li>
              <li>
                <Link to="/rules-regulations" className="hover:underline">Rules & Regulations</Link>
              </li>
              <li>
                <Link to="/locate-yards" className="hover:underline">Towing Yards</Link>
              </li>
              <li>
                <Link to="/report-issues" className="hover:underline">Report Issues</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Youtube className="h-6 w-6" />
              </a>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Download Mobile App</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:opacity-80">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    className="h-10"
                  />
                </a>
                <a href="#" className="hover:opacity-80">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                    alt="Download on App Store" 
                    className="h-10"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-6 text-center text-sm">
          <p>© {currentYear} Ministry of Road Transport & Highways, Government of India. All Rights Reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link to="#" className="hover:underline">Privacy Policy</Link>
            <Link to="#" className="hover:underline">Terms of Service</Link>
            <Link to="#" className="hover:underline">Accessibility</Link>
            <Link to="#" className="hover:underline">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
