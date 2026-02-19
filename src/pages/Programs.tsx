import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { programs as mockPrograms } from "@/lib/mockData";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Arrow } from "@radix-ui/react-tooltip";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function Programs() {
  const programs = mockPrograms;
  const isLoading = false;
  useEffect(() => { 
    window.scrollTo(0, 0);
  }, [])
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Programs</h1>
            <p className="text-xl text-muted-foreground">
              Designed to uplift, educate, and empower communities through targeted interventions.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-2xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
              {programs?.map((program, i) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full relative border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                    <div className="h-48 overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                      <img 
                        src={program.thumbnail || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"} 
                        alt={program.program}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      {/* <Badge className="absolute top-4 right-4 z-20 bg-white/90 text-primary font-bold backdrop-blur-sm hover:bg-white">
                        {program.status || program.community}
                      </Badge> */}
                    </div>
                    <CardHeader>
                      <CardTitle className="font-display text-2xl">{program.program}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {program.excerpt || program.description}
                      </p>
                    </CardContent>
                     {/* <Link className='text-right text-sm absolute right-1 bottom-1' href={`/programs/${program.id}`}>
                      <CardFooter className="pt-0">
                        <button className="text-sm font-medium text-primary hover:underline">
                          View Details <ArrowRight className="inline-block ml-1" />
                        </button>
                      </CardFooter>
                    </Link> */}
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <section className="bg-surface/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">How We Implement Our Programs</h2>
            <p className="text-muted-foreground">A concise overview of the procedures we follow when scouting, planning and delivering programs.</p>
          </div>

          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 mt-10">
            <div className="flex flex-col items-center text-center max-w-xs p-6 bg-white/60 rounded-2xl border border-border/50 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
                </svg>
              </div>
              <h4 className="font-semibold">Scouting</h4>
              <p className="text-sm text-muted-foreground mt-2">Engage leaders, conduct field visits and surveys to identify community needs and priorities.</p>
            </div>

            <div className="hidden md:flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="md:hidden w-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14M5 12h14" />
              </svg>
            </div>

            <div className="flex flex-col items-center text-center max-w-xs p-6 bg-white/60 rounded-2xl border border-border/50 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-semibold">Planning</h4>
              <p className="text-sm text-muted-foreground mt-2">Co-design objectives, timelines and resources with community representatives and partners.</p>
            </div>

            <div className="hidden md:flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="md:hidden w-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14M5 12h14" />
              </svg>
            </div>

            <div className="flex flex-col items-center text-center max-w-xs p-6 bg-white/60 rounded-2xl border border-border/50 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m2 0a2 2 0 002-2V7a2 2 0 00-2-2h-3.5l-1-2H10.5l-1 2H6a2 2 0 00-2 2v3a2 2 0 002 2h2" />
                </svg>
              </div>
              <h4 className="font-semibold">Implementation</h4>
              <p className="text-sm text-muted-foreground mt-2">Deliver training, mentorship and workshops while building local capacity and partnerships.</p>
            </div>

            <div className="hidden md:flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="md:hidden w-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14M5 12h14" />
              </svg>
            </div>

            <div className="flex flex-col items-center text-center max-w-xs p-6 bg-white/60 rounded-2xl border border-border/50 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
              </div>
              <h4 className="font-semibold">Monitoring & Evaluation</h4>
              <p className="text-sm text-muted-foreground mt-2">Track outcomes, collect feedback and provide follow-up support for sustained impact.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
