interface PhoneMockupProps {
  screenshot?: string;
  alt?: string;
}

export const PhoneMockup = ({ screenshot, alt = "App screenshot" }: PhoneMockupProps) => {
  return (
    <div className="relative mx-auto w-[300px] animate-float">
      {/* Phone frame */}
      <div className="relative bg-card border-2 border-border rounded-[3rem] p-3 shadow-glow-strong">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-background rounded-b-3xl z-10" />
        
        {/* Screen */}
        <div className="relative bg-background rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
          {screenshot ? (
            <img 
              src={screenshot} 
              alt={alt}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-primary opacity-10 flex items-center justify-center">
              <div className="text-center space-y-2 px-6">
                <p className="text-muted-foreground text-sm">App Screenshot</p>
                <p className="text-xs text-muted-foreground/60">Replace with your app screenshot</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-border rounded-full" />
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl -z-10" />
    </div>
  );
};
