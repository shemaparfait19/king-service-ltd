import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function PortfolioPage() {
  const portfolioImages = PlaceHolderImages.filter((p) =>
    p.id.startsWith("portfolio-")
  );

  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
          Our Portfolio
        </h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          Explore our successful projects and see the quality of our work
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioImages.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden group hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="p-0">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.description}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <Badge variant="outline" className="mb-3">
                Featured Project
              </Badge>
              <h3 className="text-xl font-bold font-headline mb-2">
                {project.description}
              </h3>
              <p className="text-muted-foreground text-sm">
                {project.imageHint}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
