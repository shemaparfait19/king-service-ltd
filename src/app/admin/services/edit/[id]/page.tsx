import { notFound } from 'next/navigation';
import { EditServiceForm } from './edit-service-form';
import prisma from '@/lib/prisma';

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const serviceId = parseInt(params.id);
  if (isNaN(serviceId)) {
    notFound();
  }

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-secondary/50 flex-grow">
      <div className="container py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-headline">Edit Service</h1>
          <p className="text-muted-foreground mt-2">Make changes to the "{service.title}" service.</p>
        </header>

        <main>
          <EditServiceForm service={service} />
        </main>
      </div>
    </div>
  );
}
