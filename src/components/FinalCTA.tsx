import { StoreButtons } from "@/components/StoreButtons";

export const FinalCTA = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-primary rounded-3xl p-12 md:p-16 text-center space-y-8 relative overflow-hidden shadow-glow-strong">
            <div className="absolute inset-0 bg-gradient-glow opacity-50" />
            
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to stop the cycle?
              </h2>
              
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Download Heal: Let Them Go and get the support you need when the urge to text hits hardest.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <StoreButtons />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
