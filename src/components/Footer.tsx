import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              <span className="text-xl font-semibold">Heal: Let them go</span>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Instagram
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                TikTok
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Email
              </a>
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Built by someone who's been exactly where you are
            </p>
            <p className="text-xs text-muted-foreground">
              If you're in crisis, please contact: National Suicide Prevention Lifeline: 988
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
