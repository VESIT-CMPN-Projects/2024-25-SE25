import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useData, Report } from "@/contexts/DataContext";
import { toast } from "@/components/ui/use-toast";
import { Search, Filter, Edit, FileText, MessageSquare, CheckCircle, XCircle, AlertCircle, Mail, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminReportsPage = () => {
  const { reports, updateReportStatus } = useData();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [newStatus, setNewStatus] = useState<Report["status"]>("Pending");
  
  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      searchTerm === "" || 
      report.reporterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (report.description && report.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "" || report.status === statusFilter;
    const matchesType = typeFilter === "" || report.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  const reportTypes = Array.from(new Set(reports.map(report => report.type)));
  
  const openViewDialog = (report: Report) => {
    setSelectedReport(report);
    setIsViewDialogOpen(true);
  };
  
  const openUpdateStatusDialog = (report: Report) => {
    setSelectedReport(report);
    setNewStatus(report.status);
    setIsUpdateStatusDialogOpen(true);
  };
  
  const handleUpdateStatus = async () => {
    if (!selectedReport) return;
    
    try {
      await updateReportStatus(selectedReport.id, newStatus);
      setIsUpdateStatusDialogOpen(false);
      
      toast({
        title: "Status Updated",
        description: `Report status has been updated to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update report status",
        variant: "destructive",
      });
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
  
  const getStatusBadge = (status: Report["status"]) => {
    switch (status) {
      case "Pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "In Progress":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "Resolved":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Resolved</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getStatusIcon = (status: Report["status"]) => {
    switch (status) {
      case "Pending":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "In Progress":
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "Resolved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Reports Management</h1>
            <p className="text-muted-foreground">
              Manage and respond to user reports and complaints
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="inProgress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>All Reports</CardTitle>
                <CardDescription>
                  Total reports: {reports.length} | Pending: {reports.filter(r => r.status === "Pending").length} | 
                  In Progress: {reports.filter(r => r.status === "In Progress").length} | 
                  Resolved: {reports.filter(r => r.status === "Resolved").length}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex gap-2 flex-1">
                    <Input
                      placeholder="Search by name, type, description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-44">
                        <SelectValue placeholder="Report Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {reportTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Button variant="ghost" size="icon" onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("");
                      setTypeFilter("");
                    }}>
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Reporter</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Vehicle No.</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReports.length > 0 ? (
                        filteredReports.map(report => (
                          <TableRow key={report.id}>
                            <TableCell className="font-medium">{report.reporterName}</TableCell>
                            <TableCell>{report.type}</TableCell>
                            <TableCell>{formatDate(report.date)}</TableCell>
                            <TableCell>{report.vehicleNumber || "-"}</TableCell>
                            <TableCell>{getStatusBadge(report.status)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => openViewDialog(report)}
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => openUpdateStatusDialog(report)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => {
                                    toast({
                                      title: "Email Sent",
                                      description: `Email sent to ${report.email}`,
                                    });
                                  }}
                                >
                                  <Mail className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center h-24">
                            No reports found matching your search criteria.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Reports</CardTitle>
                <CardDescription>Reports that need attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Reporter</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Vehicle No.</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reports.filter(r => r.status === "Pending").length > 0 ? (
                        reports
                          .filter(r => r.status === "Pending")
                          .map(report => (
                            <TableRow key={report.id}>
                              <TableCell className="font-medium">{report.reporterName}</TableCell>
                              <TableCell>{report.type}</TableCell>
                              <TableCell>{formatDate(report.date)}</TableCell>
                              <TableCell>{report.vehicleNumber || "-"}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => openViewDialog(report)}
                                  >
                                    <FileText className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => openUpdateStatusDialog(report)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center h-24">
                            No pending reports found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inProgress">
            <Card>
              <CardHeader>
                <CardTitle>In Progress Reports</CardTitle>
                <CardDescription>Reports currently being handled</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Reporter</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Vehicle No.</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reports.filter(r => r.status === "In Progress").length > 0 ? (
                        reports
                          .filter(r => r.status === "In Progress")
                          .map(report => (
                            <TableRow key={report.id}>
                              <TableCell className="font-medium">{report.reporterName}</TableCell>
                              <TableCell>{report.type}</TableCell>
                              <TableCell>{formatDate(report.date)}</TableCell>
                              <TableCell>{report.vehicleNumber || "-"}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => openViewDialog(report)}
                                  >
                                    <FileText className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => openUpdateStatusDialog(report)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center h-24">
                            No in-progress reports found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resolved">
            <Card>
              <CardHeader>
                <CardTitle>Resolved Reports</CardTitle>
                <CardDescription>Reports that have been resolved</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Reporter</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Vehicle No.</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reports.filter(r => r.status === "Resolved").length > 0 ? (
                        reports
                          .filter(r => r.status === "Resolved")
                          .map(report => (
                            <TableRow key={report.id}>
                              <TableCell className="font-medium">{report.reporterName}</TableCell>
                              <TableCell>{report.type}</TableCell>
                              <TableCell>{formatDate(report.date)}</TableCell>
                              <TableCell>{report.vehicleNumber || "-"}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => openViewDialog(report)}
                                  >
                                    <FileText className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center h-24">
                            No resolved reports found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Report Details</DialogTitle>
              <DialogDescription>
                Detailed information about the report
              </DialogDescription>
            </DialogHeader>
            
            {selectedReport && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-500">Reporter Name</Label>
                    <p className="font-medium">{selectedReport.reporterName}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Email</Label>
                    <p className="font-medium">{selectedReport.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-500">Report Type</Label>
                    <p className="font-medium">{selectedReport.type}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Date Submitted</Label>
                    <p className="font-medium">{formatDate(selectedReport.date)}</p>
                  </div>
                </div>
                
                {selectedReport.vehicleNumber && (
                  <div>
                    <Label className="text-sm text-gray-500">Vehicle Number</Label>
                    <p className="font-medium">{selectedReport.vehicleNumber}</p>
                  </div>
                )}
                
                <div>
                  <Label className="text-sm text-gray-500">Status</Label>
                  <div className="flex items-center mt-1">
                    {getStatusIcon(selectedReport.status)}
                    <span className="ml-2">{selectedReport.status}</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm text-gray-500">Description</Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-md">
                    <p>{selectedReport.description}</p>
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                setIsViewDialogOpen(false);
                openUpdateStatusDialog(selectedReport!);
              }}>
                Update Status
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={isUpdateStatusDialogOpen} onOpenChange={setIsUpdateStatusDialogOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Update Report Status</DialogTitle>
              <DialogDescription>
                Change the status of this report
              </DialogDescription>
            </DialogHeader>
            
            {selectedReport && (
              <div className="py-4">
                <div className="mb-4">
                  <p className="mb-2"><strong>Reporter:</strong> {selectedReport.reporterName}</p>
                  <p className="mb-2"><strong>Type:</strong> {selectedReport.type}</p>
                  <p><strong>Current Status:</strong> {selectedReport.status}</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">New Status</Label>
                  <Select value={newStatus} onValueChange={(value: Report["status"]) => setNewStatus(value)}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUpdateStatusDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateStatus}>
                Update Status
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminReportsPage;
