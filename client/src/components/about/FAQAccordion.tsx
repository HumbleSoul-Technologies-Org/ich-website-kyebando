import { motion } from "framer-motion";
import { useState } from "react";
import { faqs } from "@/lib/aboutData";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown } from "lucide-react";

export function FAQAccordion() {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about our work
          </p>
        </div>

        <Tabs defaultValue="General" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            {faqs.map((faqCategory) => (
              <TabsTrigger
                key={faqCategory.category}
                value={faqCategory.category}
              >
                {faqCategory.category}
              </TabsTrigger>
            ))}
          </TabsList>

          {faqs.map((faqCategory) => (
            <TabsContent
              key={faqCategory.category}
              value={faqCategory.category}
              className="space-y-4"
            >
              {faqCategory.questions.map((question, index) => {
                const questionId = `${faqCategory.category}-${index}`;
                const isExpanded = expandedQuestion === questionId;

                return (
                  <motion.div
                    key={questionId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card
                      className="cursor-pointer hover:shadow-md transition-all border-l-4 border-l-primary"
                      onClick={() => toggleQuestion(questionId)}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-semibold text-lg flex-grow">
                            {question.q}
                          </h3>
                          <motion.div
                            animate={{
                              rotate: isExpanded ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0 mt-1"
                          >
                            <ChevronDown className="w-5 h-5 text-primary" />
                          </motion.div>
                        </div>

                        <motion.div
                          initial={false}
                          animate={{
                            height: isExpanded ? "auto" : 0,
                            opacity: isExpanded ? 1 : 0,
                            marginTop: isExpanded ? 16 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-muted-foreground leading-relaxed">
                            {question.a}
                          </p>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
