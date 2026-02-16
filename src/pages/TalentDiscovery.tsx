import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTalentSchema, type InsertTalent } from "@/types/schema";
import { useCreateTalent } from "@/hooks/use-talents";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function TalentDiscovery() {
  const { mutate, isPending } = useCreateTalent();
  
  const form = useForm<InsertTalent>({
    resolver: zodResolver(insertTalentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      category: "",
      description: "",
      status: "pending"
    }
  });

  const onSubmit = (data: InsertTalent) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground font-medium mb-6">
                <Sparkles className="w-4 h-4" /> Talent Discovery Program
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Show Us What <br/>
                <span className="text-gradient">You Can Do</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                We believe genius is evenly distributed, but opportunity is not. Whether you're a coder, artist, musician, or entrepreneur, we want to help you shine.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Get Discovered", desc: "Showcase your skills to a wider audience." },
                  { title: "Mentorship", desc: "Connect with experts in your field." },
                  { title: "Resources", desc: "Access tools and funding to grow your talent." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold text-lg">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card border border-border/50 shadow-2xl rounded-3xl p-8 md:p-10"
            >
              <h2 className="font-display text-2xl font-bold mb-6">Submit Your Details</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-background h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" className="bg-background h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 234 567 890" className="bg-background h-12" {...field} value={field.value || ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Talent Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-background">
                              <SelectValue placeholder="Select your talent" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Tech & Coding">Tech & Coding</SelectItem>
                            <SelectItem value="Music & Performance">Music & Performance</SelectItem>
                            <SelectItem value="Visual Arts">Visual Arts</SelectItem>
                            <SelectItem value="Business & Innovation">Business & Innovation</SelectItem>
                            <SelectItem value="Crafts & Making">Crafts & Making</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tell us about your talent</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What do you do? Share links to your portfolio if applicable." 
                            className="bg-background min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                  >
                    {isPending ? "Submitting..." : "Submit Application"}
                    {!isPending && <ArrowRight className="ml-2 w-5 h-5" />}
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
