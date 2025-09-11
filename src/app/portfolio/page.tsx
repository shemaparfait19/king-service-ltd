import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { portfolioProjects } from '@/lib/data';

export default function PortfolioPage() {
  const projects = portfolioProjects;

  return (
     <div className="bg-background">
      <div className="container py-12 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Our Portfolio</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A selection of projects that showcase our expertise, commitment to quality, and diverse capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden group">
                {project.image && (
                  <div className="overflow-hidden">
                    <Image
                      src={project.image.imageUrl}
                      alt={project.title}
                      width={700}
                      height={500}
                      className="object-cover w-full aspect-[4/3] group-hover:scale-105 transition-transform duration-300"
                      data-ai-hint={project.image.imageHint}
                    />
                  </div>
                )}
                <CardHeader>
                    <Badge variant="secondary" className="w-fit">{project.category}</Badge>
                </CardHeader>
                <CardContent>
                    <h3 className="text-xl font-bold font-headline mb-2">{project.title}</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
