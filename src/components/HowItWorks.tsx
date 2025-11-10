import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export const HowItWorks = () => {
  const { ref, isVisible } = useScrollAnimation();
  const steps = [
    {
      number: "1",
      title: "Tell us your story",
      description: "When did the breakup happen? When did you last contact them? We personalize everything to your journey."
    },
    {
      number: "2",
      title: "Get support when you need it",
      description: "Open the app when you're struggling. Use fake texting to vent. Talk to the AI coach. Journal your feelings."
    },
    {
      number: "3",
      title: "Track your progress",
      description: "Watch your no-contact days grow. Move through the 6 stages of healing. See yourself getting stronger."
    },
    {
      number: "4",
      title: "Choose yourself, every day",
      description: "Healing isn't linear. Some days are harder than others. We're here for all of them."
    }
  ];

  return (
    <section className="py-20 relative">
      <div 
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">How It Works</h2>
          </div>
          
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold shadow-glow">
                  {step.number}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-lg text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
