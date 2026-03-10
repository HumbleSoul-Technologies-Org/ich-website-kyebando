import { useEffect, useState, useRef } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical, Edit, Star, View,  Trash2, Image as ImageIcon, Users, Loader2, Loader, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import axios from "axios";
 
import { apiRequest } from "@/lib/queryClient";
import { set } from "date-fns";

export default function AdminVisitsPage() {

  const { data: visitsData, isLoading: visitsLoading } = useQuery<any>({
    queryKey: ["visits","all"],
  })

  const [visits, setVisits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "visited" | "upcoming">("all");
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<any | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    community: "",
    title: "",
    country: "",
    date: "",
    excerpt: "",
    content: "",
    thumbnail: {url:'',public_id:''},
    videoId: "",
    status: "upcoming",
    participants: [],
    location: { lat: "", long: "" },
    
  });
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryForm, setGalleryForm] = useState<{   image: { url: string; public_id: string } }>({   image: { url: "", public_id: "" } });
  const galleryFileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
  const [galleryDragActive, setGalleryDragActive] = useState(false);
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const [participantForm, setParticipantForm] = useState<{ name: string; email: string; phone: string; role: string;   photo: { url: string; public_id: string } }>({ name: "", email: "", phone: "", role: "" , photo: { url: "" ,public_id:''} });
  const participantImageInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedParticipantImage, setSelectedParticipantImage] = useState<string | null>(null);
  const [participantPhoto, setParticipantPhoto] = useState<File | null>(null);
  const [galleryImage, setGalleryImage] = useState<File | null>(null);
  const [patId, setPatId] = useState<String | null>('');
  const [galId, setGalId] = useState<String | null>('');
  const [deleting, setDeleting] = useState<String | null>('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => { 
    if (visitsData) { 
      setVisits(visitsData);
    }
  }, [visitsData])

  const handleThumbnailUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      setSelectedImage(file);
      setSelectedImagePreview(dataUrl);
      // setFormData((prev: any) => ({ ...prev, thumbnail: { ...prev.thumbnail, url: dataUrl } }));
    };
    reader.readAsDataURL(file);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleThumbnailUpload(f);
  };

  const handleGalleryUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      setSelectedGalleryImage(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const onGalleryFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { handleGalleryUpload(f); setGalleryImage(f)};
  };

  const handleGalleryDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setGalleryDragActive(true);
    } else if (e.type === "dragleave") {
      setGalleryDragActive(false);
    }
  };

  const handleGalleryDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setGalleryDragActive(false);
    
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      handleGalleryUpload(files[0]);
      setGalleryImage(files[0]);
    }
  };

  const handleGallerySubmit = async (visitId: string) => {
    // e.preventDefault();
    setSaving(true);
     try {
       const image = await uploadFileToServer(galleryImage as File);
       await apiRequest("POST", `/visits/add/gallery/${visitId}`, { image });
       setGalleryForm({ image: { url: "", public_id: "" } });
       setSelectedVisit((prev: any) => (prev ? { ...prev, gallery: [...(prev.gallery || []), image] } : prev));
       setGalleryOpen(false);
    setGalleryForm({ image: { url: "", public_id: "" } });
    setSelectedGalleryImage(null);
    setGalleryDragActive(false);
    if (galleryFileInputRef.current) {
      galleryFileInputRef.current.value = "";
    }
    setOpenMenu(null);
     } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
     }finally {
      setSaving(false);
     }

     
  };

  const viewDetails = (visit: any) => {
    setSelectedVisit(visit);
    setDialogOpen(true);
    setOpenMenu(null);
  };

  const editVisit = (visit: any) => {
    // open form populated for editing
    setFormData({
      ...visit,
      participants: visit.participants ? visit.participants.map((p: any) => ({ name: p.name || "", phone: p.phone || "", role: p.role || "" })) : [],
      videoId: visit.videoId || "",
      content: visit.content || "",
      location: visit.location ? { lat: String(visit.location.lat), long: String(visit.location.long) } : { lat: "", long: "" },
    });
    setSelectedImage(null);
    setSelectedImagePreview(null);
    setFormOpen(true);
    setOpenMenu(null);
  };

  const openGallery = (visit: any) => {
    setSelectedVisit(visit);
    setGalleryForm({ image: { url: "", public_id: "" } });
    setSelectedGalleryImage(null);
    setGalleryDragActive(false);
    if (galleryFileInputRef.current) {
      galleryFileInputRef.current.value = "";
    }
    setGalleryOpen(true);
    setOpenMenu(null);
  };

  const handleParticipantImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      setSelectedParticipantImage(dataUrl);
      setParticipantPhoto(file);
    };
    reader.readAsDataURL(file);
  };

  const onParticipantImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleParticipantImageUpload(f);
  };

  const openParticipants = (visit: any) => {
    setSelectedVisit(visit);
    setParticipantForm({ name: "", email: "", phone: "", role: "",   photo: { url: "", public_id: "" } });
    setSelectedParticipantImage(null);
    setParticipantPhoto(null);
    if (participantImageInputRef.current) {
      participantImageInputRef.current.value = "";
    }
    setParticipantsOpen(true);
    setOpenMenu(null);
  };

  const handleParticipantSubmit = async (visitId: string  ) => {
    // e.preventDefault();
    if (!selectedVisit) return;
    setSaving(true);
    try {
      let photoData = { url: "", public_id: "" };
      
      const photoUrl = await uploadFileToServer(participantPhoto as File);
        photoData = { url: photoUrl.url  , public_id: photoUrl.public_id   };
      
      const payload = {
        name: participantForm.name || "",
        email: participantForm.email || "",
        phone: participantForm.phone || "",
        role: participantForm.role || "",
        photo: photoData,
      }
 
      await apiRequest("POST", `/visits/add/participant/${visitId}`, payload);
       setVisits((prev) => prev.map((v) => (v.id === visitId ? { ...v, participants: [...(v.participants || []), payload] } : v)));
    setSelectedVisit((prev: any) => (prev ? { ...prev, participants: [...(prev.participants || []), payload] } : prev));
    setParticipantsOpen(false);
    setOpenMenu(null);
    setParticipantPhoto(null);
    setSelectedParticipantImage(null);
    if (participantImageInputRef.current) {
      participantImageInputRef.current.value = "";
    }
       
    } catch (error) {
     
    } finally {
      setSaving(false);
    }
    // const newParticipant = {
    //   name: participantForm.name || "",
    //   email: participantForm.email || "",
    //   phone: participantForm.phone || "",
    //   role: participantForm.role || "",
    //   url: participantForm.url || "",
    //   photo: participantForm.photo || { url: "", public_id: "" },
    // };

    // setVisits((prev) => prev.map((v) => (v.id === selectedVisit.id ? { ...v, participants: [...(v.participants || []), newParticipant] } : v)));
    // setSelectedVisit((prev: any) => (prev ? { ...prev, participants: [...(prev.participants || []), newParticipant] } : prev));
    // setParticipantsOpen(false);
    // setOpenMenu(null);
  };

  const removeParticipant = async (visitId: string, participantId: string) => {
    setPatId(participantId);
    try {
      await apiRequest("POST", `/visits/remove/participant/${visitId}`, { participantId });
      setSelectedVisit((prev: any) => {
        if (!prev) return prev;
        return { ...prev, participants: prev.participants.filter((p: any) => p._id !== participantId) };
      });
    } catch (error) {
       
    } finally { setPatId(null); }
   }
  const removeGalleryImage = async (visitId: string, galleryId: string) => {
    setGalId(galleryId);
    try {
      await apiRequest("POST", `/visits/remove/image/${visitId}`, { galleryId });
      setSelectedVisit((prev: any) => {
        if (!prev) return prev;
        return { ...prev, participants: prev.participants.filter((p: any) => p._id !== galleryId) };
      });
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    } finally { setGalId(null); }
   }

  const openCreateForm = () => {
    setFormData({
      community: "",
      title: "",
      country: "",
      date: "",
      content: "",
      excerpt: "",
      thumbnail: {url:'',public_id:''},
      status: "upcoming",
      participants: [],
       
    });
    setSelectedImage(null);
    setSelectedImagePreview(null);
    setFormOpen(true);
  };

  const handleFormChange = (key: string, value: any) => {
    setFormData((prev: any) => {
      if (key === "locationLat") {
        return { ...prev, location: { ...prev.location, lat: value } };
      }
      if (key === "locationLong") {
        return { ...prev, location: { ...prev.location, long: value } };
      }
      if (key === "thumbnail") {
        return { ...prev, thumbnail: { ...prev.thumbnail, url: value } };
      }
      return { ...prev, [key]: value };
    });
  };

  

  const handleUseCurrentLocationChange = (checked: boolean) => {
    setUseCurrentLocation(checked);
    if (checked) {
      if (!navigator.geolocation) {
        alert("Geolocation is not available in your browser");
        setUseCurrentLocation(false);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          handleFormChange('locationLat', String(pos.coords.latitude));
          handleFormChange('locationLong', String(pos.coords.longitude));
        },
        (err) => {
          alert('Could not get current location: ' + err.message);
          setUseCurrentLocation(false);
        }
      );
    }
  };

   // upload the selected image to the server
  const uploadFileToServer = async (file: File) => {
    
    try {
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/visits/upload/image`,
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

  const handleFormSubmit = async(e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
       
let thumbnailUrl = {url: formData.thumbnail?.url || "", public_id: formData.thumbnail?.public_id || ""};
      
      if (selectedImage) {
        thumbnailUrl = await uploadFileToServer(selectedImage as File);
      }
      const payload = {
      ...formData,
        videoId: formData.videoId || "",
      thumbnail: { url: thumbnailUrl.url||formData.thumbnail?.url,public_id: thumbnailUrl.public_id||"" } ,
      location: {
        lat: formData.location && formData.location.lat ? Number(formData.location.lat) : 0,
        long: formData.location && formData.location.long ? Number(formData.location.long) : 0,
      },
      };
      
    if (!!editVisit||selectedVisit._id) {
      // update
       await apiRequest("PUT", `/visits/update/${selectedVisit._id}`, payload);
      setVisits((prev) => prev.map((v) => (v.id === formData.id ? { ...v, ...payload } : v)));
    } else {
      // create
       await apiRequest("POST", "/visits/create", payload);
      const nextId = Math.max(0, ...visits.map((v) => v.id || 0)) + 1;
      setVisits((prev) => [{ id: nextId, ...payload }, ...prev]);
    }

    setFormOpen(false);
    setOpenMenu(null);
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    } finally {
      setSaving(false);
    }
  };

  const toggleFeatured = async (visit: any) => {
    setProcessing(true);
    try {
      await apiRequest("POST", `/visits/featured/${visit._id}`);
      setVisits((prev) => prev.map((v) => ({ ...v, featured: v._id === visit._id })));
    } catch (error) {
      console.error(error);
    }finally { setProcessing(false); }
  };

  const deleteVisit = async (visit: any) => {
    setDeleting(visit._id);
    try {
       await apiRequest("DELETE", `/visits/delete/${visit._id}`);
        setVisits((prev) => prev.filter((v) => v._id !== visit._id));
    setOpenMenu(null);
    } catch (error) {
       
    }finally { setDeleting(null); }
  };

   

  const filteredVisits = visits.filter((visit) => {
    // Filter by status
    if (statusFilter !== "all" && visit.status !== statusFilter) {
      return false;
    }

    // Filter by search term (community, country, date)
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const matchCommunity = visit.community.toLowerCase().includes(search);
      const matchCountry = visit.country.toLowerCase().includes(search);
      const matchDate = new Date(visit.date)
        .toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        .toLowerCase()
        .includes(search);
      
      return matchCommunity || matchCountry || matchDate;
    }

    return true;
  });

  if (visitsLoading) {
    return (
      <AdminLayout>
        <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading visits...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Visits</h1>
              <p className="text-muted-foreground mt-1">Track community visits and engagements</p>
            </div>
            <div>
              <Button onClick={openCreateForm} size="sm">Add Visit</Button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="border-0">
          <CardContent className="pt-6">
            <div className=" flex items-center justify-center md:justify-between gap-2">
              {/* Search Input */}
              <div className="relative flex items-center w-1/2 md:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by community, country, or date..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-80"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  onClick={() => setStatusFilter("all")}
                  size="sm"
                >
                  All ({visits.length})
                </Button>
                <Button
                  variant={statusFilter === "visited" ? "default" : "outline"}
                  onClick={() => setStatusFilter("visited")}
                  size="sm"
                >
                  Visited ({visits.filter(v => v.status === "visited").length})
                </Button>
                <Button
                  variant={statusFilter === "upcoming" ? "default" : "outline"}
                  onClick={() => setStatusFilter("upcoming")}
                  size="sm"
                >
                  Upcoming ({visits.filter(v => v.status === "upcoming").length})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visits Cards Grid */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {filteredVisits.length} Result{filteredVisits.length !== 1 ? "s" : ""}
            </h2>
          </div>
          
          {filteredVisits.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground py-8">
                  No visits found matching your criteria
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVisits.map((visit) => (
                <div 
                  key={visit.id} 
                  className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-96 group"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={typeof visit.thumbnail === 'string' ? visit.thumbnail : visit.thumbnail?.url} 
                      alt={visit.community}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
                    {/* Top Section */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl text-primary font-bold mb-1">{visit.community}</h3>
                        <p className="text-sm text-white/80">{visit.country}</p>
                      </div>
                      <Badge variant={visit.status === "visited" ? "default" : "secondary"}>
                        {visit.status === "visited" ? "Visited" : "Upcoming"}
                      </Badge>
                    </div>

                    {/* Bottom Section */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-medium text-white/70 uppercase">Date</p>
                        <p className="text-sm">
                          {new Date(visit.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>

                      <p className="text-sm text-white/90 line-clamp-2">{visit.excerpt}</p>

                      <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/20">
                        <div>
                          <p className="text-xs font-medium text-white/70">Participants</p>
                          <p className="text-lg font-semibold">{visit.participants.length}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-white/70">Likes</p>
                          <p className="text-lg font-semibold">{visit.likes.length || 0}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-white/70">Views</p>
                          <p className="text-lg font-semibold">{visit.views.length || 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Three-dot menu */}
                  <div className="absolute bottom-4 right-4 z-20 text-sm">
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === visit.id ? null : visit.id)}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-full"
                        aria-label="Actions"
                      >
                        <MoreVertical className="w-5 h-5 text-white" />
                      </button>

                      {openMenu === visit.id && (
                        <div className="absolute bottom-10 right-0 mt-2 w-44 bg-white rounded-md shadow-lg ring-1 ring-black/5 overflow-hidden text-left">
                          <button onClick={() => viewDetails(visit)} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-800 hover:bg-gray-100">
                            <View className="w-4 h-4" /> View Details
                          </button>
                          <button onClick={() => {editVisit(visit); setSelectedVisit(visit);}} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-800 hover:bg-gray-100">
                            <Edit className="w-4 h-4" /> Edit
                          </button>
                          <button onClick={() => openGallery(visit)} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-800 hover:bg-gray-100">
                            <ImageIcon className="w-4 h-4" /> Gallery ({visit.gallery ? visit.gallery.length : 0})
                          </button>
                          <button onClick={() => openParticipants(visit)} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-800 hover:bg-gray-100">
                            <Users className="w-4 h-4" /> Participants ({visit.participants ? visit.participants.length : 0})
                          </button>
                          <button onClick={async () => { await toggleFeatured(visit) }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-800 hover:bg-gray-100">
                            {processing ? <><span className="flex items-center justify-center gap-2 text-primary"> Processing...<Loader className="w-4 h-4 animate-spin text-primary " /></span></>:visit.isFeatured?.includes(visit._id) ? (
                              <>
                               <><Star className="w-4 h-4 text-primary fill-primary" /> Unset Featured</>  
                              </>
                            ) : (
                               <><Star className="w-4 h-4   " /> Set Featured</>
                            )}
                          </button>
                          <button onClick={() => {deleteVisit(visit); setSelectedVisit(visit)}} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100">
                            {deleting === visit._id ? (
                              <span className="flex items-center justify-center gap-2">
                                <Loader className="w-4 h-4 animate-spin" /> Deleting...
                              </span>
                            ) : (
                              <>
                                <Trash2 className="w-4 h-4" /> Delete
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Visit Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) setSelectedVisit(null); setDialogOpen(open); }}>
        {selectedVisit && (
          <DialogContent className="max-h-[700px] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedVisit.community}</DialogTitle>
              <DialogDescription>{selectedVisit.country} • {new Date(selectedVisit.date).toLocaleDateString('en-US')}</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <img src={typeof selectedVisit.thumbnail === 'string' ? selectedVisit.thumbnail : selectedVisit.thumbnail?.url} alt={selectedVisit.community} className="w-full h-56 object-cover rounded-md" />

              <div>
                <h4 className="font-semibold mb-1">Title</h4>
                <p className="text-sm text-muted-foreground">{selectedVisit.title}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-1">Summary</h4>
                <p className="text-sm text-muted-foreground">{selectedVisit.excerpt}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Description</h4>
                <p className="text-sm text-justify text-muted-foreground">{selectedVisit.content}</p>
              </div>

              <div className="grid grid-cols-2   gap-4">
                <div className="">
                  <h5 className="text-xs font-medium text-muted-foreground">Participants</h5>
                  <ul className="mt-2 text-sm  h-40 overflow-y-auto  space-y-1">
                    {selectedVisit.participants && selectedVisit.participants.length > 0 ? (
                      selectedVisit.participants.map((p: any, idx: number) => (
                        <li className="flex bg-white relative rounded-md p-2 shadow-md gap-2 items-center  " key={idx}><img src={p.photo?.url || "/user.avif"} alt={p.name} className="w-12 h-12 rounded-full object-cover" />{p.name} — {p.role} {patId===p._id ? <Loader   className="w-4 h-4 font-bold animate-spin   absolute top-2 right-2 text-red-500"/>:<X onClick={()=>{removeParticipant(selectedVisit._id,p._id)}} className="w-4 h-4 font-bold  cursor-pointer absolute top-2 right-2 text-red-500"/>}</li>
                      ))
                    ) : (
                      <li className="text-muted-foreground">No participants yet</li>
                    )}
                    
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Stats</p>
                  <div className="mt-2 text-sm space-y-1">
                    <div>Likes: {selectedVisit.likes.length || 0}</div>
                    <div>Views: {selectedVisit.views.length || 0}</div>
                    <div>Video ID: {selectedVisit.videoId || '—'}</div>
                    <div>Location: {selectedVisit.location ? `${selectedVisit.location.lat}, ${selectedVisit.location.long}` : '—'}</div>
                  </div>
                </div>
              </div>

              {selectedVisit.gallery && selectedVisit.gallery.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Gallery</p>
                  <div className="flex gap-2 overflow-x-auto">
                    {selectedVisit.gallery.map((g: any, i: number) => {
                      const src = typeof g === 'string' ? g : (g.image || g.url || '');
                      const title = typeof g === 'string' ? '' : g.title || '';
                      return (
                        <div key={i} className="flex-shrink-0 relative">
                          <img src={src} alt={`gallery-${i}`} className="w-32 h-20 object-cover rounded-md" />
                           {galId===g._id ? <Loader   className="w-4 h-4 font-bold animate-spin   absolute top-1 right-1 text-red-500"/>:<X onClick={()=>{removeGalleryImage(selectedVisit._id,g._id)}} className="w-4 h-4 font-bold  cursor-pointer absolute top-1 right-1 text-red-500"/>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <div className="flex gap-2">
                <Button onClick={() => { editVisit(selectedVisit); setDialogOpen(false); }}>Edit</Button>
                <Button variant="outline" onClick={() => { toggleFeatured(selectedVisit); setDialogOpen(false); }}>Set Featured</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Gallery Dialog */}
      <Dialog open={galleryOpen} onOpenChange={(open) => setGalleryOpen(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Gallery Item</DialogTitle>
            <DialogDescription>{selectedVisit ? selectedVisit.community : ""}</DialogDescription>
          </DialogHeader>

          <form   className="grid gap-4">
            {/* Dropzone */}
            <div
              onDragEnter={handleGalleryDrag}
              onDragLeave={handleGalleryDrag}
              onDragOver={handleGalleryDrag}
              onDrop={handleGalleryDrop}
              onClick={() => galleryFileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                galleryDragActive
                  ? "border-primary bg-primary/10"
                  : "border-muted-foreground/30 hover:border-primary hover:bg-primary/5"
              }`}
            >
              <input
                ref={galleryFileInputRef}
                type="file"
                accept="image/*"
                onChange={onGalleryFileInputChange}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-2">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">
                    {galleryDragActive ? "Drop image here" : "Drag image or click to upload"}
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            {/* Preview */}
            {selectedGalleryImage && (
              <div className="rounded-lg overflow-hidden">
                <p className="text-sm font-medium text-muted-foreground mb-2">Preview</p>
                <img
                  src={selectedGalleryImage}
                  alt="gallery-preview"
                  className="w-full h-48 object-contain rounded-md"
                />
              </div>
            )}

            <DialogFooter>
              <div className="flex gap-2">
                <Button onClick={()=>{handleGallerySubmit(selectedVisit._id)}} type="submit" disabled={!selectedGalleryImage || saving  }>
                  {saving ? <span className="flex items-center justify-center gap-2">Saving... <Loader className="w-4 h-4 animate-spin"/></span> : "Save"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setGalleryOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add / Edit Visit Form Dialog */}
      <Dialog open={formOpen} onOpenChange={(open) => setFormOpen(open)}>
        <DialogContent className="max-h-[800px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{formData.id ? "Edit Visit" : "Add Visit"}</DialogTitle>
            <DialogDescription>{formData.community || "Create a new community visit"}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="grid gap-4">
            <Input placeholder="Community" value={formData.community} onChange={(e) => handleFormChange('community', e.target.value)} />
            <Input placeholder="Title" value={formData.title} onChange={(e) => handleFormChange('title', e.target.value)} />
            <Input placeholder="Country" value={formData.country} onChange={(e) => handleFormChange('country', e.target.value)} />
            <Input type="date" value={formData.date} onChange={(e) => handleFormChange('date', e.target.value)} />
            <div className="flex items-center gap-2">
              <Input placeholder="Thumbnail URL or upload" value={formData.thumbnail.url} onChange={(e) => handleFormChange('thumbnail', e.target.value)} />
              <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileInputChange} className="hidden" />
              <Button type="button" onClick={() => fileInputRef.current?.click()}>Upload</Button>
            </div>
            

            {/* Preview for uploaded image */}
            {(selectedImagePreview || formData.thumbnail?.url) && (
              <div className="pt-2">
                <p className="text-sm font-medium text-muted-foreground mb-2">Thumbnail Preview</p>
                <img src={selectedImagePreview || formData.thumbnail?.url} alt="thumbnail-preview" className="w-48 h-32 object-cover rounded-md" />
              </div>
            )}
            <Input placeholder="Video ID" value={formData.videoId} onChange={(e) => handleFormChange('videoId', e.target.value)} />
            <Textarea placeholder="Excerpt / Summary" value={formData.excerpt} onChange={(e) => handleFormChange('excerpt', e.target.value)} />

            <Textarea className="min-h-[300px] max-h-[300px]" placeholder="Full content / Description" value={formData.content} onChange={(e) => handleFormChange('content', e.target.value)} />
            <div className="flex items-center gap-3">
              <div className="flex-1 grid grid-cols-2 gap-2">
                <Input placeholder="Location Lat" value={formData.location?.lat} onChange={(e) => handleFormChange('locationLat', e.target.value)} />
                <Input placeholder="Location Long" value={formData.location?.long} onChange={(e) => handleFormChange('locationLong', e.target.value)} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={useCurrentLocation} onCheckedChange={(v: any) => handleUseCurrentLocationChange(!!v)} />
                <span className="text-sm">Use current location</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm mb-1">Status</label>
              <select value={formData.status} onChange={(e) => handleFormChange('status', e.target.value)} className="w-full rounded-md border p-2">
                <option value="upcoming">Upcoming</option>
                <option value="visited">Visited</option>
              </select>
            </div>

            <DialogFooter>
              <div className="flex gap-2">
                <Button type="submit">{saving ? <span className="flex items-center justify-center gap-2">Saving... <Loader className="w-4 h-4 animate-spin"/></span> : "Save"}</Button>
                <Button variant="outline" onClick={() => setFormOpen(false)}>Cancel</Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Participants Dialog */}
      <Dialog open={participantsOpen} onOpenChange={(open) => setParticipantsOpen(open)}>
        <DialogContent className="max-h-[600px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Participant</DialogTitle>
            <DialogDescription>{selectedVisit ? selectedVisit.community : ""}</DialogDescription>
          </DialogHeader>

          <form  className="grid gap-4">
            <Input placeholder="Name" value={participantForm.name} onChange={(e) => setParticipantForm((p) => ({ ...p, name: e.target.value }))} />
            <Input placeholder="Email" type="email" value={participantForm.email} onChange={(e) => setParticipantForm((p) => ({ ...p, email: e.target.value }))} />
            <Input placeholder="Phone" value={participantForm.phone} onChange={(e) => setParticipantForm((p) => ({ ...p, phone: e.target.value }))} />
            <Input placeholder="Role" value={participantForm.role} onChange={(e) => setParticipantForm((p) => ({ ...p, role: e.target.value }))} />
             

            <div className="flex items-center gap-2">
              <input ref={participantImageInputRef} type="file" accept="image/*" onChange={onParticipantImageInputChange} className="hidden" />
              <Button type="button" onClick={() => participantImageInputRef.current?.click()}>Upload Image</Button>
              <p className="text-sm text-muted-foreground">Profile photo</p>
            </div>

            {(selectedParticipantImage ) && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Image Preview</p>
                <img src={selectedParticipantImage}   className="w-40 h-40 object-cover rounded-md" />
              </div>
            )}

            <DialogFooter>
              <div className="flex gap-2">
                <Button onClick={() => handleParticipantSubmit(selectedVisit?._id)} type="submit">{saving ? <span className="flex items-center justify-center gap-2">Adding... <Loader className="w-4 h-4 animate-spin"/></span> : "Save"}</Button>
                <Button variant="outline" onClick={() => setParticipantsOpen(false)}>Cancel</Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
