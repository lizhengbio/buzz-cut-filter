import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, TrendingUp, Star, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - Buzz Cut AI News & Updates",
  description: "Stay updated with the latest buzz cut trends, product reviews, and API updates from Buzz Cut AI.",
};

const blogCategories = [
  {
    title: "Trends & News",
    description: "Latest buzz cut trends and fashion updates",
    href: "/blog/trends",
    icon: TrendingUp,
    color: "bg-blue-500",
    count: 12
  },
  {
    title: "Product Reviews",
    description: "Professional reviews of clippers and related products",
    href: "/blog/product-reviews",
    icon: Star,
    color: "bg-yellow-500",
    count: 8
  },
  {
    title: "API Updates",
    description: "Technical updates and new feature releases",
    href: "/blog/api-updates",
    icon: Code,
    color: "bg-green-500",
    count: 5
  }
];

const recentPosts = [
  {
    title: "Top 5 Most Popular Buzz Cut Styles in 2024",
    excerpt: "Explore this year's most popular buzz cut styles, from classic to modern - there's something for everyone.",
    date: "2024-01-15",
    category: "Trends & News",
    readTime: "5 min read"
  },
  {
    title: "How to Choose the Right Clipper Guard Size",
    excerpt: "Detailed guide to help you choose the right clipper guard length for the perfect buzz cut effect.",
    date: "2024-01-10",
    category: "Product Reviews",
    readTime: "7 min read"
  },
  {
    title: "AI Face Protection Technology Upgrade",
    excerpt: "Our latest technical update improves facial recognition accuracy and security.",
    date: "2024-01-05",
    category: "API Updates",
    readTime: "3 min read"
  }
];

export default function BlogPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12 container px-4 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Buzz Cut AI Blog
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get the latest buzz cut trends, product reviews, and technical updates.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {blogCategories.map((category) => (
          <Card key={category.href} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${category.color} rounded-full flex items-center justify-center`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{category.count} articles</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{category.description}</p>
              <Button asChild className="w-full" variant="outline">
                <Link href={category.href}>
                  Browse Articles
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Latest Articles</h2>
        <div className="grid gap-6">
          {recentPosts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold hover:text-primary cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border rounded-xl p-6 md:p-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Subscribe to Our Blog</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Be the first to get the latest buzz cut trends, technical updates, and usage tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-md border border-input bg-background text-sm"
            />
            <Button>
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              In-depth analysis of the most popular buzz cut styles and color trends.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Expert Advice</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Buzz cut care advice from professional barbers and stylists.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tech Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Understand how our AI technology works and the latest improvements.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Stories</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Real user buzz cut experiences and transformation stories.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 