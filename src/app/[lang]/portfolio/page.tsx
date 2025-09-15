import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
};

async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const portfolioRef = collection(db, "portfolioProjects");
    const snapshot = await getDocs(portfolioRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PortfolioProject[];
  } catch (e) {
    return [];
  }
}

export default async function PortfolioPage() {
  const portfolioProjects = await getPortfolioProjects();

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
        {portfolioProjects.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden group hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="p-0">
              <div className="aspect-[4/3] relative overflow-hidden">
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <Badge variant="outline" className="mb-3">
                {project.category || "Project"}
              </Badge>
              <h3 className="text-xl font-bold font-headline mb-2">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {project.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
