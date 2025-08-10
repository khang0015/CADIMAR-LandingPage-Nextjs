"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Mail, 
  Building, 
  Phone, 
  MessageSquare, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Search,
  Eye
} from "lucide-react";
import { ApiClient } from "@/lib/api-client";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterested?: string;
  message: string;
  responded?: boolean;
  adminNote?: string;
  createdAt: string;
}

export default function ContactList() {
  const queryClient = useQueryClient();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'responded' | 'unresponded'>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch contacts
  const { data: contacts = [], isLoading, error } = useQuery<Contact[]>({
    queryKey: ['contacts'],
    queryFn: async () => {
      try {
        const response = await ApiClient.getContacts();
        return Array.isArray(response) ? response : (response as any).data || [];
      } catch (error) {
        console.error('Error fetching contacts:', error);
        return [];
      }
    }
  });

  // Update contact mutation
  const updateContactMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Contact> }) => {
      return ApiClient.updateContact(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      setIsDialogOpen(false);
    }
  });

  // Delete contact mutation
  const deleteContactMutation = useMutation({
    mutationFn: (id: string) => ApiClient.deleteContact(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    }
  });

  // Filter contacts
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'responded' && contact.responded) ||
                         (statusFilter === 'unresponded' && !contact.responded);
    
    return matchesSearch && matchesStatus;
  });

  const handleDeleteContact = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa liên hệ này?')) {
      deleteContactMutation.mutate(id);
    }
  };

  const handleUpdateResponse = (contact: Contact, responded: boolean, adminNote?: string) => {
    updateContactMutation.mutate({
      id: contact.id,
      data: { responded, adminNote }
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Lỗi khi tải danh sách liên hệ</p>
      </div>
    );
  }

  const stats = {
    total: contacts.length,
    responded: contacts.filter(c => c.responded).length,
    unresponded: contacts.filter(c => !c.responded).length,
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="flex gap-4">
        <Badge variant="outline" className="text-sm">
          Tổng: {stats.total}
        </Badge>
        <Badge variant="default" className="text-sm bg-green-600">
          Đã trả lời: {stats.responded}
        </Badge>
        <Badge variant="destructive" className="text-sm">
          Chưa trả lời: {stats.unresponded}
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Tìm kiếm theo tên, email, công ty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="responded">Đã trả lời</SelectItem>
            <SelectItem value="unresponded">Chưa trả lời</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Contact List */}
      <div className="space-y-4">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Không có liên hệ nào phù hợp
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-4 border rounded-lg ${
                contact.responded ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{contact.name}</h3>
                    {contact.responded ? (
                      <CheckCircle className="text-green-600" size={20} />
                    ) : (
                      <XCircle className="text-red-600" size={20} />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      {contact.email}
                    </div>
                    {contact.phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={16} />
                        {contact.phone}
                      </div>
                    )}
                    {contact.company && (
                      <div className="flex items-center gap-2">
                        <Building size={16} />
                        {contact.company}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      {new Date(contact.createdAt).toLocaleDateString('vi-VN')}
                    </div>
                  </div>

                  {contact.serviceInterested && (
                    <div className="mt-2">
                      <Badge variant="secondary">{contact.serviceInterested}</Badge>
                    </div>
                  )}

                  <div className="mt-3">
                    <p className="text-sm text-gray-700 line-clamp-2">{contact.message}</p>
                  </div>

                  {contact.adminNote && (
                    <div className="mt-3 p-2 bg-blue-50 border-l-4 border-blue-300">
                      <p className="text-sm text-blue-800">
                        <strong>Ghi chú admin:</strong> {contact.adminNote}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <Dialog open={isDialogOpen && selectedContact?.id === contact.id} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedContact(contact)}
                      >
                        <Eye size={16} />
                      </Button>
                    </DialogTrigger>
                    <ContactDetailDialog
                      contact={contact}
                      onUpdate={handleUpdateResponse}
                      isUpdating={updateContactMutation.isPending}
                    />
                  </Dialog>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteContact(contact.id)}
                    disabled={deleteContactMutation.isPending}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Contact Detail Dialog Component
function ContactDetailDialog({ 
  contact, 
  onUpdate, 
  isUpdating 
}: { 
  contact: Contact; 
  onUpdate: (contact: Contact, responded: boolean, adminNote?: string) => void;
  isUpdating: boolean;
}) {
  const [responded, setResponded] = useState(contact.responded || false);
  const [adminNote, setAdminNote] = useState(contact.adminNote || "");

  const handleSave = () => {
    onUpdate(contact, responded, adminNote);
  };

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Chi tiết liên hệ - {contact.name}</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Email</Label>
            <p className="text-sm text-gray-600">{contact.email}</p>
          </div>
          {contact.phone && (
            <div>
              <Label>Điện thoại</Label>
              <p className="text-sm text-gray-600">{contact.phone}</p>
            </div>
          )}
          {contact.company && (
            <div>
              <Label>Công ty</Label>
              <p className="text-sm text-gray-600">{contact.company}</p>
            </div>
          )}
          <div>
            <Label>Ngày tạo</Label>
            <p className="text-sm text-gray-600">
              {new Date(contact.createdAt).toLocaleString('vi-VN')}
            </p>
          </div>
        </div>

        {contact.serviceInterested && (
          <div>
            <Label>Dịch vụ quan tâm</Label>
            <p className="text-sm text-gray-600">{contact.serviceInterested}</p>
          </div>
        )}

        <div>
          <Label>Tin nhắn</Label>
          <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded-md">
            {contact.message}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="responded"
            checked={responded}
            onCheckedChange={setResponded}
          />
          <Label htmlFor="responded">Đã trả lời</Label>
        </div>

        <div>
          <Label htmlFor="adminNote">Ghi chú admin</Label>
          <Textarea
            id="adminNote"
            value={adminNote}
            onChange={(e) => setAdminNote(e.target.value)}
            placeholder="Thêm ghi chú..."
            rows={3}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            onClick={handleSave}
            disabled={isUpdating}
          >
            {isUpdating ? "Đang lưu..." : "Lưu"}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
