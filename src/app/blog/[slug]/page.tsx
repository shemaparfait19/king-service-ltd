import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { PlaceHolderImages } from '@/lib/placeholder-images';
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

// This is placeholder data. In a real app, you'd fetch this from a CMS.
const blogPosts = [
  {
    id: 1,
    title: '5 Signs Your Refrigerator Needs a Repair',
    slug: '5-signs-refrigerator-repair',
    excerpt: 'Is your fridge making strange noises? Food not staying cold? It might be time for a check-up.',
    content: `
      <p>Your refrigerator is one of the most important appliances in your home, running 24/7 to keep your food fresh. When it starts to fail, it can be a major inconvenience. Here are five key signs to watch out for that indicate your fridge might need professional repair.</p>
      
      <h3 class="font-headline text-2xl mt-8 mb-4">1. Excessive Condensation</h3>
      <p>A little condensation on the inside of your fridge can be normal, but if you're noticing excessive moisture or "sweating," it could mean the door seals aren't working correctly. This forces your fridge to work harder, increasing energy consumption.</p>

      <h3 class="font-headline text-2xl mt-8 mb-4">2. The Motor is Constantly Running</h3>
      <p>It's normal for a refrigerator's motor to kick on and off. However, if you notice the motor running continuously, it's a sign that the cooling system is struggling to maintain the set temperature. This could be due to a variety of issues, from dirty condenser coils to a faulty thermostat.</p>

      <h3 class="font-headline text-2xl mt-8 mb-4">3. Food is Spoiling Quickly</h3>
      <p>If you find that your milk is souring before its expiration date or vegetables are wilting faster than usual, your refrigerator is likely not cooling properly. This is a critical issue that needs immediate attention to prevent food waste and potential health risks.</p>

      <h3 class="font-headline text-2xl mt-8 mb-4">4. Strange Noises</h3>
      <p>While refrigerators make some noise, loud buzzing, clicking, or rattling sounds are not normal. These could indicate problems with the compressor, fans, or other mechanical parts. Don't ignore these auditory warnings!</p>

      <h3 class="font-headline text-2xl mt-8 mb-4">5. The Freezer is Over-Icing</h3>
      <p>A thick layer of ice in your freezer (especially in a frost-free model) is a red flag. It can be caused by a faulty defrost system, which can lead to temperature inconsistencies and reduce freezer efficiency.</p>

      <p class="mt-8">If you notice any of these signs, it's best to call a professional technician. At KSTech Solutions, we can diagnose and fix the problem quickly and efficiently. <a href="/contact" class="text-accent hover:underline">Contact us today!</a></p>
    `,
    date: 'July 15, 2024',
    author: 'Admin',
    category: 'Appliance Repair',
    image: PlaceHolderImages.find(p => p.id === 'service-fridge'),
  },
  // Add other posts here if they need detailed pages.
];


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
