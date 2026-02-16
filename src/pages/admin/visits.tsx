import { useEffect, useState, useRef } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockCommunities } from "@/lib/mockData";
import { Search, MoreVertical, Edit, Star, View, Trash, Trash2, Image as ImageIcon, Users } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AdminVisitsPage() {
  const [visits, setVisits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
    thumbnail: "",
    videoId: "",
    status: "upcoming",
    participants: [],
    location: { lat: "", long: "" },
    likes: 0,
    views: 0,
  });
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryForm, setGalleryForm] = useState<{ title: string; url: string; image: string }>({ title: "", url: "", image: "" });
  const galleryFileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const [participantForm, setParticipantForm] = useState<{ name: string; email: string; phone: string; role: string; url: string; image: string }>({ name: "", email: "", phone: "", role: "", url: "", image: "" });
  const participantImageInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedParticipantImage, setSelectedParticipantImage] = useState<string | null>(null);

  const handleThumbnailUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      setSelectedImage(dataUrl);
      handleFormChange('thumbnail', dataUrl);
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
      setGalleryForm((prev) => ({ ...prev, image: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const onGalleryFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleGalleryUpload(f);
  };

  const handleGallerySubmit = (e: any) => {
    e.preventDefault();
    if (!selectedVisit) return;
    const newItem = {
      title: galleryForm.title || "",
      url: galleryForm.url || "",
      image: galleryForm.image || "",
    };

    setVisits((prev) => prev.map((v) => (v.id === selectedVisit.id ? { ...v, gallery: [...(v.gallery || []), newItem] } : v)));
    setSelectedVisit((prev: any) => (prev ? { ...prev, gallery: [...(prev.gallery || []), newItem] } : prev));
    setGalleryOpen(false);
    setOpenMenu(null);
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
    setFormOpen(true);
    setOpenMenu(null);
  };

  const openGallery = (visit: any) => {
    setSelectedVisit(visit);
    setGalleryForm({ title: "", url: "", image: "" });
    setSelectedGalleryImage(null);
    setGalleryOpen(true);
    setOpenMenu(null);
  };

  const handleParticipantImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      setSelectedParticipantImage(dataUrl);
      setParticipantForm((prev) => ({ ...prev, image: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const onParticipantImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleParticipantImageUpload(f);
  };

  const openParticipants = (visit: any) => {
    setSelectedVisit(visit);
    setParticipantForm({ name: "", email: "", phone: "", role: "", url: "", image: "" });
    setSelectedParticipantImage(null);
    setParticipantsOpen(true);
    setOpenMenu(null);
  };

  const handleParticipantSubmit = (e: any) => {
    e.preventDefault();
    if (!selectedVisit) return;
    const newParticipant = {
      name: participantForm.name || "",
      email: participantForm.email || "",
      phone: participantForm.phone || "",
      role: participantForm.role || "",
      url: participantForm.url || "",
      image: participantForm.image || "",
    };

    setVisits((prev) => prev.map((v) => (v.id === selectedVisit.id ? { ...v, participants: [...(v.participants || []), newParticipant] } : v)));
    setSelectedVisit((prev: any) => (prev ? { ...prev, participants: [...(prev.participants || []), newParticipant] } : prev));
    setParticipantsOpen(false);
    setOpenMenu(null);
  };

  const openCreateForm = () => {
    setFormData({
      community: "",
      title: "",
      country: "",
      date: "",
      content: "",
      excerpt: "",
      thumbnail: "",
      status: "upcoming",
      participants: [],
      likes: 0,
      views: 0,
    });
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
      return { ...prev, [key]: value };
    });
  };

  const addParticipant = () => {
    setFormData((prev: any) => ({ ...prev, participants: [...(prev.participants || []), { name: "", phone: "", role: "" }] }));
  };

  const updateParticipant = (index: number, key: string, value: string) => {
    setFormData((prev: any) => {
      const parts = [...(prev.participants || [])];
      parts[index] = { ...parts[index], [key]: value };
      return { ...prev, participants: parts };
    });
  };

  const removeParticipant = (index: number) => {
    setFormData((prev: any) => {
      const parts = [...(prev.participants || [])];
      parts.splice(index, 1);
      return { ...prev, participants: parts };
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

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const payload = {
      ...formData,
      participants: formData.participants ? formData.participants.map((p: any) => ({ name: p.name || "", phone: p.phone || "", role: p.role || "" })) : [],
      likes: Number(formData.likes) || 0,
      views: Number(formData.views) || 0,
      videoId: formData.videoId || "",
      location: {
        lat: formData.location && formData.location.lat ? Number(formData.location.lat) : 0,
        long: formData.location && formData.location.long ? Number(formData.location.long) : 0,
      },
    };

    if (formData.id) {
      // update
      setVisits((prev) => prev.map((v) => (v.id === formData.id ? { ...v, ...payload } : v)));
    } else {
      // create
      const nextId = Math.max(0, ...visits.map((v) => v.id || 0)) + 1;
      setVisits((prev) => [{ id: nextId, ...payload }, ...prev]);
    }

    setFormOpen(false);
    setOpenMenu(null);
  };

  const setFeatured = (visit: any) => {
    alert(`${visit.community} set as featured`);
    setOpenMenu(null);
  };

  const deleteVisit = (visit: any) => {
    if (confirm(`Delete ${visit.community}? This cannot be undone.`)) {
      setVisits((prev) => prev.filter((v) => v.id !== visit.id));
    }
    setOpenMenu(null);
  };

  useEffect(() => {
    // Use mockCommunities data
    setVisits(mockCommunities);
    setIsLoading(false);
  }, []);

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

  if (isLoading) {
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
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by community, country, or date..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
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
                      src={visit.thumbnail} 
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
                          <p className="text-lg font-semibold">{visit.likes}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-white/70">Views</p>
                          <p className="text-lg font-semibold">{visit.views}</p>
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
                          <button onClick={() => editVisit(visit)} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-800 hover:bg-gray-100">
                            <Edit className="w-4 h-4" /> Edit
                          </button>
                          <button onClick={() => openGallery(visit)} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-800 hover:bg-gray-100">
                            <ImageIcon className="w-4 h-4" /> Gallery
                          </button>
                          <button onClick={() => openParticipants(visit)} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-800 hover:bg-gray-100">
                            <Users className="w-4 h-4" /> Participants
                          </button>
                          <button onClick={() => setFeatured(visit)} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-800 hover:bg-gray-100">
                            <Star className="w-4 h-4" /> Set Featured
                          </button>
                          <button onClick={() => deleteVisit(visit)} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100">
                            <Trash2 className="w-4 h-4" /> Delete
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
              <img src={selectedVisit.thumbnail} alt={selectedVisit.community} className="w-full h-56 object-cover rounded-md" />

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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="text-xs font-medium text-muted-foreground">Participants</h5>
                  <ul className="mt-2 text-sm">
                    {selectedVisit.participants.map((p: any, idx: number) => (
                      <li key={idx}>{p.name} — {p.role}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Stats</p>
                  <div className="mt-2 text-sm space-y-1">
                    <div>Likes: {selectedVisit.likes}</div>
                    <div>Views: {selectedVisit.views}</div>
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
                        <div key={i} className="flex-shrink-0">
                          <img src={src} alt={`gallery-${i}`} className="w-32 h-20 object-cover rounded-md" />
                          {title && <p className="text-xs mt-1 text-white/80">{title}</p>}
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
                <Button variant="outline" onClick={() => { setFeatured(selectedVisit); setDialogOpen(false); }}>Set Featured</Button>
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

          <form onSubmit={handleGallerySubmit} className="grid gap-4">
            <Input placeholder="Title" value={galleryForm.title} onChange={(e) => setGalleryForm((p) => ({ ...p, title: e.target.value }))} />
            <Input placeholder="URL (optional)" value={galleryForm.url} onChange={(e) => setGalleryForm((p) => ({ ...p, url: e.target.value }))} />

            <div className="flex items-center gap-2">
              <input ref={galleryFileInputRef} type="file" accept="image/*" onChange={onGalleryFileInputChange} className="hidden" />
              <Button type="button" onClick={() => galleryFileInputRef.current?.click()}>Upload</Button>
              <p className="text-sm text-muted-foreground">or provide a URL above</p>
            </div>

            {(selectedGalleryImage || galleryForm.url) && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Preview</p>
                <img src={selectedGalleryImage || galleryForm.url} alt="gallery-preview" className="w-52 h-36 object-cover rounded-md" />
              </div>
            )}

            <DialogFooter>
              <div className="flex gap-2">
                <Button type="submit">Add to Gallery</Button>
                <Button variant="outline" onClick={() => setGalleryOpen(false)}>Cancel</Button>
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
              <Input placeholder="Thumbnail URL or upload" value={formData.thumbnail} onChange={(e) => handleFormChange('thumbnail', e.target.value)} />
              <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileInputChange} className="hidden" />
              <Button type="button" onClick={() => fileInputRef.current?.click()}>Upload</Button>
            </div>
            <Textarea placeholder="Full content / Description" value={formData.content} onChange={(e) => handleFormChange('content', e.target.value)} />

            {/* Preview for uploaded image */}
            {(selectedImage || formData.thumbnail) && (
              <div className="pt-2">
                <p className="text-sm font-medium text-muted-foreground mb-2">Thumbnail Preview</p>
                <img src={selectedImage || formData.thumbnail} alt="thumbnail-preview" className="w-48 h-32 object-cover rounded-md" />
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
                <Button type="submit">Save</Button>
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

          <form onSubmit={handleParticipantSubmit} className="grid gap-4">
            <Input placeholder="Name" value={participantForm.name} onChange={(e) => setParticipantForm((p) => ({ ...p, name: e.target.value }))} />
            <Input placeholder="Email" type="email" value={participantForm.email} onChange={(e) => setParticipantForm((p) => ({ ...p, email: e.target.value }))} />
            <Input placeholder="Phone" value={participantForm.phone} onChange={(e) => setParticipantForm((p) => ({ ...p, phone: e.target.value }))} />
            <Input placeholder="Role" value={participantForm.role} onChange={(e) => setParticipantForm((p) => ({ ...p, role: e.target.value }))} />
            <Input placeholder="URL" value={participantForm.url} onChange={(e) => setParticipantForm((p) => ({ ...p, url: e.target.value }))} />

            <div className="flex items-center gap-2">
              <input ref={participantImageInputRef} type="file" accept="image/*" onChange={onParticipantImageInputChange} className="hidden" />
              <Button type="button" onClick={() => participantImageInputRef.current?.click()}>Upload Image</Button>
              <p className="text-sm text-muted-foreground">Profile photo</p>
            </div>

            {(selectedParticipantImage || participantForm.image) && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Image Preview</p>
                <img src={selectedParticipantImage || participantForm.image} alt="participant-preview" className="w-40 h-40 object-cover rounded-md" />
              </div>
            )}

            <DialogFooter>
              <div className="flex gap-2">
                <Button type="submit">Add Participant</Button>
                <Button variant="outline" onClick={() => setParticipantsOpen(false)}>Cancel</Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
