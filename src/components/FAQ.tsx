import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "Is my data private?",
      answer: "Yes. Your journal entries, messages, and personal information never leave your device except for AI processing (which is encrypted). We never sell your data. Ever."
    },
    {
      question: "Do I need to talk to a real person?",
      answer: "Nope. The AI coach is available 24/7. No scheduling, no awkward video calls, no judgment. Just support when you need it."
    },
    {
      question: "What if I break no contact?",
      answer: "That's okay. Healing isn't linear. The app helps you understand why it happened and get back on track. No shame, just support."
    },
    {
      question: "Does this replace therapy?",
      answer: "No. If you're in crisis or dealing with severe mental health issues, please see a professional. This app is for people who are functional but struggling with the daily challenge of getting over someone."
    },
    {
      question: "Can my ex see what I write in the app?",
      answer: "Absolutely not. Everything is private. The fake texting feature never actually sends - it's just for you to process your feelings."
    },
    {
      question: "What if I want my ex back?",
      answer: "We focus on YOUR healing first. Whether you eventually reconnect or move on completely, you need to heal yourself first. That's what we help with."
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
