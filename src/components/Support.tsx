import { Button } from "@/components/ui/button";
import { Mail, MessageCircle } from "lucide-react";

export const Support = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            We are here for you
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Need to talk to someone on the team?
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you have product questions, need help getting unstuck, or
            just want to share feedback, we will get back to you as soon as
            possible.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-border/60 bg-background/80 p-8 space-y-4 shadow-glow-soft">
            <Mail className="h-10 w-10 text-primary" />
            <h3 className="text-2xl font-semibold">Email support</h3>
            <p className="text-muted-foreground">
              Send us a note at{" "}
              <a
                href="mailto:healletgo@proton.me"
                className="text-primary underline underline-offset-4"
              >
                healletgo@proton.me
              </a>{" "}
              and we will respond within 24 hours—usually much faster.
            </p>
            <a href="mailto:healletgo@proton.me">
              <Button variant="accent" className="mt-2">
                Email the team
              </Button>
            </a>
          </div>

          <div className="rounded-3xl border border-border/60 bg-background/80 p-8 space-y-4 shadow-glow-soft">
            <MessageCircle className="h-10 w-10 text-primary" />
            <h3 className="text-2xl font-semibold">In-app contact form</h3>
            <p className="text-muted-foreground">
              Tap <span className="font-semibold">Support → Contact Us</span> in
              the Heal Let Go app to send a message without leaving your
              healing flow. We will follow up right in your inbox.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Share context about your journey or account</li>
              <li>• Attach screenshots of anything that looks off</li>
              <li>• Expect a personal response within hours</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
