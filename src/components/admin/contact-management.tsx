"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Mail, Building, Phone, MessageSquare, Calendar, CheckCircle, XCircle } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
  responded: boolean;
  adminNote?: string;
  createdAt: string;
}

// Mock data for development
const mockContacts: Contact[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    company: "Tech Corp",
    service: "Social Media Marketing",
    message: "Hi, I'm interested in your TikTok advertising services. Can you provide more information about your packages?",
    responded: false,
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    company: "Fashion Brand",
    service: "Content Creation",
    message: "We're looking for help with our social media presence. Your services look promising!",
    responded: true,
    adminNote: "Called on Jan 16th, interested in monthly package",
    createdAt: "2024-01-14T15:45:00Z"
  }
];

export function ContactManagement() {
  const queryClient = useQueryClient();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [responded, setResponded] = useState(false);

  const { data: contacts = mockContacts, isLoading } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
    queryFn: async () => {
      // For now, return mock data
      return mockContacts;
    }
  });

  const updateContactMutation = useMutation({
    mutationFn: async ({ id, responded, adminNote }: { id: string; responded: boolean; adminNote: string }) => {
      // Mock API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 1000);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
      setSelectedContact(null);
      setAdminNote("");
      setResponded(false);
    }
  });

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    setAdminNote(contact.adminNote || "");
    setResponded(contact.responded);
  };

  const handleUpdateContact = () => {
    if (!selectedContact) return;
    updateContactMutation.mutate({
      id: selectedContact.id,
      responded,
      adminNote
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Contact Management
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {contacts.length} total contacts
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contacts List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Submissions
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {contacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedContact?.id === contact.id 
                      ? "ring-2 ring-brand-red border-brand-red" 
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                  onClick={() => handleContactClick(contact)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {contact.name}
                        </h4>
                        <Badge 
                          variant={contact.responded ? "default" : "secondary"}
                          className={contact.responded ? "bg-green-500" : "bg-gray-500"}
                        >
                          {contact.responded ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <XCircle className="h-3 w-3 mr-1" />
                          )}
                          {contact.responded ? "Responded" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{contact.email}</span>
                      </div>
                      {contact.company && (
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4" />
                          <span>{contact.company}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(contact.createdAt)}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-2">
                      {contact.message}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Contact Details
          </h3>
          
          {selectedContact ? (
            <Card className="border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedContact.name}</span>
                  <Badge 
                    variant={selectedContact.responded ? "default" : "secondary"}
                    className={selectedContact.responded ? "bg-green-500" : "bg-gray-500"}
                  >
                    {selectedContact.responded ? "Responded" : "Pending"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {selectedContact.email}
                    </span>
                  </div>
                  {selectedContact.company && (
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {selectedContact.company}
                      </span>
                    </div>
                  )}
                  {selectedContact.service && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {selectedContact.service}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {formatDate(selectedContact.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>Message</span>
                  </Label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
                    {selectedContact.message}
                  </div>
                </div>

                {/* Response Status */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="responded"
                      checked={responded}
                      onCheckedChange={setResponded}
                    />
                    <Label htmlFor="responded">Mark as responded</Label>
                  </div>

                  {/* Admin Note */}
                  <div className="space-y-2">
                    <Label htmlFor="admin-note">Admin Note</Label>
                    <Textarea
                      id="admin-note"
                      placeholder="Add your notes about this contact..."
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button 
                    onClick={handleUpdateContact}
                    disabled={updateContactMutation.isPending}
                    className="w-full bg-brand-red hover:bg-red-600"
                  >
                    {updateContactMutation.isPending ? "Updating..." : "Update Contact"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-gray-200 dark:border-gray-700">
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Select a contact to view details and manage their status.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 