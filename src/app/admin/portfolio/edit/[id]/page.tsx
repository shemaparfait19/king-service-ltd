import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { EditProjectForm } from './edit-project-form';

export default async function EditPortfolioProjectPage({ params }: { params: { id: string } }) {
  const projectId = parseInt(params.id);
  if (isNaN(projectId)) {
    notFound();
  }

  const project = await prisma.portfolioProject.findUnique({
    where: { id: projectId }
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-secondary/50 flex-grow">
      <div className="container py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-headline">Edit Portfolio Project</h1>
          <p className="text-muted-foreground mt-2">Make changes to "{project.title}"</p>
        </header>

        <main>
          <EditProjectForm project={project} />
        </main>
      </div>
    </div>
  );
}
