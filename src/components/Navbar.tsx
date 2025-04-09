import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, LogOut, Lock, Award, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="rtms-navbar sticky top-0 z-50 shadow-md">
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img
            src="/assets/logo.jpg"
            alt="Government of India"
            className="h-10 bg-white p-1 rounded"
            onError={(e) => {
              console.error('Failed to load logo');
              e.currentTarget.src = '/assets/fallback-logo.png';
            }}
          />
        </Link>
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold">Government of India</h1>
          <p className="text-xs">Ministry of Road Transport & Highways</p>
        </div>
      </div>

      {/* Desktop Menu with NavigationMenu */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink
                  className={
                    navigationMenuTriggerStyle() +
                    (isActive("/") ? " bg-rtms-darkblue" : "")
                  }
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={
                  isActive("/search-vehicle") || isActive("/pay-fines")
                    ? "bg-rtms-darkblue"
                    : ""
                }
              >
                Vehicle Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <Link
                    to="/search-vehicle"
                    className="block select-none space-y-1 rounded-md p-3 hover:bg-rtms-lightblue/20"
                  >
                    <div className="font-medium">Search Vehicle</div>
                    <p className="text-sm text-muted-foreground">
                      Look up vehicle details by registration number
                    </p>
                  </Link>
                  <Link
                    to="/pay-fines"
                    className="block select-none space-y-1 rounded-md p-3 hover:bg-rtms-lightblue/20"
                  >
                    <div className="font-medium">Pay Fines</div>
                    <p className="text-sm text-muted-foreground">
                      View and pay pending fines for your vehicle
                    </p>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={
                  isActive("/locate-yards") || isActive("/report-issues")
                    ? "bg-rtms-darkblue"
                    : ""
                }
              >
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <Link
                    to="/locate-yards"
                    className="block select-none space-y-1 rounded-md p-3 hover:bg-rtms-lightblue/20"
                  >
                    <div className="font-medium">Locate Yards</div>
                    <p className="text-sm text-muted-foreground">
                      Find nearby towing yards and recovery centers
                    </p>
                  </Link>
                  <Link
                    to="/report-issues"
                    className="block select-none space-y-1 rounded-md p-3 hover:bg-rtms-lightblue/20"
                  >
                    <div className="font-medium">Report Issues</div>
                    <p className="text-sm text-muted-foreground">
                      Report problems with towed vehicles or system issues
                    </p>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={
                  isActive("/about") ||
                  isActive("/contact") ||
                  isActive("/rules-regulations")
                    ? "bg-rtms-darkblue"
                    : ""
                }
              >
                Information
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <Link
                    to="/about"
                    className="block select-none space-y-1 rounded-md p-3 hover:bg-rtms-lightblue/20"
                  >
                    <div className="font-medium">About</div>
                    <p className="text-sm text-muted-foreground">
                      About the Road Transport Management System
                    </p>
                  </Link>
                  <Link
                    to="/contact"
                    className="block select-none space-y-1 rounded-md p-3 hover:bg-rtms-lightblue/20"
                  >
                    <div className="font-medium">Contact</div>
                    <p className="text-sm text-muted-foreground">
                      Contact information and support channels
                    </p>
                  </Link>
                  <Link
                    to="/rules-regulations"
                    className="block select-none space-y-1 rounded-md p-3 hover:bg-rtms-lightblue/20"
                  >
                    <div className="font-medium">Rules & Regulations</div>
                    <p className="text-sm text-muted-foreground">
                      Learn about the traffic rules and regulations
                    </p>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center space-x-2">
        {currentUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-white flex items-center gap-1"
              >
                <div className="h-8 w-8 rounded-full bg-rtms-lightblue flex items-center justify-center text-rtms-blue font-semibold">
                  {currentUser.username.substring(0, 1).toUpperCase()}
                </div>
                <span className="hidden md:inline ml-2">
                  {currentUser.username}
                </span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {isAdmin() && (
                <DropdownMenuItem onClick={() => navigate("/admin")}>
                  <Lock className="mr-2 h-4 w-4" />
                  <span>Admin Dashboard</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => navigate("/payment-history")}>
                <Award className="mr-2 h-4 w-4" />
                <span>Payment History</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="outline"
            onClick={() => navigate("/login")}
            className="text-rtms-blue border-white"
          >
            Login
          </Button>
        )}

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile menu with improved styling */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-rtms-blue p-4 flex flex-col space-y-2 md:hidden z-50 shadow-lg rounded-b-lg border-t border-rtms-lightblue/30">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white hover:bg-rtms-darkblue rounded-md py-3 px-4 flex items-center"
          >
            Home
          </Link>

          <div className="bg-rtms-lightblue/10 rounded-md py-2 px-3">
            <h3 className="text-rtms-lightblue text-sm font-semibold mb-1 px-1">
              Vehicle Services
            </h3>
            <Link
              to="/search-vehicle"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:bg-rtms-darkblue rounded-md py-2 px-3 block mb-1"
            >
              Search Vehicle
            </Link>
            <Link
              to="/pay-fines"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:bg-rtms-darkblue rounded-md py-2 px-3 block"
            >
              Pay Fines
            </Link>
          </div>

          <div className="bg-rtms-lightblue/10 rounded-md py-2 px-3">
            <h3 className="text-rtms-lightblue text-sm font-semibold mb-1 px-1">
              Services
            </h3>
            <Link
              to="/locate-yards"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:bg-rtms-darkblue rounded-md py-2 px-3 block mb-1"
            >
              Locate Yards
            </Link>
            <Link
              to="/report-issues"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:bg-rtms-darkblue rounded-md py-2 px-3 block"
            >
              Report Issues
            </Link>
          </div>

          <div className="bg-rtms-lightblue/10 rounded-md py-2 px-3">
            <h3 className="text-rtms-lightblue text-sm font-semibold mb-1 px-1">
              Information
            </h3>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:bg-rtms-darkblue rounded-md py-2 px-3 block mb-1"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:bg-rtms-darkblue rounded-md py-2 px-3 block mb-1"
            >
              Contact
            </Link>
            <Link
              to="/rules-regulations"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:bg-rtms-darkblue rounded-md py-2 px-3 block"
            >
              Rules & Regulations
            </Link>
          </div>

          {isAdmin() && (
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:bg-rtms-darkblue rounded-md py-3 px-4 flex items-center bg-rtms-lightblue/10"
            >
              <Lock className="h-4 w-4 mr-2" />
              Admin Dashboard
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
