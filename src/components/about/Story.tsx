import { motion } from "framer-motion";
import { missionVision } from "@/lib/aboutData";
import { Card } from "@/components/ui/card";

export function Story() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-l-2xl -mr-10 h-[500px] overflow-hidden border-0 relative">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKD2fZPqR0g94t2QfjUoM44JuBlFC5D2eGFw&s"
                alt="Community engagement"
                className="w-full h-full object-fill"
              />
              <div className="absolute border-0 inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/30 to-white" />
            </div>
             
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Our Story
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {missionVision.story}
            </p>

            {/* Founder Quote Card */}
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-0 p-6 mb-8">
              <div className="flex items-start gap-4">
                <span className="text-4xl">💬</span>
                <div>
                  <p className="text-lg font-display italic mb-4">
                    "{missionVision.founderQuote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={missionVision.founderImage}
                      alt={missionVision.founderName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-bold">{missionVision.founderName}</p>
                      <p className="text-sm text-muted-foreground">
                        {missionVision.founderRole}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
