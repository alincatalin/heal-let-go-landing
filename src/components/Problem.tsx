import { Check } from "lucide-react";

export const Problem = () => {
  const painPoints = [
    "You've broken no contact more times than you can count",
    "Late nights are the hardest - that's when you're weakest",
    "Everyone says \"just move on\" but nobody tells you HOW",
    "You're tired of feeling stuck in this pain",
    "You want to heal, but you don't know where to start"
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              You know you shouldn't text them.{" "}
              <span className="text-primary">But you can't stop thinking about it.</span>
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              It's 2am. You've had a few drinks. You're scrolling through old photos. 
              Your thumb hovers over their name.
            </p>
            
            <p className="text-xl text-foreground">
              You know it won't help. You know you'll regret it. But the urge is overwhelming.
            </p>
            
            <p className="text-2xl font-semibold text-primary">Sound familiar?</p>
          </div>
          
          <div className="bg-card border border-border rounded-2xl p-8 space-y-4">
            {painPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-4 text-left">
                <Check className="w-6 h-6 text-teal mt-1 flex-shrink-0" />
                <p className="text-lg text-foreground">{point}</p>
              </div>
            ))}
          </div>
          
          <p className="text-xl text-foreground font-medium">
            You're not weak. You're human. And you deserve support.
          </p>
        </div>
      </div>
    </section>
  );
};
