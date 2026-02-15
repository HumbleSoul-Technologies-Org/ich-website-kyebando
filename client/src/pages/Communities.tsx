import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCommunities } from "@/hooks/use-communities";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, CheckCircle2, Clock, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { isFuture } from "date-fns";

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
  const { data: communities, isLoading } = useCommunities();
  const [searchQuery, setSearchQuery] = useState("");

  const upcomingVisits = useMemo(() => {
    return (
      communities?.filter(
        (community) =>
          community.status === "upcoming" ||
          (community.visitDate && isFuture(new Date(community.visitDate))),
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
      (community) =>
        community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.community
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        community.district.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [pastVisits, searchQuery]);


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
            <div className="bg-muted rounded-3xl min-h-[400px] w-full relative overflow-hidden shadow-inner">
              <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "400px", width: "100%" }}
                className="rounded-3xl"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

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
                upcomingVisits.map((community, i) => (
                  <motion.div
                    key={community.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all border-l-4 border-l-primary overflow-hidden">
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
                            <div className="text-sm font-medium flex items-center gap-2 text-primary">
                              <Calendar className="w-4 h-4" />
                              {format(
                                new Date(community.visitDate),
                                "MMMM d, yyyy",
                              )}
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

            {/* Search Bar */}
            <div className="mb-8 relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by title or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 text-base rounded-2xl"
                />
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
                    <Card className="hover:shadow-lg transition-all overflow-hidden h-full flex flex-col">
                      <div className="h-40 bg-muted shrink-0">
                        <img
                          src={
                            community.imageUrl ||
                            "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=400&fit=crop"
                          }
                          alt={community.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-grow">
                            <h3 className="font-bold text-lg mb-1">
                              {community.name}
                            </h3>
                            <div className="flex items-center text-muted-foreground text-sm gap-1">
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
                        <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
                          {community.description}
                        </p>
                        {community.visitDate && (
                          <div className="text-sm font-medium flex items-center gap-2 text-primary">
                            <Calendar className="w-4 h-4" />
                            {format(
                              new Date(community.visitDate),
                              "MMMM d, yyyy",
                            )}
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
