import { motion } from "framer-motion";
import { missionVision } from "@/lib/aboutData";

export function MissionVision() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-lg border-l-4 border-l-primary hover:shadow-xl transition-shadow"
          >
            <div className="inline-block bg-primary/10 rounded-full p-3 mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h2 className="font-display text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {missionVision.mission}
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-lg border-l-4 border-l-secondary hover:shadow-xl transition-shadow"
          >
            <div className="inline-block bg-secondary/10 rounded-full p-3 mb-4">
              <span className="text-2xl">🌟</span>
            </div>
            <h2 className="font-display text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {missionVision.vision}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
