import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";

// Public Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import SearchVehiclePage from "./pages/SearchVehiclePage";
import PayFinesPage from "./pages/PayFinesPage";
import LocateYardsPage from "./pages/LocateYardsPage";
import ReportIssuesPage from "./pages/ReportIssuesPage";
import RulesRegulationsPage from "./pages/RulesRegulationsPage";
import ContactPage from "./pages/ContactPage";
import VehicleDetailsPage from "./pages/VehicleDetailsPage";
import PaymentHistoryPage from "./pages/PaymentHistoryPage";

// Admin Pages
import AdminDashboardPage from "./pages/admin/DashboardPage";
import AdminVehiclesPage from "./pages/admin/VehiclesPage";
import AdminFinesPage from "./pages/admin/FinesPage";
import AdminUsersPage from "./pages/admin/UsersPage";
import AdminReportsPage from "./pages/admin/ReportsPage";
import AdminSettingsPage from "./pages/admin/SettingsPage";

// Protected Route Component
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DataProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/search-vehicle" element={<SearchVehiclePage />} />
                <Route path="/pay-fines" element={<PayFinesPage />} />
                <Route path="/locate-yards" element={<LocateYardsPage />} />
                <Route path="/report-issues" element={<ReportIssuesPage />} />
                <Route path="/rules-regulations" element={<RulesRegulationsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/vehicle/:id" element={<VehicleDetailsPage />} />
                <Route path="/payment-history" element={<PaymentHistoryPage />} />
                
                {/* Admin Routes */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/vehicles" 
                  element={
                    <ProtectedRoute>
                      <AdminVehiclesPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/fines" 
                  element={
                    <ProtectedRoute>
                      <AdminFinesPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/users" 
                  element={
                    <ProtectedRoute>
                      <AdminUsersPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/reports" 
                  element={
                    <ProtectedRoute>
                      <AdminReportsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/settings" 
                  element={
                    <ProtectedRoute>
                      <AdminSettingsPage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </DataProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
