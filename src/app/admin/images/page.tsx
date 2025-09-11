import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';

export default function AdminImagesPage() {
  // This would come from your database or CMS in a real app
  const heroImages = PlaceHolderImages.filter(p => p.id.startsWith("hero-"));
  const otherImages = PlaceHolderImages.filter(p => !p.id.startsWith("hero-"));

  const imageGroups = [
    { title: "Hero Slider Images", images: heroImages },
    { title: "Other Site Images", images: otherImages },
  ]

  return (
    <div className="bg-secondary/50 flex-grow">
      <div className="container py-12">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-headline">Picture Library</h1>
            <p className="text-muted-foreground mt-2">Manage the images used across your site.</p>
          </div>
          <Link href="/admin/images/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
          </Link>
        </header>

        <main className="space-y-12">
          {imageGroups.map(group => (
            <div key={group.title}>
              <h2 className="text-2xl font-bold font-headline mb-4">{group.title}</h2>
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {group.images.map((image) => (
                      <Card key={image.id} className="group relative">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          width={300}
                          height={200}
                          className="rounded-md object-cover aspect-[3/2]"
                        />
                        <div className="absolute top-1 right-1">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost" className="h-8 w-8 bg-black/50 hover:bg-black/75">
                                <MoreHorizontal className="h-4 w-4 text-white" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>{image.id}</DropdownMenuLabel>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                         <div className="p-2">
                             <p className="text-xs font-semibold truncate">{image.description}</p>
                             <p className="text-xs text-muted-foreground">{image.id}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
