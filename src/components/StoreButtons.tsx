import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Apple, Play } from "lucide-react";

export const APP_STORE_URL = "https://apps.apple.com/ro/app/heal-let-them-go/id6754834593";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=co.betafocus.heal";

interface StoreButtonsProps {
  className?: string;
}

export const StoreButtons = ({ className }: StoreButtonsProps) => {
  return (
    <div className={cn("flex flex-col sm:flex-row gap-3 w-full max-w-full", className)}>
      <Button asChild size="lg" variant="hero" className="w-full">
        <a href={APP_STORE_URL} target="_blank" rel="noreferrer">
          <Apple className="h-5 w-5" />
          Download on the App Store
        </a>
      </Button>
      <Button asChild size="lg" variant="accent" className="w-full">
        <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
          <Play className="h-5 w-5" />
          Get it on Google Play
        </a>
      </Button>
    </div>
  );
};
