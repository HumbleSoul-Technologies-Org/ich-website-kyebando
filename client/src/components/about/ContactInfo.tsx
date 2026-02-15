import { motion } from "framer-motion";
import { contactMethods } from "@/lib/aboutData";
import { Card, CardContent } from "@/components/ui/card";

export function ContactInfo() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Reach out to us through any of these channels. We'd love to hear
            from you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.id}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full hover:shadow-lg hover:border-primary transition-all">
                <CardContent className="pt-8 text-center">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {method.icon}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">
                    {method.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-primary transition-colors">
                    {method.content}
                  </p>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
