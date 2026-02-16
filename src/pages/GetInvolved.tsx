import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertVolunteerSchema, type InsertVolunteer } from "@/types/schema";
import { useCreateVolunteer } from "@/hooks/use-volunteers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion } from "framer-motion";
import { HandHeart, Users, Heart } from "lucide-react";

export default function GetInvolved() {
  const { mutate, isPending } = useCreateVolunteer();
  
  const form = useForm<InsertVolunteer>({
    resolver: zodResolver(insertVolunteerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      message: "",
      status: "pending"
    }
  });

  const onSubmit = (data: InsertVolunteer) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
      }
    });
  };

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

            {/* Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 bg-card p-8 md:p-10 rounded-3xl shadow-xl border border-border"
            >
              <h2 className="font-display text-3xl font-bold mb-8">Get Started</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="jane@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 234 567 890" {...field} value={field.value || ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>I'm interested in...</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value || ''}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Volunteer">Volunteering</SelectItem>
                              <SelectItem value="Partner">Partnership</SelectItem>
                              <SelectItem value="Sponsor">Sponsorship</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us how you'd like to help..." 
                            className="min-h-[150px]" 
                            {...field} 
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" disabled={isPending} className="w-full md:w-auto font-bold">
                    {isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
