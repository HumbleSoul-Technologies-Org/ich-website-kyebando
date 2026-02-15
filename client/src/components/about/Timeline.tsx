import { motion } from "framer-motion";
import { useState } from "react";
import { timeline } from "@/lib/aboutData";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

export function Timeline() {
  const [expandedYear, setExpandedYear] = useState<number | null>(2024);

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Our Journey
          </h2>
          <p className="text-xl text-muted-foreground">
            From a small initiative to a regional movement
          </p>
        </div>

        <div className="relative">
          {/* Central line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary" />

          <div className="space-y-12">
            {timeline.map((yearData, index) => (
              <motion.div
                key={yearData.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className="flex-1">
                  <Card
                    className="cursor-pointer hover:shadow-lg transition-all border-l-4 border-l-primary overflow-hidden"
                    onClick={() =>
                      setExpandedYear(
                        expandedYear === yearData.year ? null : yearData.year
                      )
                    }
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-display text-3xl font-bold text-primary">
                            {yearData.year}
                          </h3>
                          <p className="text-lg font-semibold text-muted-foreground">
                            {yearData.title}
                          </p>
                        </div>
                        <motion.div
                          animate={{
                            rotate:
                              expandedYear === yearData.year ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-6 h-6 text-primary" />
                        </motion.div>
                      </div>

                      {/* Events */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: expandedYear === yearData.year ? "auto" : 0,
                          opacity:
                            expandedYear === yearData.year ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t space-y-4">
                          {yearData.events.map((event, i) => (
                            <div
                              key={i}
                              className="flex gap-3"
                            >
                              <div className="flex-shrink-0 w-20 font-semibold text-primary text-sm">
                                {event.month}
                              </div>
                              <div className="flex-grow">
                                <p className="font-semibold mb-1">
                                  {event.event}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {event.details}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline dot */}
                <div className="flex md:flex-col items-center justify-center">
                  <motion.div
                    animate={{
                      scale: expandedYear === yearData.year ? 1.3 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center relative z-10"
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </motion.div>
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
