import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { format } from 'date-fns';

export default async function BlogPage() {
  const blogPosts = await prisma.blogPost.findMany({
    where: { status: 'Published' },
    orderBy: { date: 'desc' }
  });

  return (
    <div className="bg-background">
      <div className="container py-12 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">From Our Blog</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Stay updated with the latest news, tips, and insights from the world of electronics and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="flex flex-col">
              {post.imageUrl && (
                <CardHeader className="p-0">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="object-cover rounded-t-lg aspect-[3/2]"
                  />
                </CardHeader>
              )}
              <CardContent className="pt-6 flex-grow">
                <CardTitle className="text-xl font-headline hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  {format(post.date, 'MMMM d, yyyy')} by {post.author}
                </p>
                <p className="mt-4 text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                 <Link href={`/blog/${post.slug}`}>
                    <Button variant="link" className="p-0 text-accent">Read More</Button>
                 </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
