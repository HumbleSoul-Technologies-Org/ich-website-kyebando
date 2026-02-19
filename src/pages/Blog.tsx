import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { blogsData, testimonials } from "@/lib/mockData";
import { impactStats } from "@/lib/aboutData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

function CountUp({ end, duration = 1200 }: { end: number; duration?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    let rafId = 0;
    let started = false;

    const start = () => {
      const from = 0;
      const to = Number(end);
      const startTime = performance.now();

      const step = (now: number) => {
        const t = Math.min(1, (now - startTime) / duration);
        const current = Math.round(from + (to - from) * t);
        setValue(current);
        if (t < 1) rafId = requestAnimationFrame(step);
      };

      rafId = requestAnimationFrame(step);
    };

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          start();
          obs.disconnect();
        }
      });
    });

    if (ref.current) obs.observe(ref.current);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [end, duration]);

  return (
    <div ref={ref} className="text-lg font-bold">
      {value}+
    </div>
  );
}

export default function Blog() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [])
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <header className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">News, Impact & Feedback</h1>
            <p className="text-lg text-muted-foreground">Latest updates from our outreach visits, program highlights and community feedback.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <section className="lg:col-span-8 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {blogsData.map((post) => (
                  <motion.article key={post.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-white/80 rounded-xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-44 h-40 md:h-auto overflow-hidden">
                        <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{post.excerpt}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-xs text-muted-foreground">{post.author}</div>
                          <div className="flex items-center gap-3">
                            <time className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</time>
                            <Link href={`/blog/${post.id}`}><a className="text-primary text-sm font-semibold">Read →</a></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              <div className="flex justify-center mt-4">
                <Button variant="ghost">Load more</Button>
              </div>
            </section>

            <aside className="lg:col-span-4 space-y-6">
              <div className="p-6 bg-white/80 rounded-xl border border-border/50 shadow-sm">
                <h4 className="text-lg font-semibold mb-4">Impact At A Glance</h4>
                <div className="grid grid-cols-2 gap-3">
                    {impactStats.slice(0,8).map((s, i) => (
                      <div key={i} className="bg-background/50 rounded-md p-3 text-primary text-center">
                        <CountUp end={Number(s.number)} duration={1400} />
                        <div className="text-xs text-muted-foreground">{s.label}</div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="p-6 bg-white/80 rounded-xl border border-border/50 shadow-sm">
                <h4 className="text-lg font-semibold mb-4">Community Feedback</h4>
                <div className="space-y-4">
                  {testimonials.slice(0,4).map((t, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="text-sm font-semibold">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.role}</div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{t.testimonial}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
