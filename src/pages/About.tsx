import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MissionVision } from "@/components/about/MissionVision";
import { Story } from "@/components/about/Story";
import { Timeline } from "@/components/about/Timeline";
import { ValuesGrid } from "@/components/about/ValuesGrid";
import { TeamGrid } from "@/components/about/TeamGrid";
import { PartnersGrid } from "@/components/about/PartnersGrid";
import { ImpactStats } from "@/components/about/ImpactStats";
import { FAQAccordion } from "@/components/about/FAQAccordion";
import { ContactInfo } from "@/components/about/ContactInfo";
import { NewsletterSignup } from "@/components/about/NewsletterSignup";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function About() {
  const { data: staffData } = useQuery<any>({ queryKey: ["staff", 'all'] });
  
  const [staff, setStaff] = useState([]);
  useEffect(() => { 
    window.scrollTo(0, 0);
    if (staffData) {
      setStaff(staffData);
    }
  }, [staffData]);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-primary/10 to-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                About Innovation Community Hub
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discovering hidden talents and transforming lives through
                innovative community programs across East Africa
              </p>
            </motion.div>
          </div>
        </section>

        {/* Components */}
        <MissionVision />
        <Story />
        <ValuesGrid />
        <ImpactStats />
        <Timeline />
       { staff.length > 0 && <TeamGrid staff={staff} /> }
        {/* <PartnersGrid /> */}
        <FAQAccordion />
        <ContactInfo />
        <NewsletterSignup />
      </main>

      <Footer />
    </div>
  );
}
