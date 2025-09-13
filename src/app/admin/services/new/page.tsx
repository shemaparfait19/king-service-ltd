
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Trash, PlusCircle } from 'lucide-react';
import { useTransition } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

const serviceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  short_desc: z.string().min(10, 'Short description must be at least 10 characters'),
  long_desc: z.string().min(20, 'Long description must be at least 20 characters'),
  imageUrl: z.string().url('Must be a valid image URL').optional().or(z.literal('')),
  details: z.array(z.object({ value: z.string().min(1, 'Detail cannot be empty')})).min(1, 'At least one detail is required'),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

export default function NewServicePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: '',
      short_desc: '',
      long_desc: '',
      imageUrl: '',
      details: [{ value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details"
  });

  const onSubmit: SubmitHandler<ServiceFormValues> = (data) => {
    startTransition(async () => {
        try {
            const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            const serviceData = {
                ...data,
                slug,
                details: data.details.map(d => d.value)
            }
            await addDoc(collection(db, "services"), serviceData);
            toast({ title: "Success!", description: "Service created successfully." });
            router.push('/admin/services');
        } catch (error) {
            console.error("Error creating service: ", error);
            toast({ variant: "destructive", title: "Error!", description: "Failed to create service." });
        }
    });
  };

  return (
    <div className="bg-secondary/50 flex-grow">
      <div className="container py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-headline">Add New Service</h1>
          <p className="text-muted-foreground mt-2">Fill out the form below to add a new service to your offerings.</p>
        </header>

        <main>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardContent className="p-6 grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">Service Title</Label>
                  <Input id="title" {...register('title')} />
                  {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="short_desc">Short Description</Label>
                  <Input id="short_desc" {...register('short_desc')} />
                  {errors.short_desc && <p className="text-destructive text-sm">{errors.short_desc.message}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="long_desc">Long Description</Label>
                  <Textarea id="long_desc" {...register('long_desc')} rows={5} />
                  {errors.long_desc && <p className="text-destructive text-sm">{errors.long_desc.message}</p>}
                </div>
                
                 <div className="grid gap-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input id="imageUrl" {...register('imageUrl')} placeholder="https://..."/>
                  {errors.imageUrl && <p className="text-destructive text-sm">{errors.imageUrl.message}</p>}
                   <p className="text-xs text-muted-foreground">e.g., https://picsum.photos/seed/my-service/600/400</p>
                </div>

                <div className="grid gap-2">
                    <Label>Service Details / "What's Included"</Label>
                    <div className="grid gap-3">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex items-center gap-2">
                                <Input {...register(`details.${index}.value` as const)} />
                                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}>
                                    <Trash className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        ))}
                    </div>
                     <Button type="button" variant="outline" size="sm" className="mt-2 w-fit" onClick={() => append({value: ""})}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Detail
                    </Button>
                    {errors.details && <p className="text-destructive text-sm">At least one detail is required.</p>}
                </div>

                <div className="flex justify-end gap-4 mt-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                  <Button type="submit" disabled={isPending}>{isPending ? 'Creating...' : 'Create Service'}</Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </main>
      </div>
    </div>
  );
}
