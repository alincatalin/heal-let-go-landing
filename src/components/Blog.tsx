import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const blogPosts = [
  {
    title: "Why No Contact Is the Hardest (and Most Important) Thing You'll Do",
    description: "Breaking no contact feels good for 5 minutes. Then the regret hits. Here's why staying strong matters more than you think.",
    category: "Recovery",
    date: "March 15, 2024",
    readTime: "5 min read",
  },
  {
    title: "The 6 Stages of Breakup Healing: Where Are You Right Now?",
    description: "Healing isn't linear, but there are patterns. Understanding which stage you're in helps you know what to do next.",
    category: "Healing Journey",
    date: "March 12, 2024",
    readTime: "7 min read",
  },
  {
    title: "3AM and You Want to Text Them: A Survival Guide",
    description: "Late nights are when you're most vulnerable. Here's exactly what to do when the urge hits hardest.",
    category: "Tips",
    date: "March 8, 2024",
    readTime: "4 min read",
  },
];

export const Blog = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`text-center space-y-4 mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Healing Wisdom
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real advice for real heartbreak. No toxic positivity, just honest guidance from people who've been there.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BlogCard = ({ post, index }: { post: typeof blogPosts[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Card className="h-full hover:shadow-glow transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {post.category}
            </Badge>
          </div>
          <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
          <CardDescription className="text-base">{post.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
