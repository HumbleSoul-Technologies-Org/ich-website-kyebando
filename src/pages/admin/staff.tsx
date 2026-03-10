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
import { Plus, Mail, Phone, MoreVertical, Edit, Trash2, Loader } from "lucide-react";
import axios from "axios";
import { set } from "date-fns";
import { apiRequest } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";

export default function AdminStaffPage() {

  const { data: staffData, isLoading: staffLoading } = useQuery<any>({
    queryKey: ['staff','all'],
  })  
  const [staff, setStaff] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<any>({
    _id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    gender: "",
    image:{url:"",public_id:""},
  });
  const [selectedImage, setSelectedImage] = useState<File|null>(null);
  const [imagePreview, setImagePreview] = useState<string|null>(null);
  const [saving, setSaving] = useState<boolean|null>(null);
  const [deleting, setDeleting] = useState<string|null>(null);

  useEffect(() => {
    if (staffData) {
      setStaff(staffData); 
    }
    
    
  }, []);

  const resetForm = () => {
    setFormData({
      _id: "",
      name: "",
      email: "",
      phone: "",
      role: "",
      gender: "",
      image:{url:"",public_id:""},
    });
    setSelectedImage(null);
    setIsEditMode(false);
  };

   // upload the selected image to the server
    const uploadFileToServer = async (file: File) => {
      
      try {
        const formData = new FormData();
        formData.append("image", file);
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/staff/upload/image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return data;
      } catch (error) {
      
        return {url:'',public_id:''};
      }  
    };

  const handleAddStaff = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (member: any) => {
    setFormData({
      _id: member._id,
      name: member.name,
      email: member.email,
      phone: member.phone,
      role: member.role,
      gender: member.gender,
      image: member.image || member.photo || {url:'',public_id:''},
    });
    setSelectedImage(null);
    setImagePreview(member.image?.url || member.photo?.url || null);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (memberId: string) => {
    setDeleting(memberId);
    try {
      await apiRequest('DELETE',`/staff/delete/${memberId}`);
     setStaff(staff.filter((m) => m._id !== memberId));
   } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
   }finally {
    setDeleting(null);
   }
  };

  const handleSaveStaff = async() => {
    try {
     setSaving(true);
     if (!formData.name || !formData.email || !formData.role) {
      alert("Please fill in all required fields");
      return;
    }

    let photoData = {url:'',public_id:''};
    if (selectedImage) {
      photoData = await uploadFileToServer(selectedImage);
    }

    // Use uploaded image if available, otherwise use existing image
    const finalImage = photoData.url ? photoData : formData.image;

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      gender: formData.gender,
      image: finalImage,
    };

    if (isEditMode) {
      await apiRequest('PUT',`/staff/update/${formData._id}`, payload);
      setStaff(
        staff.map((m) =>
          m._id === formData._id ? { ...m, ...payload, _id: formData._id } : m
        )
      );
    } else {
      const response = await apiRequest('POST','/staff/create', payload);
      setStaff([...staff, { ...response, _id: response._id || response.id }]);
    }

    setIsDialogOpen(false);
    resetForm();
   } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    } finally {
     setSaving(false);
      
   }
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
        setImagePreview(imageData);
        setSelectedImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  if (staffLoading) {
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
          {staff.length === 0 ? (
            <div className="col-span-full">
              <div className=" bg-white flex-1 h-screen flex items-center justify-center   rounded-lg p-8 text-center">
                <span>
                  <img src='/no-user.avif' className="w-96 h-96 object-cover rounded-lg" />
                  No staff members found. Click "Add Staff" to create your first staff profile.
                </span>
              </div>
            </div>
          ) : (
            staff.map((member) => (
              <div
                key={member._id}
                className="relative h-80 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                style={{
                  backgroundImage: `url(${member.image?.url || member.photo?.url})`,
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
                        onClick={() => handleDelete(member._id)}
                        className="gap-2 text-red-600 focus:text-red-600"
                      >
                        {deleting === member._id ? (
                          <><Loader className="w-4 h-4 animate-spin" /> Deleting...</>
                        ) : (
                          <><Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                          </>
                        )}
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
            ))
          )}
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
                    value={formData?.image?.url}
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
                {(formData.image.url || imagePreview) && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
                    <img
                      src={imagePreview || formData.image.url}
                      alt="Staff preview"
                      className="w-full h-40 object-contain rounded-lg  "
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
              {isEditMode ? (saving ? "Updating..." : "Update Staff") : (saving ? "Saving..." : "Save Staff")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
