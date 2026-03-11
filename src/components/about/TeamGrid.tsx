import { motion } from "framer-motion";
import { useState } from "react";
import { staff } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function TeamGrid({staff}: {staff: any[]}) {
  const [showAll, setShowAll] = useState(false);
  const displayedMembers = showAll ? staff : staff.slice(0, 6);

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Our Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dedicated professionals committed to community transformation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staff.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-96 w-80 border-0 overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                  <img
                    src={member?.photo?.url}
                    alt={member.name}
                    className="w-full h-full object-fill group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="font-display text-xl font-bold mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.phone}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {!showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-12"
          >
            <Button
              onClick={() => setShowAll(true)}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              View Full Team ({staff.length})
              <ChevronDown className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-12"
          >
            <Button
              onClick={() => setShowAll(false)}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              Show Less
              <ChevronDown className="w-4 h-4 rotate-180" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
