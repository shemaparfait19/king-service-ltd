import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { BlogPost } from "@/lib/definitions";

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const blogPostsRef = collection(db, "blogPosts");
    const q = query(blogPostsRef, where("status", "==", "Published"));
    const blogPostsSnapshot = await getDocs(q);

    const posts = blogPostsSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as BlogPost)
    );

    // Filter out announcements and sort by date on the client side to avoid requiring a composite index
    return posts
      .filter((post) => post.category !== "Announcement")
      .sort((a, b) => {
        const dateA = new Date(a.date?.toDate?.() || a.date);
        const dateB = new Date(b.date?.toDate?.() || b.date);
        return dateB.getTime() - dateA.getTime();
      });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
          Latest News & Updates
        </h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          Stay updated with our latest announcements and technical insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.length > 0 ? (
          blogPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="p-0">
                {post.imageUrl && (
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-full"
                    />
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">{post.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(
                      post.date?.toDate?.() || post.date
                    ).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-headline mb-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-accent hover:underline font-medium"
                >
                  Read More →
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg">
              No blog posts available at the moment.
            </p>
            <p className="text-muted-foreground">
              Check back soon for updates!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
