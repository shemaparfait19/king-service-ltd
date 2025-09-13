
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
import Image from 'next/image';
import { type PortfolioProject } from '@/lib/definitions';
import { useTransition } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

const projectSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  category: z.string().min(3, 'Category must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  imageUrl: z.string().url('Must be a valid image URL').optional().or(z.literal('')),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export function EditProjectForm({ project }: { project: PortfolioProject }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
        title: project.title,
        category: project.category,
        description: project.description,
        imageUrl: project.imageUrl || '',
    }
  });

  const currentImageUrl = watch('imageUrl');

  const onSubmit: SubmitHandler<ProjectFormValues> = (data) => {
    startTransition(async () => {
        try {
            const projectRef = doc(db, "portfolioProjects", project.id);
            await updateDoc(projectRef, data);
            toast({ title: "Success!", description: "Portfolio project updated." });
            router.push('/admin/portfolio');
            router.refresh();
        } catch (error) {
            console.error("Error updating project: ", error);
            toast({ variant: "destructive", title: "Error!", description: "Failed to update project." });
        }
    });
  };

  return (
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

          <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
               <Input id="imageUrl" {...register('imageUrl')} />
               {errors.imageUrl && <p className="text-destructive text-sm">{errors.imageUrl.message}</p>}
               {currentImageUrl && (
                <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Image Preview:</p>
                    <Image src={currentImageUrl} alt="Image preview" width={200} height={150} className="rounded-md object-cover" />
                </div>
               )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={isPending}>{isPending ? 'Saving...' : 'Save Changes'}</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
