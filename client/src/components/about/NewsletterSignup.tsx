import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle2 } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Mock submission
    setSubmitted(true);
    setEmail("");

    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="mb-6 flex justify-center">
            <div className="bg-white/20 rounded-full p-3">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Get news, impact stories, and volunteer opportunities delivered to
            your inbox.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 flex items-center gap-3 justify-center"
            >
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <p className="font-semibold text-gray-900">
                Thanks for subscribing! Check your email.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
              />
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="whitespace-nowrap"
              >
                Subscribe
              </Button>
            </form>
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/80 text-sm mt-3"
            >
              {error}
            </motion.p>
          )}

          <p className="text-white/70 text-sm mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
