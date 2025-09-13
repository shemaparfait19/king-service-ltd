
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { BlogPost } from '@/lib/definitions';
import type { Locale } from '@/i18n-config';

async function getBlogPosts(): Promise<BlogPost[]> {
    const postsCollection = collection(db, 'blogPosts');
    const q = query(postsCollection, where("status", "==", "Published"), orderBy("date", "desc"));
    const postsSnapshot = await getDocs(q);
    const postList = postsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            date: data.date.toDate(), // Convert Firestore Timestamp to JS Date
        } as BlogPost;
    });
    return postList;
}

export default async function BlogPage({ params: { lang } }: { params: { lang: Locale } }) {
  const blogPosts = await getBlogPosts();

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
                  <Link href={`/${lang}/blog/${post.slug}`}>
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="object-cover rounded-t-lg aspect-[3/2]"
                    />
                  </Link>
                </CardHeader>
              )}
              <CardContent className="pt-6 flex-grow">
                <CardTitle className="text-xl font-headline hover:text-primary transition-colors">
                  <Link href={`/${lang}/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  {format(new Date(post.date), 'MMMM d, yyyy')} by {post.author}
                </p>
                <p className="mt-4 text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                 <Link href={`/${lang}/blog/${post.slug}`}>
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
