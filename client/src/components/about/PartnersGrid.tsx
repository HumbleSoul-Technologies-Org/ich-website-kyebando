import { motion } from "framer-motion";
import { useState } from "react";
import { partners } from "@/lib/aboutData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function PartnersGrid() {
  const [showAllPartners, setShowAllPartners] = useState(false);

  const featuredPartners = partners.slice(0, 3);
  const allPartners = partners;

  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Our Partners
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Organizations and individuals who make our work possible
          </p>
        </div>

        {/* Featured Partners */}
        {!showAllPartners && (
          <>
            <div className="mb-16">
              <h3 className="font-display text-2xl font-bold mb-8 text-center">
                Featured Sponsors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredPartners.map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
                      <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-h-24 max-w-32 object-contain group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-lg flex-grow">
                            {partner.name}
                          </h3>
                          <Badge className="ml-2">{partner.tier}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {partner.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-center mb-8">
              <Button
                size="lg"
                onClick={() => setShowAllPartners(true)}
              >
                View All Partners
              </Button>
            </div>
          </>
        )}

        {/* All Partners Grid */}
        {showAllPartners && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-6 mb-12">
              {allPartners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow overflow-hidden group">
                    <div className="h-28 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-20 max-w-24 object-contain group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-sm mb-2 truncate">
                        {partner.name}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {partner.tier}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mb-12">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAllPartners(false)}
              >
                Show Featured Only
              </Button>
            </div>
          </>
        )}

        {/* Become a Partner CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl p-12 text-center"
        >
          <h3 className="font-display text-3xl font-bold mb-4">
            Become a Partner
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join us in transforming communities. Multiple partnership levels
            available to match your organization's capacity.
          </p>
          <Button size="lg">Start a Partnership</Button>
        </motion.div>
      </div>
    </section>
  );
}
