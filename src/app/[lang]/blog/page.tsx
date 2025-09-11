import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: '5 Signs Your Refrigerator Needs a Repair',
      slug: '5-signs-refrigerator-repair',
      excerpt: 'Is your fridge making strange noises? Food not staying cold? It might be time for a check-up. Learn the key warning signs to look out for to prevent a major appliance meltdown.',
      date: 'July 15, 2024',
      author: 'Admin',
      image: PlaceHolderImages.find(p => p.id === 'service-fridge'),
    },
    {
      id: 2,
      title: 'The Benefits of a Professionally Installed CCTV System',
      slug: 'benefits-cctv-system',
      excerpt: 'Home and business security is more important than ever. Discover the advantages of a professional CCTV installation, from remote monitoring to deterring potential intruders.',
      date: 'July 10, 2024',
      author: 'Admin',
      image: PlaceHolderImages.find(p => p.id === 'service-cctv'),
    },
    {
      id: 3,
      title: 'Getting Started with Solar Power for Your Home',
      slug: 'getting-started-solar-power',
      excerpt: 'Thinking about making the switch to solar? This guide breaks down the basics of residential solar systems, including panel types, battery storage, and potential savings.',
      date: 'July 5, 2024',
      author: 'Admin',
      image: PlaceHolderImages.find(p => p.id === 'service-solar'),
    },
  ];

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
              {post.image && (
                <CardHeader className="p-0">
                  <Image
                    src={post.image.imageUrl}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="object-cover rounded-t-lg aspect-[3/2]"
                    data-ai-hint={post.image.imageHint}
                  />
                </CardHeader>
              )}
              <CardContent className="pt-6 flex-grow">
                <CardTitle className="text-xl font-headline hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  {post.date} by {post.author}
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
