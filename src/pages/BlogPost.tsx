import { useParams, useNavigate } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Post Not Found</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-6 mb-12">
          <Badge variant="secondary" className="text-sm">
            {post.category}
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-muted-foreground">
            {post.description}
          </p>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-foreground
            prose-h1:text-4xl prose-h1:mb-6
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
            prose-strong:text-foreground prose-strong:font-semibold
            prose-ul:my-6 prose-ul:space-y-2
            prose-li:text-muted-foreground
            prose-blockquote:border-l-primary prose-blockquote:bg-card/50
            prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-6"
          dangerouslySetInnerHTML={{ 
            __html: post.content
              .split('\n')
              .map(line => {
                // Convert markdown headers
                if (line.startsWith('### ')) {
                  return `<h3>${line.substring(4)}</h3>`;
                }
                if (line.startsWith('## ')) {
                  return `<h2>${line.substring(3)}</h2>`;
                }
                if (line.startsWith('# ')) {
                  return `<h1>${line.substring(2)}</h1>`;
                }
                // Convert bold text
                line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                // Convert bullet points
                if (line.trim().startsWith('- ')) {
                  return `<li>${line.substring(2)}</li>`;
                }
                // Regular paragraphs
                if (line.trim()) {
                  return `<p>${line}</p>`;
                }
                return '';
              })
              .join('') 
          }}
        />

        {/* Back to blog section */}
        <div className="mt-16 pt-8 border-t border-border">
          <Button 
            onClick={() => navigate("/")}
            size="lg"
            className="w-full md:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </article>

      <Footer />
    </div>
  );
}
