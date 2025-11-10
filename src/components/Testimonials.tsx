import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      text: "I was about to text my ex for the 100th time. This app stopped me.",
      author: "Beta tester"
    },
    {
      text: "Finally, something that actually understands what I'm going through at night.",
      author: "Beta tester"
    },
    {
      text: "The fake texting feature saved me from so many regrets.",
      author: "Beta tester"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Real people. Real healing.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="p-8 space-y-4 bg-card/50 backdrop-blur-sm border-border relative"
              >
                <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />
                <p className="text-lg leading-relaxed relative z-10">{testimonial.text}</p>
                <p className="text-sm text-muted-foreground">— {testimonial.author}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
