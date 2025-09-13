
"use client";

import { useState, useTransition } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Loader2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';


const imageSchema = z.object({
  id: z.string().min(3, 'ID must be at least 3 characters (e.g., hero-4)'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  imageHint: z.string().min(3, 'Hint must be at least 3 characters'),
  imageFile: z.instanceof(FileList).refine(files => files.length > 0, 'Image is required.'),
});

type ImageFormValues = z.infer<typeof imageSchema>;

export default function NewImagePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ImageFormValues>({
    resolver: zodResolver(imageSchema)
  });

  const onSubmit: SubmitHandler<ImageFormValues> = (data) => {
    startTransition(async () => {
      const file = data.imageFile[0];
      if (!file) return;

      const storageRef = ref(storage, `site-images/${data.id}-${file.name}`);
      
      try {
        // 1. Upload the file
        const snapshot = await uploadBytes(storageRef, file);
        
        // 2. Get the download URL
        const imageUrl = await getDownloadURL(snapshot.ref);

        // 3. This part is tricky as we can't write to the local filesystem from the browser.
        // The best approach is to store this mutable data in Firestore as well.
        // For now, let's just log the data and show a success message.
        // In a real app, we would update a 'site_images' collection in Firestore.

        console.log({
          id: data.id,
          description: data.description,
          imageUrl: imageUrl,
          imageHint: data.imageHint,
        });

        toast({
          title: "Image Uploaded!",
          description: "The image has been uploaded to Firebase Storage. We will add logic to save its URL to the database next.",
        });

        router.push('/admin/images');

      } catch (error) {
        console.error("Image upload failed:", error);
        toast({
          variant: 'destructive',
          title: "Upload Failed",
          description: "There was an error uploading your image.",
        });
      }
    });
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
                    <Label htmlFor="imageFile">Image File</Label>
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
                            <Input id="image-upload" type="file" className="hidden" {...register('imageFile')} />
                        </Label>
                    </div> 
                    {errors.imageFile && <p className="text-destructive text-sm">{errors.imageFile.message}</p>}
                </div>


                <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</> : "Upload Image"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </main>
      </div>
    </div>
  );
}
