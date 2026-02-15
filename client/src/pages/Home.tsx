import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Users, Lightbulb, TrendingUp, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
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
            className="w-full h-full object-cover opacity-20"
          >
            <source src="/src/assets/videos/hero-background.mp4" type="video/mp4" />
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
              Empowering <br/>
              <span className="text-gradient">Communities</span> <br/>
              Through Innovation
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
            >
              We bridge the gap between talent and opportunity by bringing digital skills, entrepreneurship programs, and creative resources directly to local districts.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/get-involved">
                <Button size="lg" className="text-lg px-8 py-6 rounded-xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                  Join the Movement <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/programs">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-secondary/5 transition-all">
                  Explore Programs
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
              { number: "50+", label: "Communities Visited", icon: MapPin },
              { number: "2,000+", label: "Lives Impacted", icon: Users },
              { number: "150+", label: "Programs Launched", icon: Lightbulb },
              { number: "30+", label: "Corporate Partners", icon: HandHeart },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Our Core Pillars</h2>
            <p className="text-muted-foreground text-lg">We focus on holistic development to create sustainable change in every community we serve.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Digital Literacy",
                description: "Equipping youth with essential tech skills for the modern workforce.",
                icon: <Lightbulb className="w-10 h-10 text-primary" />,
                image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop"
              },
              {
                title: "Talent Discovery",
                description: "Identifying and nurturing hidden talents in underserved areas.",
                icon: <TrendingUp className="w-10 h-10 text-primary" />,
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
              },
              {
                title: "Community Growth",
                description: "Building resilient networks of support and mentorship.",
                icon: <Users className="w-10 h-10 text-primary" />,
                image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop"
              }
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
                  <h3 className="font-display text-2xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-white/80">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 skew-x-12 transform origin-top-right" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Make an Impact?</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Whether you want to volunteer your time, partner with us, or support our cause, your contribution changes lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-involved">
                <Button size="lg" variant="default" className="text-lg px-8 py-6 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-black/20">
                  Become a Volunteer
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl border-white/20 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm bg-white/5">
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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
