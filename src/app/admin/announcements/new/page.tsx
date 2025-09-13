"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransition } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  status: z.enum(["Draft", "Published"]),
});

type PostFormValues = z.infer<typeof postSchema>;

export default function NewAnnouncementPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      status: "Draft",
    },
  });

  const onSubmit: SubmitHandler<PostFormValues> = (data) => {
    startTransition(async () => {
      try {
        const slug = data.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        const excerpt =
          data.content.substring(0, 150) +
          (data.content.length > 150 ? "..." : "");

        await addDoc(collection(db, "blogPosts"), {
          ...data,
          slug,
          excerpt,
          author: "Admin", // Default author
          category: "Announcement", // Default category for announcements
          date: new Date(),
        });

        toast({
          title: "Success!",
          description: "Blog post created successfully.",
        });
        router.push("/admin/announcements");
      } catch (error) {
        console.error("Error creating post: ", error);
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Failed to create blog post.",
        });
      }
    });
  };

  return (
    <div className="bg-secondary/50 flex-grow">
      <div className="container py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-headline">New Post</h1>
          <p className="text-muted-foreground mt-2">
            Create a new announcement or blog post.
          </p>
        </header>

        <main>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardContent className="p-6 grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" {...register("title")} />
                  {errors.title && (
                    <p className="text-destructive text-sm">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" {...register("content")} rows={10} />
                  {errors.content && (
                    <p className="text-destructive text-sm">
                      {errors.content.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    onValueChange={(value: "Draft" | "Published") =>
                      setValue("status", value)
                    }
                    defaultValue="Draft"
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="text-destructive text-sm">
                      {errors.status.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Creating..." : "Create Post"}
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
