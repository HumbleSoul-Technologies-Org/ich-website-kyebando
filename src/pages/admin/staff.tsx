import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { staff as mockStaff } from "@/lib/mockData";
import { Plus, Mail, Phone, MoreVertical, Edit, Trash2 } from "lucide-react";

export default function AdminStaffPage() {
  const [staff, setStaff] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<any>({
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    gender: "",
    image: "",
  });
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    setStaff(mockStaff);
    setIsLoading(false);
  }, []);

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      email: "",
      phone: "",
      role: "",
      gender: "",
      image: "",
    });
    setSelectedImage("");
    setIsEditMode(false);
  };

  const handleAddStaff = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (member: any) => {
    setFormData(member);
    setSelectedImage("");
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (memberId: string) => {
    setStaff(staff.filter((m) => m.id !== memberId));
  };

  const handleSaveStaff = () => {
    if (!formData.name || !formData.email || !formData.role) {
      alert("Please fill in all required fields");
      return;
    }

    // Use uploaded image if available, otherwise use URL
    const finalData = {
      ...formData,
      image: selectedImage || formData.image,
    };

    if (isEditMode) {
      setStaff(
        staff.map((m) =>
          m.id === finalData.id ? finalData : m
        )
      );
    } else {
      const newStaff = {
        ...finalData,
        id: Date.now().toString(),
      };
      setStaff([...staff, newStaff]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setSelectedImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading staff...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Staff</h1>
            <p className="text-muted-foreground mt-1">
              Manage community staff and facilitators
            </p>
          </div>
          <Button onClick={handleAddStaff} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Staff
          </Button>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff.map((member) => (
            <div
              key={member.id}
              className="relative h-80 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              style={{
                backgroundImage: `url(${member.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Black gradient overlay from left */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

              {/* Menu Button */}
              <div className="absolute top-3 right-3 z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 bg-black/40 hover:bg-black/60 text-white"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(member)} className="gap-2">
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(member.id)}
                      className="gap-2 text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-sm text-gray-200">{member.role}</p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-200" />
                      <span className="text-gray-200 truncate">{member.email}</span>
                    </div>
                    {member.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-200" />
                        <span className="text-gray-200">{member.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Badge variant="secondary" className="text-xs">
                      {member.gender}
                    </Badge>
                    {/* <Badge variant="default" className="text-xs">
                      {member.role}
                    </Badge> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[700px] overflow-auto">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Staff" : "Add New Staff"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Staff member name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="Email address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                placeholder="Phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Trainer">Trainer</SelectItem>
                  <SelectItem value="Facilitator">Facilitator</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Mentor">Mentor</SelectItem>
                  <SelectItem value="Coordinator">Coordinator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Image</Label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleFormChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                    <span className="text-sm font-medium text-gray-700">+ Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Image Preview */}
                {(formData.image || selectedImage) && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
                    <img
                      src={selectedImage || formData.image}
                      alt="Staff preview"
                      className="w-full h-40 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveStaff}>
              {isEditMode ? "Update Staff" : "Create Staff"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
