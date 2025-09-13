import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { BlogPost } from '@/lib/definitions';


export async function generateStaticParams() {
    const postsSnapshot = await getDocs(collection(db, 'blogPosts'));
    return postsSnapshot.docs.map((doc) => ({
      slug: doc.data().slug,
    }));
}

async function getPost(slug: string): Promise<BlogPost | null> {
    const postsCollection = collection(db, 'blogPosts');
    const q = query(postsCollection, where("slug", "==", slug), limit(1));
    const postSnapshot = await getDocs(q);

    if (postSnapshot.empty) {
        return null;
    }
    const doc = postSnapshot.docs[0];
    const data = doc.data();

    return {
        id: doc.id,
        ...data,
        date: data.date.toDate(),
    } as BlogPost;
}

export default async function BlogPostPage({ params }: { params: { slug: string, lang: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-background">
      <div className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${params.lang}`}>Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${params.lang}/blog`}>Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{post.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <main>
            <article>
              <header className="mb-8">
                <Badge variant="secondary" className="mb-4">{post.category}</Badge>
                <h1 className="text-4xl md:text-5xl font-extrabold font-headline leading-tight">
                  {post.title}
                </h1>
                <p className="mt-4 text-muted-foreground">
                  Posted on {format(new Date(post.date), 'MMMM d, yyyy')} by {post.author}
                </p>
              </header>

              {post.imageUrl && (
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={1200}
                  height={600}
                  className="rounded-lg object-cover aspect-[2/1] w-full mb-8"
                />
              )}

              <div
                className="prose dark:prose-invert prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

            </article>
          </main>

          <footer className="mt-12">
            <Link href={`/${params.lang}/blog`}>
                <span className="inline-flex items-center text-accent hover:underline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                </span>
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
}
