import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCommunities } from "@/hooks/use-communities";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function Communities() {
  const { data: communities, isLoading } = useCommunities();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Community Impact</h1>
            <p className="text-xl text-muted-foreground">
              Explore the districts we've visited and see where we're headed next.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map Placeholder */}
            <div className="bg-muted rounded-3xl min-h-[400px] flex items-center justify-center relative overflow-hidden shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=800&fit=crop" 
                alt="Map background" 
                className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
              />
              <div className="relative z-10 bg-background/90 backdrop-blur p-8 rounded-2xl shadow-lg max-w-sm text-center">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">Interactive Map</h3>
                <p className="text-muted-foreground">Coming soon! Visualize our journey across the region.</p>
              </div>
            </div>

            {/* List */}
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold mb-6">Recent & Upcoming Visits</h2>
              
              {isLoading ? (
                [1, 2, 3].map((i) => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)
              ) : (
                communities?.map((community, i) => (
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
                            src={community.imageUrl || "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=400&fit=crop"} 
                            alt={community.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6 flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-bold text-xl">{community.name}</h3>
                              <div className="flex items-center text-muted-foreground text-sm gap-1">
                                <MapPin className="w-3 h-3" /> {community.district}
                              </div>
                            </div>
                            <Badge variant={community.status === 'visited' ? 'default' : 'secondary'} className="capitalize">
                              {community.status === 'visited' ? (
                                <><CheckCircle2 className="w-3 h-3 mr-1" /> Visited</>
                              ) : (
                                <><Clock className="w-3 h-3 mr-1" /> Upcoming</>
                              )}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{community.description}</p>
                          {community.visitDate && (
                            <div className="text-sm font-medium flex items-center gap-2 text-primary">
                              <Calendar className="w-4 h-4" />
                              {format(new Date(community.visitDate), 'MMMM d, yyyy')}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
