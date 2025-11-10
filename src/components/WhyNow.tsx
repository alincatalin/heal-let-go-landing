import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export const WhyNow = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section className="py-20 relative">
      <div 
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why <span className="text-primary">Now?</span>
          </h2>
          
          <div className="space-y-6 text-lg text-muted-foreground">
            <p className="text-2xl font-semibold text-foreground">
              The first 90 days after a breakup are the hardest.
            </p>
            
            <p>
              Every therapist will tell you: no contact is crucial for healing. But knowing what to do 
              and actually doing it are two different things.
            </p>
            
            <p className="text-xl text-foreground font-medium">
              That's where we come in.
            </p>
            
            <p>
              We don't just tell you "don't text your ex." We help you NOT text your ex - 
              in the moment when it matters most.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
