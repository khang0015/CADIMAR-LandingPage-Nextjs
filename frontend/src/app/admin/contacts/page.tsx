"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Filter, 
  Mail,
  Phone,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  MessageSquare,
  User,
  RefreshCw,
  Eye,
  Trash2
} from "lucide-react";
import AdminLayout from "@/components/admin/admin-layout";
import { ApiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterested?: string;
  message: string;
  source: string;
  status: 'new' | 'in-progress' | 'responded' | 'closed';
  priority: 'low' | 'normal' | 'high';
  responded: boolean;
  adminNote?: string;
  respondedAt?: string;
  respondedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminContactsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'in-progress' | 'responded' | 'closed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'normal' | 'high'>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isRespondDialogOpen, setIsRespondDialogOpen] = useState(false);
  const [adminNote, setAdminNote] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch contacts
  const { data: contacts = [], isLoading, error, refetch } = useQuery<Contact[]>({
    queryKey: ['admin-contacts', statusFilter, priorityFilter],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();
        if (statusFilter !== 'all') params.append('status', statusFilter);
        if (priorityFilter !== 'all') params.append('priority', priorityFilter);

        const response = await fetch(`/api/contacts?${params.toString()}`);
        const data = await response.json();
        const contactsData = Array.isArray(data) ? data : (data.data || []);

        // Convert responded field from number to boolean
        return contactsData.map((contact: any) => ({
          ...contact,
          responded: contact.responded === 1 || contact.responded === true
        }));
      } catch (error) {
        console.error('Error fetching contacts:', error);
        return [];
      }
    }
  });

  // Mark as responded mutation
  const respondMutation = useMutation({
    mutationFn: async ({ id, adminNote }: { id: string; adminNote: string }) => {
      const response = await fetch(`/api/contacts/${id}/respond`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          respondedBy: 'Admin User',
          adminNote
        })
      });
      if (!response.ok) throw new Error('Failed to mark as responded');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contacts'] });
      toast({
        title: "Success",
        description: "Contact marked as responded",
      });
      setIsRespondDialogOpen(false);
      setAdminNote("");
      setSelectedContact(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to mark as responded",
        variant: "destructive",
      });
    }
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Failed to update status');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contacts'] });
      toast({
        title: "Success",
        description: "Contact status updated",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive",
      });
    }
  });

  // Delete contact mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete contact');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contacts'] });
      toast({
        title: "Success",
        description: "Contact deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      setSelectedContact(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete contact",
        variant: "destructive",
      });
    }
  });

  // Filter contacts based on search
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDetailDialogOpen(true);
  };

  const handleMarkAsResponded = (contact: Contact) => {
    setSelectedContact(contact);
    setAdminNote("");
    setIsRespondDialogOpen(true);
  };

  const handleToggleResponded = (contact: Contact) => {
    if (contact.responded) {
      // Mark as not responded - update responded field directly
      const response = fetch(`/api/contacts/${contact.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          responded: 0,
          status: 'new'
        })
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ['admin-contacts'] });
        toast({
          title: "Success",
          description: "Đã đánh dấu chưa trả lời",
        });
      }).catch((error) => {
        toast({
          title: "Error",
          description: "Không thể cập nhật trạng thái",
          variant: "destructive",
        });
      });
    } else {
      // Mark as responded
      setSelectedContact(contact);
      setAdminNote("");
      setIsRespondDialogOpen(true);
    }
  };

  const handleDelete = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDeleteDialogOpen(true);
  };

  const confirmRespond = () => {
    if (selectedContact) {
      respondMutation.mutate({
        id: selectedContact.id,
        adminNote
      });
    }
  };

  const confirmDelete = () => {
    if (selectedContact) {
      deleteMutation.mutate(selectedContact.id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'responded': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'responded': return <CheckCircle className="h-4 w-4" />;
      case 'closed': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý Contact</h1>
            <p className="text-gray-600">Xem và trả lời tin nhắn từ khách hàng</p>
          </div>
          <Button
            variant="outline"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Làm mới
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="search">Tìm kiếm</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="search"
                    placeholder="Tìm theo tên, email, công ty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label>Trạng thái</Label>
                <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="new">Mới</SelectItem>
                    <SelectItem value="in-progress">Đang xử lý</SelectItem>
                    <SelectItem value="responded">Đã trả lời</SelectItem>
                    <SelectItem value="closed">Đã đóng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Độ ưu tiên</Label>
                <Select value={priorityFilter} onValueChange={(value: any) => setPriorityFilter(value)}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="high">Cao</SelectItem>
                    <SelectItem value="normal">Bình thường</SelectItem>
                    <SelectItem value="low">Thấp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tổng tin nhắn</p>
                  <p className="text-2xl font-bold">{contacts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Chưa trả lời</p>
                  <p className="text-2xl font-bold">{contacts.filter(c => c.responded === false).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Đã trả lời</p>
                  <p className="text-2xl font-bold">{contacts.filter(c => c.responded === true).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Đang xử lý</p>
                  <p className="text-2xl font-bold">{contacts.filter(c => c.status === 'in-progress').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contacts List */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách Contact ({filteredContacts.length})</CardTitle>
            <CardDescription>
              Quản lý và trả lời tin nhắn từ khách hàng
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchQuery ? 'Không tìm thấy contact nào' : 'Chưa có contact nào'}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-4 border rounded-lg hover:shadow-md transition-shadow ${
                      contact.responded === false ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{contact.name}</h3>
                          <Badge className={getStatusColor(contact.status)}>
                            {getStatusIcon(contact.status)}
                            <span className="ml-1">
                              {contact.status === 'new' && 'Mới'}
                              {contact.status === 'in-progress' && 'Đang xử lý'}
                              {contact.status === 'responded' && 'Đã trả lời'}
                              {contact.status === 'closed' && 'Đã đóng'}
                            </span>
                          </Badge>
                          <Badge className={getPriorityColor(contact.priority)}>
                            {contact.priority === 'high' && 'Cao'}
                            {contact.priority === 'normal' && 'Bình thường'}
                            {contact.priority === 'low' && 'Thấp'}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div className="flex items-center text-gray-600">
                            <Mail className="h-4 w-4 mr-2" />
                            <span>{contact.email}</span>
                          </div>
                          {contact.phone && (
                            <div className="flex items-center text-gray-600">
                              <Phone className="h-4 w-4 mr-2" />
                              <span>{contact.phone}</span>
                            </div>
                          )}
                          {contact.company && (
                            <div className="flex items-center text-gray-600">
                              <Building className="h-4 w-4 mr-2" />
                              <span>{contact.company}</span>
                            </div>
                          )}
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{formatDate(contact.createdAt)}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 line-clamp-2 mb-3">
                          {contact.message}
                        </p>
                        
                        {contact.serviceInterested && (
                          <div className="mb-3">
                            <Badge variant="outline">
                              Quan tâm: {contact.serviceInterested}
                            </Badge>
                          </div>
                        )}
                        
                        {contact.responded && contact.respondedAt && (
                          <div className="text-sm text-green-600 mb-3">
                            ✓ Đã trả lời vào {formatDate(contact.respondedAt)}
                            {contact.respondedBy && ` bởi ${contact.respondedBy}`}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          onClick={() => handleViewDetails(contact)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Chi tiết
                        </Button>
                        {contact.responded ? (
                          <Button
                            size="sm"
                            onClick={() => handleToggleResponded(contact)}
                            className="bg-orange-600 hover:bg-orange-700"
                          >
                            <AlertCircle className="h-4 w-4 mr-1" />
                            Chưa trả lời
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleToggleResponded(contact)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Đã trả lời
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(contact)}
                          className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-2xl bg-white border border-gray-200 shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-gray-900">Chi tiết Contact</DialogTitle>
            </DialogHeader>
            
            {selectedContact && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Tên</Label>
                    <p>{selectedContact.name}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Email</Label>
                    <p>{selectedContact.email}</p>
                  </div>
                  {selectedContact.phone && (
                    <div>
                      <Label className="font-semibold">Điện thoại</Label>
                      <p>{selectedContact.phone}</p>
                    </div>
                  )}
                  {selectedContact.company && (
                    <div>
                      <Label className="font-semibold">Công ty</Label>
                      <p>{selectedContact.company}</p>
                    </div>
                  )}
                  <div>
                    <Label className="font-semibold">Nguồn</Label>
                    <p>{selectedContact.source}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Ngày tạo</Label>
                    <p>{formatDate(selectedContact.createdAt)}</p>
                  </div>
                </div>
                
                {selectedContact.serviceInterested && (
                  <div>
                    <Label className="font-semibold">Dịch vụ quan tâm</Label>
                    <p>{selectedContact.serviceInterested}</p>
                  </div>
                )}
                
                <div>
                  <Label className="font-semibold">Tin nhắn</Label>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>
                
                {selectedContact.adminNote && (
                  <div>
                    <Label className="font-semibold">Ghi chú admin</Label>
                    <div className="mt-2 p-3 bg-yellow-50 rounded-lg">
                      <p className="whitespace-pre-wrap">{selectedContact.adminNote}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Badge className={getStatusColor(selectedContact.status)}>
                    {selectedContact.status}
                  </Badge>
                  <Badge className={getPriorityColor(selectedContact.priority)}>
                    {selectedContact.priority}
                  </Badge>
                  {selectedContact.responded && (
                    <Badge className="bg-green-100 text-green-800">
                      Đã trả lời
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Mark as Responded Dialog */}
        <Dialog open={isRespondDialogOpen} onOpenChange={setIsRespondDialogOpen}>
          <DialogContent className="bg-white border border-gray-200 shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-gray-900">Đánh dấu đã trả lời</DialogTitle>
              <DialogDescription className="text-gray-600">
                Đánh dấu contact này đã được trả lời và thêm ghi chú nếu cần
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="adminNote">Ghi chú admin (tùy chọn)</Label>
                <Textarea
                  id="adminNote"
                  placeholder="Thêm ghi chú về cách xử lý contact này..."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsRespondDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button
                onClick={confirmRespond}
                disabled={respondMutation.isPending}
                className="bg-green-600 hover:bg-green-700"
              >
                {respondMutation.isPending ? 'Đang xử lý...' : 'Đánh dấu đã trả lời'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="bg-white border border-gray-200 shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-gray-900">Xác nhận xóa</DialogTitle>
              <DialogDescription className="text-gray-600">
                Bạn có chắc chắn muốn xóa contact từ "{selectedContact?.name}"?
                Hành động này không thể hoàn tác.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? 'Đang xóa...' : 'Xóa'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
