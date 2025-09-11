"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const postSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  status: z.enum(['Draft', 'Published']),
});

type PostFormValues = z.infer<typeof postSchema>;

// Placeholder data
const existingPost = {
  title: '5 Signs Your Refrigerator Needs a Repair',
  content: 'Is your fridge making strange noises? Food not staying cold? It might be time for a check-up. Learn the key warning signs to look out for to prevent a major appliance meltdown. Regular maintenance can save you from costly repairs down the line. Check your seals, listen for the compressor, and make sure it\'s not running constantly. A little vigilance goes a long way in preserving your appliance.',
  status: 'Published' as 'Published' | 'Draft',
};

export default function EditAnnouncementPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: existingPost,
  });

  const onSubmit: SubmitHandler<PostFormValues> = (data) => {
    console.log('Updated Post:', data);
    // Here you would typically call an API to update the post
    router.push('/admin/announcements');
  };

  return (
    <div className="bg-secondary/50 flex-grow">
      <div className="container py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-headline">Edit Post</h1>
          <p className="text-muted-foreground mt-2">Make changes to your announcement or blog post.</p>
        </header>

        <main>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardContent className="p-6 grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" {...register('title')} />
                  {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" {...register('content')} rows={10} />
                  {errors.content && <p className="text-destructive text-sm">{errors.content.message}</p>}
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                   <Select onValueChange={(value: "Draft" | "Published") => setValue('status', value)} defaultValue={existingPost.status}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && <p className="text-destructive text-sm">{errors.status.message}</p>}
                </div>

                <div className="flex justify-end gap-4">
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
