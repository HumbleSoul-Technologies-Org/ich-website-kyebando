import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { mockCommunities } from "@/lib/mockData";
import { Plus, Search, MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use mock communities as programs
    setPrograms([]);
    setIsLoading(false);
  }, []);

  const viewProgram = (program: any) => {
    setSelectedProgram(program);
    setDialogOpen(true);
    setOpenMenu(null);
  };

  const editProgram = (program: any) => {
    alert(`Edit: ${program.title}`);
    setOpenMenu(null);
  };

  const deleteProgram = (program: any) => {
    if (confirm(`Delete ${program.title}? This cannot be undone.`)) {
      setPrograms((prev) => prev.filter((p) => p.id !== program.id));
    }
    setOpenMenu(null);
  };

  const filteredPrograms = programs.filter((program) => {
    const search = searchTerm.toLowerCase();
    return (
      program.title.toLowerCase().includes(search) ||
      program.community.toLowerCase().includes(search) ||
      program.country.toLowerCase().includes(search)
    );
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading programs...</p>
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
            <h1 className="text-3xl font-bold">Programs</h1>
            <p className="text-muted-foreground mt-1">
              Manage all innovation programs
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Program
          </Button>
        </div>

        {/* Search */}
        <Card className="border-0">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search programs by title, community, or country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Programs Grid */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              {filteredPrograms.length} Program{filteredPrograms.length !== 1 ? "s" : ""}
            </h2>
          </div>

          {filteredPrograms.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground py-8">
                  No programs found matching your search
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program) => (
                <div
                  key={program.id}
                  className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-96 group"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={program.thumbnail}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
                    {/* Top Section */}
                    <div>
                      <h3 className="text-xl text-primary font-bold mb-1">{program.title}</h3>
                      <p className="text-sm text-white/80">{program.community}</p>
                    </div>

                    {/* Bottom Section */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-white/70 uppercase">Program Details</p>
                        <p className="text-sm text-white/90">{program.country}</p>
                        <p className="text-xs text-white/70 mt-1">
                          {new Date(program.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>

                      <p className="text-sm text-white/90 line-clamp-2">{program.excerpt}</p>

                      <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/20">
                        <div>
                          <p className="text-xs font-medium text-white/70">Participants</p>
                          <p className="text-lg font-semibold">{program.participants?.length || 0}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-white/70">Likes</p>
                          <p className="text-lg font-semibold">{program.likes || 0}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-white/70">Views</p>
                          <p className="text-lg font-semibold">{program.views || 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Three-dot menu */}
                  <div className="absolute top-4 right-4 z-20 text-sm">
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === program.id ? null : program.id)}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-full"
                        aria-label="Actions"
                      >
                        <MoreVertical className="w-5 h-5 text-white" />
                      </button>

                      {openMenu === program.id && (
                        <div className="absolute top-10 right-0 mt-2 w-44 bg-white rounded-md shadow-lg ring-1 ring-black/5 overflow-hidden text-left">
                          <button onClick={() => viewProgram(program)} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-800 hover:bg-gray-100">
                            <Eye className="w-4 h-4" /> View
                          </button>
                          <button onClick={() => editProgram(program)} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-800 hover:bg-gray-100">
                            <Edit className="w-4 h-4" /> Edit
                          </button>
                          <button onClick={() => deleteProgram(program)} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100">
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

      {/* Program Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) setSelectedProgram(null); setDialogOpen(open); }}>
        {selectedProgram && (
          <DialogContent className="max-h-[700px] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedProgram.title}</DialogTitle>
              <DialogDescription>{selectedProgram.community} • {selectedProgram.country}</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <img src={selectedProgram.thumbnail} alt={selectedProgram.title} className="w-full h-56 object-cover rounded-md" />

              <div>
                <h4 className="font-semibold mb-1">Title</h4>
                <p className="text-sm text-muted-foreground">{selectedProgram.title}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-1">Summary</h4>
                <p className="text-sm text-muted-foreground">{selectedProgram.excerpt}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Description</h4>
                <p className="text-sm text-justify text-muted-foreground">{selectedProgram.content}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="text-xs font-medium text-muted-foreground">Participants</h5>
                  <ul className="mt-2 text-sm">
                    {selectedProgram.participants?.map((p: any, idx: number) => (
                      <li key={idx}>{p.name} — {p.role}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Stats</p>
                  <div className="mt-2 text-sm space-y-1">
                    <div>Likes: {selectedProgram.likes || 0}</div>
                    <div>Views: {selectedProgram.views || 0}</div>
                    <div>Date: {new Date(selectedProgram.date).toLocaleDateString()}</div>
                    <div>Location: {selectedProgram.location ? `${selectedProgram.location.lat}, ${selectedProgram.location.long}` : '—'}</div>
                  </div>
                </div>
              </div>

              {selectedProgram.gallery && selectedProgram.gallery.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Gallery</p>
                  <div className="flex gap-2 overflow-x-auto">
                    {selectedProgram.gallery.map((g: any, i: number) => {
                      const src = typeof g === 'string' ? g : (g.image || g.url || '');
                      const title = typeof g === 'string' ? '' : g.title || '';
                      return (
                        <div key={i} className="flex-shrink-0">
                          <img src={src} alt={`gallery-${i}`} className="w-32 h-20 object-cover rounded-md" />
                          {title && <p className="text-xs mt-1 text-muted-foreground">{title}</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <div className="flex gap-2">
                <Button onClick={() => { editProgram(selectedProgram); setDialogOpen(false); }}>Edit</Button>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Close</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </AdminLayout>
  );
}
