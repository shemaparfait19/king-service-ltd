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
import { services } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Trash, PlusCircle, Upload } from 'lucide-react';
import Image from 'next/image';

const serviceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  short_desc: z.string().min(10, 'Short description must be at least 10 characters'),
  long_desc: z.string().min(20, 'Long description must be at least 20 characters'),
  details: z.array(z.object({ value: z.string().min(1, 'Detail cannot be empty')})).min(1, 'At least one detail is required'),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

export default function EditServicePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const service = services.find(s => s.id === parseInt(params.id));

  if (!service) {
    notFound();
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
        title: service.title,
        short_desc: service.short_desc,
        long_desc: service.long_desc,
        details: service.details.map(d => ({ value: d }))
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details"
  });

  const onSubmit: SubmitHandler<ServiceFormValues> = (data) => {
    console.log('Updated Service:', data);
    // Here you would typically call an API to update the service and handle image uploads/deletions
    router.push('/admin/services');
  };

  return (
    <div className="bg-secondary/50 flex-grow">
      <div className="container py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-headline">Edit Service</h1>
          <p className="text-muted-foreground mt-2">Make changes to the "{service.title}" service.</p>
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

                <div className="grid gap-4">
                    <Label>Current Images</Label>
                    <div className="flex flex-wrap gap-4">
                        {service.gallery.length > 0 ? service.gallery.map(image => (
                            <div key={image.id} className="relative">
                                <Image src={image.imageUrl} alt={image.imageHint} width={150} height={100} className="rounded-md object-cover" />
                                <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6">
                                    <Trash className="h-3 w-3" />
                                </Button>
                            </div>
                        )) : <p className="text-sm text-muted-foreground">No images uploaded for this service.</p>}
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="images">Upload New Images</Label>
                     <div className="flex items-center justify-center w-full">
                        <Label
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-muted"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">
                                    <span className="font-semibold">Click or drag</span> to upload
                                </p>
                            </div>
                            <Input id="image-upload" type="file" multiple className="hidden" />
                        </Label>
                    </div> 
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