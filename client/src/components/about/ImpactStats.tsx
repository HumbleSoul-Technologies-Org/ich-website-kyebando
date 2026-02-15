import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { impactStats } from "@/lib/aboutData";

function CountUpStat({ number, label, description }: any) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = number;
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 16); // 60fps

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isVisible, number]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl md:text-6xl font-bold text-primary mb-2">
        {count.toLocaleString()}
        {number >= 1000 ? "+" : "%"}
      </div>
      <h3 className="font-semibold text-lg mb-2">{label}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function ImpactStats() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Our Impact by the Numbers
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real change, measurable results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow"
            >
              <CountUpStat
                number={stat.number}
                label={stat.label}
                description={stat.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
