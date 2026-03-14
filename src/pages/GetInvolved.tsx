import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { HandHeart, Users, Heart, CheckCircle, Clock, UserCheck, MessageSquare, ArrowRight, BookOpen, Target, Save } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";

export default function GetInvolved() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { toast } = useToast();

  // Form state for all input fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    message: "",
  });

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.name.trim()) {
      errors.push("Name is required.");
    }

    if (!formData.email.trim()) {
      errors.push("Email is required.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push("Please enter a valid email address.");
    }

    if (!formData.role) {
      errors.push("Please select a role.");
    }

    if (!formData.message.trim()) {
      errors.push("Message is required.");
    }

    if (errors.length) {
      toast({
        title: "Fix the form fields",
        description: errors.join(" "),
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      message: "",
    });
  };

  
  const sendMessage = async (event?: FormEvent) => {
    event?.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await apiRequest('POST', '/messages/volunteers/create', formData);

      // Hide form and show success message
      setShowSuccessMessage(true);
      resetForm();

      // After 4 seconds, animate success message away and show form again
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 4000);

    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-secondary text-secondary-foreground pt-32 pb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="font-display text-5xl text-primary md:text-6xl font-bold mb-6">Join the Mission</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Your time, skills, and support can change the trajectory of an entire community.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-10 relative z-20 pb-20">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cards */}
            <div className="lg:col-span-1 space-y-6">
              {[
                { title: "Volunteer", icon: HandHeart, desc: "Give your time to mentor and support programs." },
                { title: "Partner", icon: Users, desc: "Collaborate with us as an organization." },
                { title: "Sponsor", icon: Heart, desc: "Provide resources to scale our impact." },
              ].map((card, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card p-6 rounded-2xl shadow-lg border border-border/50"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <card.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2">{card.title}</h3>
                  <p className="text-muted-foreground">{card.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Form/Success Message Container */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 bg-card p-8 md:p-10 rounded-3xl shadow-xl border border-border"
            >
              {!showSuccessMessage ? (
                <>
                  <h2 className="font-display text-3xl font-bold mb-8">Get Started</h2>

              <form className="space-y-6" onSubmit={sendMessage}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      placeholder="+256 7xx xxx xxx"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">I'm interested in...</Label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Volunteer">Volunteering</SelectItem>
                        <SelectItem value="Partner">Partnership</SelectItem>
                        <SelectItem value="Sponsor">Sponsorship</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how you'd like to help..."
                    className="min-h-[150px]"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full md:w-auto font-bold"
                >
                  {isSubmitting ? <span className="flex items-center justify-center gap-2">Sending... <Save className="w-5 h-5 animate-bounce"/></span> : "Send Message"}
                </Button>
              </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-3xl" />
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl" />
                  <div className="relative p-8 md:p-10">
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                      >
                        <CheckCircle className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                        🎉 Message Sent Successfully!
                      </h3>
                      <p className="text-white/90 text-lg">
                        Thank you for reaching out! Your message has been received.
                      </p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20 max-w-md mx-auto"
                    >
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">Response Time</h4>
                          <p className="text-white/80">We'll get back to you within 24-48 hours</p>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-md mx-auto"
                    >
                      <h4 className="font-semibold text-white mb-3 flex items-center justify-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        While you wait...
                      </h4>
                      <p className="text-white/80 mb-4 text-center">
                        Explore our community and learn more about how you can make an impact
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                          href="/programs"
                          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors group"
                        >
                          <BookOpen className="w-4 h-4" />
                          Explore Programs
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                          href="/about"
                          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors group"
                        >
                          <Heart className="w-4 h-4" />
                          Our Mission
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
