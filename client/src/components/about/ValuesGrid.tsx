import { motion } from "framer-motion";
import { values } from "@/lib/aboutData";
import { Card, CardContent } from "@/components/ui/card";

export function ValuesGrid() {
  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Our Core Values
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            These principles guide everything we do and shape our commitment to
            community impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all border-0 overflow-hidden group">
                <div className="h-16 bg-gradient-to-r from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors flex items-center justify-center">
                  <span className="text-4xl">{value.icon}</span>
                </div>
                <CardContent className="pt-6">
                  <h3 className="font-display text-2xl font-bold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
