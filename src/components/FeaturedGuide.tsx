import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export const FeaturedGuide = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary w-fit">
                            New Ultimate Guide
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                            Should You Text Your Ex?
                        </h2>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Stop guessing and spiraling. We've built the ultimate decision-making framework to help you decide if reaching out is a good idea—or a huge mistake.
                        </p>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button asChild size="lg" className="gap-2">
                                <a href="/blog/guides/text-your-ex-guide">
                                    Read the Guide <ArrowRight className="w-4 h-4" />
                                </a>
                            </Button>
                        </div>
                    </div>
                    <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last border border-border/50 shadow-2xl bg-muted/50 flex items-center justify-center">
                        <div className="text-center p-8">
                            <span className="text-6xl mb-4 block">📱</span>
                            <p className="text-xl font-medium text-muted-foreground">The "Text Your Ex" Decision Matrix</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
