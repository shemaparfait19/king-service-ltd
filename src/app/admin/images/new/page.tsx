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

const imageSchema = z.object({
  id: z.string().min(3, 'ID must be at least 3 characters (e.g., hero-4)'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  imageHint: z.string().min(3, 'Hint must be at least 3 characters'),
});

type ImageFormValues = z.infer<typeof imageSchema>;

export default function NewImagePage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ImageFormValues>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      id: '',
      description: '',
      imageHint: '',
    },
  });

  const onSubmit: SubmitHandler<ImageFormValues> = (data) => {
    console.log('New Image Data:', data);
    // Here you would typically call an API to upload the image and update your data source (e.g., placeholder-images.json)
    router.push('/admin/images');
  };

  return (
    <div className="bg-secondary/50 flex-grow">
      <div className="container py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-headline">Upload New Image</h1>
          <p className="text-muted-foreground mt-2">Add a new image to the site library.</p>
        </header>

        <main>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardContent className="p-6 grid gap-6 md:grid-cols-2">
                
                <div className="space-y-6">
                    <div className="grid gap-2">
                    <Label htmlFor="id">Image ID</Label>
                    <Input id="id" {...register('id')} placeholder="e.g., hero-4 or client-logo-1" />
                    {errors.id && <p className="text-destructive text-sm">{errors.id.message}</p>}
                    <p className="text-xs text-muted-foreground">A unique identifier. Use "hero-" prefix for landing page slider images.</p>
                    </div>

                    <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" {...register('description')} rows={3} placeholder="A short description of the image for alt text."/>
                    {errors.description && <p className="text-destructive text-sm">{errors.description.message}</p>}
                    </div>
                    
                     <div className="grid gap-2">
                        <Label htmlFor="imageHint">AI Hint</Label>
                        <Input id="imageHint" {...register('imageHint')} placeholder="e.g., 'technician fixing'" />
                        {errors.imageHint && <p className="text-destructive text-sm">{errors.imageHint.message}</p>}
                        <p className="text-xs text-muted-foreground">One or two keywords for AI-powered image replacement in the future.</p>
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="image">Image File</Label>
                    <div className="flex items-center justify-center w-full">
                        <Label
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-muted"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-10 h-10 mb-4 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP</p>
                            </div>
                            <Input id="image-upload" type="file" className="hidden" />
                        </Label>
                    </div> 
                </div>


                <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                  <Button type="submit">Upload Image</Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </main>
      </div>
    </div>
  );
}
