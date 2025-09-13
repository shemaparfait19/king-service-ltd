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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { BlogPost } from '@/lib/definitions';
import { useTransition } from 'react';
import { updateBlogPost } from '@/lib/actions';

const postSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  status: z.enum(['Draft', 'Published']),
});

type PostFormValues = z.infer<typeof postSchema>;

export function EditPostForm({ post }: { post: BlogPost }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
        title: post.title,
        content: post.content,
        status: post.status as 'Draft' | 'Published'
    },
  });

  const onSubmit: SubmitHandler<PostFormValues> = (data) => {
    startTransition(async () => {
        await updateBlogPost(post.id, data);
        router.push('/admin/announcements');
    });
  };

  return (
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
             <Select onValueChange={(value: "Draft" | "Published") => setValue('status', value)} defaultValue={post.status}>
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
            <Button type="submit" disabled={isPending}>{isPending ? 'Saving...' : 'Save Changes'}</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
