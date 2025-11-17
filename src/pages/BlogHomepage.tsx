import { Hero } from "@/components/Hero";
import { Blog } from "@/components/Blog";
import { NewsletterSubscribe } from "@/components/NewsletterSubscribe";
import { AppPromotion } from "@/components/AppPromotion";
import { Footer } from "@/components/Footer";

const BlogHomepage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Blog Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              Healing Wisdom Blog
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Real advice for real heartbreak. No toxic positivity, just honest guidance from people who've been there.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <Blog />

      {/* App Promotion Section */}
      <AppPromotion />

      {/* Newsletter Subscribe Section */}
      <NewsletterSubscribe />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogHomepage;
