import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { mockCommunities } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, CheckCircle2, Clock, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { isFuture } from "date-fns";
import { Link } from "wouter";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon URLs for production (avoids missing marker icons)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

export default function Communities() {
  const [communities, setCommunities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);

  useEffect(() => {

    window.scrollTo({ top: 0, behavior: "smooth" });
    const mapped = mockCommunities.map((v: any) => ({
      id: v.id,
      name: v.title || v.name,
      community: v.community,
      district: v.community,
      country: v.country,
      visitDate: v.date || v.visitDate,
      imageUrl: v.thumbnail || v.image || v.imageUrl,
      description: v.excerpt || v.description || v.content,
      location: v.location,
      status: v.status,
    }));
    setCommunities(mapped);
    setIsLoading(false);
  }, []);

  const upcomingVisits = useMemo(() => {
    return (
      communities?.filter(
        (community) =>
          community.status === "upcoming"
      ) || []
    );
  }, [communities]);

  const pastVisits = useMemo(() => {
    return (
      communities?.filter(
        (community) =>
          community.status === "visited" ||
          (community.visitDate && !isFuture(new Date(community.visitDate))),
      ) || []
    );
  }, [communities]);

  const filteredPastVisits = useMemo(() => {
    return pastVisits.filter(
      (community) => {
        const matchesSearch =
          community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          community.community
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          community.district.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCommunity =
          !selectedCommunity || community.community === selectedCommunity;
        
        return matchesSearch && matchesCommunity;
      }
    );
  }, [pastVisits, searchQuery, selectedCommunity]);

  const uniqueCommunities = useMemo(() => {
    const communities = pastVisits.map((v) => v.community);
    return Array.from(new Set(communities)).sort();
  }, [pastVisits]);


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Community Impact
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore the districts we've visited and see where we're headed
              next.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <span>
                <h4 className="mb-5 text-center">Places we've visited and impacted communities</h4>

            <div className="bg-muted rounded-3xl min-h-[400px] w-full relative overflow-hidden shadow-inner">
              {/* Show all visited communities as markers */}
              {(() => {
                const visitedWithLocation =
                  communities?.filter(
                    (c) =>
                      c.status === "visited" &&
                      c.location &&
                      typeof c.location.lat === "number" &&
                      typeof c.location.long === "number"
                  ) || [];
                return (
                  <div>
                    
                     <MapContainer
                    bounds={
                      visitedWithLocation.length > 0
                        ? visitedWithLocation.map((c:any) => [c.location.lat, c.location.long] as [number, number])
                        : undefined
                    }
                    center={[0.3476, 32.5825]} // Central Uganda (Kampala)
                    zoom={6}
                    scrollWheelZoom={true}
                    style={{ height: "400px", width: "100%" }}
                    className="rounded-3xl"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {visitedWithLocation.length > 0 ? (
                      visitedWithLocation.map((c:any) => (
                        <Marker key={c.id} position={[c.location.lat, c.location.long]}>
                          <Popup>
                            <strong>{c.name || c.community}</strong>
                            <br />
                            {c.district || c.country}
                          </Popup>
                        </Marker>
                      ))
                    ) : (
                      <></>
                    )}
                  </MapContainer>
                 </div>
                );
              })()}
            </div>
            </span>

            {/* Upcoming Visits */}
            <div className="space-y-6 max-h-[400px] overflow-y-auto">
              <h2 className="font-display text-2xl font-bold mb-6">
                Upcoming Visits
              </h2>

              {isLoading ? (
                [1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-2xl" />
                ))
              ) : upcomingVisits.length > 0 ? (
                upcomingVisits.filter(v => v.status === "upcoming").map((community, i) => (
                  <motion.div
                    key={community.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="hover:shadow-lg border-t-0  relative border-r-0 border-b-0 transition-all border-l-4 border-l-primary overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-32 h-32 md:h-auto bg-muted shrink-0">
                          <img
                            src={
                              community.imageUrl ||
                              "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=400&fit=crop"
                            }
                            alt={community.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6 flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-bold text-xl">
                                {community.name}
                              </h3>
                              <div className="flex items-center text-muted-foreground text-sm gap-1">
                                <MapPin className="w-3 h-3" />{" "}
                                {community.district}
                              </div>
                            </div>
                            <Badge variant="secondary" className="capitalize">
                              <Clock className="w-3 h-3 mr-1" /> Upcoming
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {community.description}
                          </p>
                          {community.visitDate && (
                            <div>
                              <div className="text-sm font-medium flex items-center gap-2 text-primary">
                                <Calendar className="w-4 h-4" />
                                {format(new Date(community.visitDate), "MMMM d, yyyy")}
                              </div>
                              <Link className="inline-block mt-3 text-sm text-primary absolute right-2 bottom-2 font-medium" href={`/visits/${community.id}`}>
                                See details →
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">
                    No upcoming visits scheduled
                  </p>
                </Card>
              )}
            </div>
          </div>

          {/* Past Visits Section */}
          <div className="mt-16">
            <h2 className="font-display text-3xl font-bold mb-6">
              Past Visits
            </h2>

            {/* Search Bar and Filters */}
            <div className="mb-8 space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by title or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 text-base rounded-2xl"
                />
              </div>

              {/* Community Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCommunity(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCommunity === null
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  All Communities
                </button>
                {uniqueCommunities.map((community) => (
                  <button
                    key={community}
                    onClick={() => setSelectedCommunity(community)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCommunity === community
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {community}
                  </button>
                ))}
              </div>
            </div>

            {/* Past Visits List */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-64 w-full rounded-2xl" />
                ))}
              </div>
            ) : filteredPastVisits.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPastVisits.map((community, i) => (
                  <motion.div
                    key={community.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="hover:shadow-lg border-0 relative transition-all overflow-hidden h-[500px] flex flex-col">
                      <div className="h-full bg-muted shrink-0">
                        <img
                          src={
                            community.imageUrl ||
                            "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=400&fit=crop"
                          }
                          alt={community.name}
                          className="w-full h-full object-fill"
                        />
                      </div>
                      {/* Gradient Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      <div className="p-6 flex-grow absolute bottom-1 left-1 right-1 flex flex-col  z-10">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-grow">
                            <h3 className="font-bold text-lg mb-1 text-white">
                              {community.name}
                            </h3>
                            <div className="flex items-center text-white/80 text-sm gap-1">
                              <MapPin className="w-3 h-3" />{" "}
                              {community.district}
                            </div>
                          </div>
                          <Badge
                            variant="default"
                            className="capitalize ml-2 shrink-0"
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Visited
                          </Badge>
                        </div>
                        <p className="text-sm text-white/70 mb-4 flex-grow line-clamp-2">
                          {community.description}
                        </p>
                        {community.visitDate && (
                          <div>
                            <div className="text-sm font-medium flex items-center gap-2 text-primary">
                              <Calendar className="w-4 h-4" />
                              {format(new Date(community.visitDate), "MMMM d, yyyy")}
                            </div>
                            <Link href={`/visits/${community.id}`} className="inline-block absolute right-3 bottom-6 mt-3 text-sm text-primary font-medium">
                              See details →
                            </Link>
                          </div>
                        )}


                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  {searchQuery
                    ? "No past visits match your search"
                    : "No past visits yet"}
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
