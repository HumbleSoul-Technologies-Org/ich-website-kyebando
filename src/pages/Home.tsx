import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  Users,
  Lightbulb,
  TrendingUp,
  HandHeart,
  ChevronLeft,
  ChevronRight,
  X,
  Cross,
  Church,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { testimonials, patners } from "@/lib/mockData";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  const { data: visitsData } = useQuery<any>({ queryKey: ["visits", "all"] });

  const [visits, setVisits] = useState<any[]>([]);
  const [UUID, setUUID] = useState<any | string>("");

  useEffect(() => {
    document.title = "Innovation Community Hub - Empowering Communities Through Innovation";
    if (visitsData && visitsData.length > 0) {
      const filteredVisits =
        visitsData.filter((visit: any) => visit.status === "upcoming") || [];
      setVisits(filteredVisits);
      create_UUID();
    }
  }, [visitsData]);

  // Gallery pagination state
  const [galleryPage, setGalleryPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const imagesPerPage = 6;

  // Extract all gallery images from communities
  const allGalleryImages =
    visitsData
      ?.filter((visit: any) => visit.status === "visited")
      .flatMap((community: any) =>
        (community.gallery || []).map((img: any) => ({
          img,
          community: community.title,
        })),
      ) || [];

  const totalPages = Math.ceil(allGalleryImages.length / imagesPerPage);
  const startIdx = galleryPage * imagesPerPage;
  const paginatedImages = allGalleryImages.slice(
    startIdx,
    startIdx + imagesPerPage,
  );

  const handleNextPage = () => {
    if (galleryPage < totalPages - 1) setGalleryPage(galleryPage + 1);
  };

  const handlePrevPage = () => {
    if (galleryPage > 0) setGalleryPage(galleryPage - 1);
  };

  const create_UUID = async () => {
    const savedUUID = localStorage.getItem("visitor_uuid");
    if (savedUUID) {
      setUUID(savedUUID);
    } else {
      const newUUID = uuidv4();
      localStorage.setItem("visitor_uuid", newUUID);
      setUUID(newUUID);
    }
  };

  const logViews = async (visitId: any) => {
    try {
      await apiRequest("POST", `/visits/${visitId}/log-view`, {
        uuid: UUID,
      });
    } catch (error) {}
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/10 to-background/20 z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover opacity-20"
          >
            <source src="/hero-background.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Empowering <br />
              <span className="text-gradient">Communities</span> <br />
              Through Innovation
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
            >
              We bridge the gap between skills and opportunity by bringing
              technical skills, entrepreneurship programs, and creative
              resources directly to local districts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/get-involved">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 rounded-xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1"
                >
                  Join the Movement <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/communities">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-secondary/5 transition-all"
                >
                  Explore Communities
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border/50 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10+", label: "Communities Visited", icon: MapPin },
              { number: "150+", label: "Lives Impacted", icon: Users },
              { number: "10+", label: "Programs Launched", icon: Lightbulb },
              { number: "5+", label: "Corporate Partners", icon: HandHeart },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                  <CountUp value={stat.number} />
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Our Core Pillars
            </h2>
            <p className="text-muted-foreground text-lg">
              We focus on holistic development to create sustainable change in
              every community we serve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Exploring Technical Skills ",
                description:
                  "Exploring various technical skills in various communities that earn people a living.",
                icon: <Lightbulb className="w-10 h-10 text-primary" />,
                image: "https://i.ytimg.com/vi/6cxFII9z5Vg/hqdefault.jpg",
              },
              {
                title: "Talent Discovery",
                description:
                  "Identifying and nurturing hidden talents in underserved areas.",
                icon: <TrendingUp className="w-10 h-10 text-primary" />,
                image:
                  "https://s.rfi.fr/media/display/2da667f0-02c3-11ee-8c4a-005056bf30b7/w:1024/p:16x9/000_33DM63T.jpg",
              },
              {
                title: "Gospel Preaching & Mentorship",
                description:
                  "Providing spiritual guidance and mentorship to foster holistic growth and resilience in communities.",
                icon: <Church className="w-10 h-10 text-primary" />,
                image:
                  "https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/74151_49446/editor_images/ZambiaDecaplois_Kasama_Taylor-03756%20%282%29.jpg",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                  <div className="bg-primary/20 backdrop-blur-md p-3 rounded-xl w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-2xl text-primary font-bold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/80">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Visits Section */}
      {visits && visits.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Upcoming Visits
              </h2>
              <p className="text-muted-foreground text-lg">
                Join us as we bring opportunities to communities near you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {visits
                .filter((community) => community.status === "upcoming")
                .slice(0, 4)
                .map((visit, i) => (
                  <Link
                    key={visit._id}
                    onClick={() => logViews(visit._id)}
                    href={`/visits/${visit._id}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 h-80 cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                      <img
                        src={visit?.thumbnail?.url}
                        alt={visit?.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                        <p className="text-xs text-primary line-clamp-2 mb-4">
                          {visit?.community}
                        </p>

                        <p className="text-sm text-white/80 mb-3">
                          {visit?.country}
                        </p>
                        <p className="text-sm font-semibold text-primary mb-4">
                          {new Date(visit?.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <h3 className="font-display line-clamp-1 text-xl font-bold text-white mb-1">
                          {visit?.title}
                        </h3>

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full rounded-lg text-xs"
                        >
                          Learn More
                        </Button>
                      </div>
                    </motion.div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {allGalleryImages && allGalleryImages.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Gallery Showcasing Our Journey
              </h2>
              <p className="text-muted-foreground text-lg">
                Explore moments from our visits and community engagement
                activities.
              </p>
            </div>

            {allGalleryImages.length > 0 ? (
              <>
                {/* Mobile/Tablet Carousel View */}
                <div className="lg:hidden mb-8">
                  <Splide
                    options={{
                      type: "carousel",
                      perPage: 4,
                      perMove: 1,
                      gap: "1rem",
                      pagination: true,
                      arrows: true,
                      breakpoints: {
                        640: { perPage: 1 },
                        1024: { perPage: 2 },
                      },
                    }}
                    className="splide-container"
                  >
                    {allGalleryImages.map(
                      (item: { img: any; community: string }, i: number) => (
                        <SplideSlide key={i}>
                          <button
                            onClick={() => {
                              setSelectedImage(item.img.url as string);
                              setIsImageModalOpen(true);
                            }}
                            className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 w-full text-left"
                          >
                            <div className="relative h-64 bg-muted">
                              <img
                                src={item.img.url}
                                alt="Gallery"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
                              />
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-4">
                              <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {item.community}
                              </p>
                            </div>
                          </button>
                        </SplideSlide>
                      ),
                    )}
                  </Splide>
                </div>

                {/* Desktop Grid View */}
                <div className="hidden lg:block">
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    {paginatedImages.map((item: any, i: number) => (
                      <motion.div
                        key={`${galleryPage}-${i}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <button
                          onClick={() => {
                            setSelectedImage(item.img);
                            setIsImageModalOpen(true);
                          }}
                          className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 w-full text-left"
                        >
                          <div className="relative h-64 bg-muted">
                            <img
                              src={item.img?.url}
                              alt="Gallery"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-4">
                            <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {item.community}
                            </p>
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePrevPage}
                      disabled={galleryPage === 0}
                      className="rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>

                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setGalleryPage(idx)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                            galleryPage === idx
                              ? "bg-primary text-white"
                              : "bg-muted text-foreground hover:bg-muted/80"
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNextPage}
                      disabled={galleryPage === totalPages - 1}
                      className="rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No images available yet.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
      {/* Image Modal */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="w-full max-w-2xl sm:max-w-4xl p-0 border-0 rounded-lg overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          <div className="relative w-full bg-black">
            {selectedImage && (
              <img
                src={selectedImage?.url}
                alt="Gallery Preview"
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Testimonials Section */}
      <section className="py-24 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Stories from Our Community
            </h2>
            <p className="text-muted-foreground text-lg">
              Hear how our programs have transformed lives and created
              opportunities.
            </p>
          </div>

          <Splide
            options={{
              type: "carousel",
              perPage: 3,
              perMove: 1,
              gap: "2rem",
              pagination: true,
              arrows: true,
              breakpoints: {
                640: { perPage: 1 },
                1024: { perPage: 2 },
              },
            }}
            className="splide-container"
          >
            {testimonials.map((testimonial, i) => (
              <SplideSlide key={i}>
                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-border/50">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-foreground/90 leading-relaxed mb-4 italic">
                    "{testimonial.testimonial}"
                  </p>

                  <div className="pt-4 border-t border-border/30">
                    <p className="text-xs font-semibold text-primary uppercase">
                      Community
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {testimonial.community}
                    </p>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Our Partners
            </h2>
            <p className="text-muted-foreground text-lg">
              We're proud to collaborate with leading organizations and brands
              committed to community empowerment.
            </p>
          </div>

          <Splide
            options={{
              type: "carousel",
              perPage: 3,
              perMove: 1,
              gap: "2rem",
              pagination: false,
              arrows: true,
              autoScroll: {
                pauseOnHover: true,
                pauseOnFocus: true,
                rewind: false,
                speed: 1,
              },
              breakpoints: {
                640: { perPage: 2 },
                1024: { perPage: 3 },
              },
            }}
            className="splide-container"
          >
            {patners.map((partner, i) => (
              <SplideSlide key={i}>
                <div className="flex items-center justify-center h-32 bg-white/50 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 p-6">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain filter hover:drop-shadow-lg transition-all duration-300"
                  />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 skew-x-12 transform origin-top-right" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Whether you want to volunteer your time, partner with us, or
              support our cause, your contribution changes lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-involved">
                <Button
                  size="lg"
                  variant="default"
                  className="text-lg px-8 py-6 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-black/20"
                >
                  Become a Volunteer
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-xl border-white/20 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm bg-white/5"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Helper component for Icon (since lucide-react exports components)
function MapPin({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// CountUp: simple number animator that supports comma formatting and suffixes like '+'
function CountUp({
  value,
  duration = 1500,
}: {
  value: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState<string>(value);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // parse value string like "2,000+" or "50+"
    const match = /([\d,]+)\s*(\+)?/.exec(value.trim());
    if (!match) return setDisplay(value);

    const raw = match[1].replace(/,/g, "");
    const end = parseInt(raw, 10);
    const suffix = match[2] ? "+" : "";
    if (isNaN(end)) return setDisplay(value);

    const node = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const step = (now: number) => {
              const elapsed = now - start;
              const t = Math.min(1, elapsed / duration);
              // easeOutCubic
              const eased = 1 - Math.pow(1 - t, 3);
              const current = Math.round(eased * end);
              setDisplay(numberWithCommas(current) + suffix);
              if (t < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );

    if (node) observer.observe(node);

    return () => observer.disconnect();
  }, [value, duration]);

  return <div ref={ref}>{display}</div>;
}

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
