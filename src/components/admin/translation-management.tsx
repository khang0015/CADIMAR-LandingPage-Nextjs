"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages, Plus, Edit, Trash2, Search } from "lucide-react";

interface Translation {
  id: string;
  lang: string;
  key: string;
  value: string;
}

interface NewTranslation {
  lang: string;
  key: string;
  value: string;
}

// Mock data for development
const mockTranslations: Translation[] = [
  {
    id: "1",
    lang: "en",
    key: "nav.home",
    value: "Home"
  },
  {
    id: "2",
    lang: "vi",
    key: "nav.home",
    value: "Trang chủ"
  },
  {
    id: "3",
    lang: "en",
    key: "hero.title",
    value: "Transform Your Business"
  },
  {
    id: "4",
    lang: "vi",
    key: "hero.title",
    value: "Chuyển đổi Doanh nghiệp"
  }
];

export function TranslationManagement() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLang, setSelectedLang] = useState<string>("all");
  const [editingTranslation, setEditingTranslation] = useState<Translation | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newTranslation, setNewTranslation] = useState<NewTranslation>({
    lang: "en",
    key: "",
    value: ""
  });

  const { data: translations = mockTranslations, isLoading } = useQuery<Translation[]>({
    queryKey: ["/api/admin/translations"],
    queryFn: async () => {
      // For now, return mock data
      return mockTranslations;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: NewTranslation) => {
      // Mock API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 1000);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/translations"] });
      setIsCreating(false);
      setNewTranslation({ lang: "en", key: "", value: "" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<NewTranslation> }) => {
      // Mock API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 1000);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/translations"] });
      setEditingTranslation(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Mock API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 1000);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/translations"] });
    }
  });

  const filteredTranslations = translations.filter(translation => {
    const matchesSearch = translation.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         translation.value.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLang = selectedLang === "all" || translation.lang === selectedLang;
    return matchesSearch && matchesLang;
  });

  const handleCreateTranslation = () => {
    if (!newTranslation.key || !newTranslation.value) {
      return;
    }
    createMutation.mutate(newTranslation);
  };

  const handleUpdateTranslation = (translation: Translation) => {
    if (!translation.key || !translation.value) {
      return;
    }
    updateMutation.mutate({
      id: translation.id,
      data: {
        lang: translation.lang,
        key: translation.key,
        value: translation.value
      }
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Translation Management
        </h2>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-brand-red hover:bg-red-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Translation
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search translations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedLang} onValueChange={setSelectedLang}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="vi">Vietnamese</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Create Translation Form */}
      {isCreating && (
        <Card className="border-brand-red">
          <CardHeader>
            <CardTitle className="text-lg">Create New Translation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-lang">Language</Label>
                <Select 
                  value={newTranslation.lang} 
                  onValueChange={(value) => setNewTranslation(prev => ({ ...prev, lang: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="vi">Vietnamese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-key">Key</Label>
                <Input
                  id="new-key"
                  placeholder="e.g., nav.home"
                  value={newTranslation.key}
                  onChange={(e) => setNewTranslation(prev => ({ ...prev, key: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-value">Value</Label>
              <Textarea
                id="new-value"
                placeholder="Translation text"
                value={newTranslation.value}
                onChange={(e) => setNewTranslation(prev => ({ ...prev, value: e.target.value }))}
                rows={3}
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleCreateTranslation}
                disabled={createMutation.isPending}
                className="bg-brand-red hover:bg-red-600"
              >
                {createMutation.isPending ? "Creating..." : "Create Translation"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreating(false);
                  setNewTranslation({ lang: "en", key: "", value: "" });
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Translations List */}
      <div className="space-y-3">
        {filteredTranslations.map((translation, index) => (
          <motion.div
            key={translation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="border-gray-200 dark:border-gray-700">
              <CardContent className="p-4">
                {editingTranslation?.id === translation.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Language</Label>
                        <Select 
                          value={editingTranslation.lang} 
                          onValueChange={(value) => setEditingTranslation(prev => 
                            prev ? { ...prev, lang: value } : null
                          )}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="vi">Vietnamese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Key</Label>
                        <Input
                          value={editingTranslation.key}
                          onChange={(e) => setEditingTranslation(prev => 
                            prev ? { ...prev, key: e.target.value } : null
                          )}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Value</Label>
                      <Textarea
                        value={editingTranslation.value}
                        onChange={(e) => setEditingTranslation(prev => 
                          prev ? { ...prev, value: e.target.value } : null
                        )}
                        rows={3}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleUpdateTranslation(editingTranslation)}
                        disabled={updateMutation.isPending}
                        className="bg-brand-red hover:bg-red-600"
                      >
                        {updateMutation.isPending ? "Updating..." : "Update"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setEditingTranslation(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {translation.lang.toUpperCase()}
                        </Badge>
                        <code className="text-sm font-mono text-gray-600 dark:text-gray-400">
                          {translation.key}
                        </code>
                      </div>
                      <p className="text-gray-900 dark:text-white">
                        {translation.value}
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingTranslation(translation)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteMutation.mutate(translation.id)}
                        disabled={deleteMutation.isPending}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredTranslations.length === 0 && (
        <Card className="border-gray-200 dark:border-gray-700">
          <CardContent className="p-8 text-center">
            <Languages className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No translations found matching your criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 