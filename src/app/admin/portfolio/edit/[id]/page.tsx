import { notFound } from 'next/navigation';
import { EditProjectForm } from './edit-project-form';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { PortfolioProject } from '@/lib/definitions';

export default async function EditPortfolioProjectPage({ params }: { params: { id: string } }) {
  const projectDoc = await getDoc(doc(db, "portfolioProjects", params.id));

  if (!projectDoc.exists()) {
    notFound();
  }

  const project = {
    id: projectDoc.id,
    ...projectDoc.data(),
  } as PortfolioProject;

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
