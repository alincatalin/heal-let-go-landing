import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, TrendingUp, Shield, Sparkles } from "lucide-react";
import { PhoneMockup } from "@/components/PhoneMockup";
import { BetaSignupDialog } from "@/components/BetaSignupDialog";
import { useState } from "react";

export const AppPromotion = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [showBetaDialog, setShowBetaDialog] = useState(false);

  const features = [
    {
      icon: Heart,
      title: "AI Healing Coach",
      description: "Get personalized support 24/7"
    },
    {
      icon: TrendingUp,
      title: "Track Your Progress",
      description: "See how far you've come"
    },
    {
      icon: Shield,
      title: "No Contact Support",
      description: "Stay strong when it matters most"
    },
    {
      icon: Sparkles,
      title: "Daily Check-ins",
      description: "Build healthy healing habits"
    }
  ];

  return (
    <>
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div
            ref={ref}
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              {/* Left side - Content */}
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium">
                  🎉 Beta Access Available
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold">
                  Ready to Start Your Healing Journey?
                </h2>
                
                <p className="text-xl text-muted-foreground">
                  Join thousands who are healing with Heal: Let Them Go. Get personalized support, track your progress, and finally move forward.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 py-6">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex gap-3">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="text-lg px-8"
                    onClick={() => setShowBetaDialog(true)}
                  >
                    Join Beta - 50% Off
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="text-lg px-8"
                    onClick={() => {
                      const pricingSection = document.getElementById('pricing');
                      pricingSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    See Pricing
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  Beta testers get 50% off forever when they subscribe. Limited spots available.
                </p>
              </div>

              {/* Right side - Phone Mockup */}
              <div className="relative lg:ml-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/20 blur-3xl" />
                <PhoneMockup />
              </div>
            </div>
          </div>
        </div>
      </section>

      <BetaSignupDialog 
        open={showBetaDialog}
        onOpenChange={setShowBetaDialog}
      />
    </>
  );
};
