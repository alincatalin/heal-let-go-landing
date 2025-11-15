import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export const Pricing = () => {
  const { ref, isVisible } = useScrollAnimation();
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
            <h2 className="text-4xl md:text-5xl font-bold">Pricing</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 space-y-6 bg-gradient-primary relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-glow opacity-50" />
              <div className="relative z-10">
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold">Beta Access</h3>
                  <div className="text-5xl font-bold">FREE</div>
                  <p className="text-primary-foreground/80">
                    Be one of the first 50 people to use Heal: Let Them Go
                  </p>
                </div>
                
                <div className="space-y-3 py-6">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5" />
                    <span>Full access to all features</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5" />
                    <span>Help shape the product</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5" />
                    <span>Direct feedback to founders</span>
                  </div>
                </div>
                
                <Button variant="accent" size="lg" className="w-full">
                  Join the Beta
                </Button>
              </div>
            </Card>
            
            <Card className="p-8 space-y-6 bg-card/50 backdrop-blur-sm border-border">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">After Beta</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">$12.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground">
                  No commitment. Cancel anytime.
                </p>
              </div>
              
              <div className="space-y-3 py-6">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span>24/7 AI Coach access</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span>Unlimited fake texting</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span>All healing practices</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span>Private journaling</span>
                </div>
              </div>
              
              <Button variant="outline" size="lg" className="w-full" disabled>
                Coming Soon
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
