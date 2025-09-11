import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

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
import { blogPosts } from '@/lib/data';


export async function generateStaticParams() {
    return blogPosts.map((post) => ({
      slug: post.slug,
    }));
  }

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

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
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/blog">Blog</Link>
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
                  Posted on {post.date} by {post.author}
                </p>
              </header>

              {post.image && (
                <Image
                  src={post.image.imageUrl}
                  alt={post.title}
                  width={1200}
                  height={600}
                  className="rounded-lg object-cover aspect-[2/1] w-full mb-8"
                  data-ai-hint={post.image.imageHint}
                />
              )}

              <div
                className="prose dark:prose-invert prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

            </article>
          </main>

          <footer className="mt-12">
            <Link href="/blog">
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
