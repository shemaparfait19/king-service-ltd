"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images'; // Using placeholder
import { notFound } from 'next/navigation';

const projectSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  category: z.string().min(3, 'Category must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

// Placeholder data
const projects = [
    {
      id: 1,
      title: 'Commercial Complex Security & Network Overhaul',
      category: 'CCTV & Internet',
      description: 'Designed and deployed a state-of-the-art surveillance system with over 50 IP cameras and a robust, building-wide mesh WiFi network for a multi-tenant commercial building in Nyamata.',
      image: PlaceHolderImages.find(p => p.id === 'portfolio-1'),
    },
    {
      id: 2,
      title: 'Residential Solar Power Implementation',
      category: 'Solar Systems',
      description: 'Installed a complete 5kW off-grid solar system for a rural household, including panels, battery storage, and inverter, providing reliable, 24/7 electricity.',
      image: PlaceHolderImages.find(p => p.id === 'service-solar'),
    },
    {
      id: 3,
      title: 'Industrial Machine Control Panel Repair',
      category: 'Industrial Electronics',
      description: 'Successfully diagnosed and repaired a critical failure in a PLC control panel for a local manufacturing plant, restoring production within 24 hours and preventing costly downtime.',
      image: PlaceHolderImages.find(p => p.id === 'hero-2'),
    },
];


export default function EditPortfolioProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const project = projects.find(p => p.id === parseInt(params.id));

  if (!project) {
    notFound();
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
        title: project.title,
        category: project.category,
        description: project.description
    }
  });

  const onSubmit: SubmitHandler<ProjectFormValues> = (data) => {
    console.log('Updated Project:', data);
    // API call to update project
    router.push('/admin/portfolio');
  };

  return (
    <div className="bg-secondary/50 flex-grow">
      <div className="container py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-headline">Edit Portfolio Project</h1>
          <p className="text-muted-foreground mt-2">Make changes to "{project.title}"</p>
        </header>

        <main>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardContent className="p-6 grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input id="title" {...register('title')} />
                  {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" {...register('category')} />
                  {errors.category && <p className="text-destructive text-sm">{errors.category.message}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" {...register('description')} rows={5} />
                  {errors.description && <p className="text-destructive text-sm">{errors.description.message}</p>}
                </div>

                <div className="grid gap-4">
                    <Label>Current Image</Label>
                    {project.image && (
                        <Image src={project.image.imageUrl} alt={project.title} width={200} height={150} className="rounded-md object-cover" />
                    )}
                    <Label htmlFor="image-upload" className="text-sm font-normal">Change Image</Label>
                     <Input id="image-upload" type="file" />
                </div>


                <div className="flex justify-end gap-4 mt-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </main>
      </div>
    </div>
  );
}
