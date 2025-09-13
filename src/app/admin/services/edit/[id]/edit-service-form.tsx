
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
import Image from 'next/image';
import { type Service } from '@/lib/definitions';
import { useTransition } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
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

export function EditServiceForm({ service }: { service: Service }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
        title: service.title,
        short_desc: service.short_desc,
        long_desc: service.long_desc,
        imageUrl: service.imageUrl || '',
        details: service.details.map(d => ({ value: d }))
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details"
  });

  const currentImageUrl = watch('imageUrl');

  const onSubmit: SubmitHandler<ServiceFormValues> = (data) => {
    startTransition(async () => {
        try {
            const serviceData = {
                ...data,
                details: data.details.map(d => d.value)
            }
            const serviceRef = doc(db, "services", service.id);
            await updateDoc(serviceRef, serviceData);
            toast({ title: "Success!", description: "Service updated successfully." });
            router.push('/admin/services');
            router.refresh();
        } catch (error) {
            console.error("Error updating service: ", error);
            toast({ variant: "destructive", title: "Error!", description: "Failed to update service." });
        }
    });
  };

  return (
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

          <div className="grid gap-4">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" {...register('imageUrl')} placeholder="https://..."/>
              {errors.imageUrl && <p className="text-destructive text-sm">{errors.imageUrl.message}</p>}
              {currentImageUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Image Preview:</p>
                  <Image src={currentImageUrl} alt="Image Preview" width={200} height={150} className="rounded-md object-cover" />
                </div>
              )}
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
            <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save Changes"}</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
