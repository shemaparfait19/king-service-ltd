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
import { useTransition } from 'react';
import { createPortfolioProject } from '@/lib/actions';

const projectSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  category: z.string().min(3, 'Category must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  imageUrl: z.string().url('Must be a valid image URL').optional().or(z.literal('')),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function NewPortfolioProjectPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      category: '',
      description: '',
      imageUrl: '',
    },
  });

  const onSubmit: SubmitHandler<ProjectFormValues> = (data) => {
    startTransition(async () => {
        await createPortfolioProject(data);
        router.push('/admin/portfolio');
    });
  };

  return (
    <div className="bg-secondary/50 flex-grow">
      <div className="container py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-headline">New Portfolio Project</h1>
          <p className="text-muted-foreground mt-2">Add a new project to showcase your work.</p>
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
                  <Input id="category" {...register('category')} placeholder="e.g., Solar Systems, CCTV & Internet" />
                  {errors.category && <p className="text-destructive text-sm">{errors.category.message}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" {...register('description')} rows={5} />
                  {errors.description && <p className="text-destructive text-sm">{errors.description.message}</p>}
                </div>

                 <div className="grid gap-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input id="imageUrl" {...register('imageUrl')} placeholder="https://..."/>
                  {errors.imageUrl && <p className="text-destructive text-sm">{errors.imageUrl.message}</p>}
                   <p className="text-xs text-muted-foreground">For now, please use an image URL from a service like picsum.photos.</p>
                </div>


                <div className="flex justify-end gap-4 mt-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                  <Button type="submit" disabled={isPending}>{isPending ? 'Creating...' : 'Create Project'}</Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </main>
      </div>
    </div>
  );
}
