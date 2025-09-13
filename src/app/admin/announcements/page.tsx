"use client";

import { useState, useEffect, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { format } from "date-fns";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { BlogPost } from "@/lib/definitions";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AdminAnnouncementsPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    async function getBlogPosts() {
      setIsLoading(true);
      const postsCollection = collection(db, "blogPosts");
      const postsSnapshot = await getDocs(postsCollection);
      const postList = postsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.date.toDate(),
        } as BlogPost;
      });

      // Sort by date on the client side
      const sortedPosts = postList.sort(
        (a, b) => b.date.getTime() - a.date.getTime()
      );
      setBlogPosts(sortedPosts);
      setIsLoading(false);
    }
    getBlogPosts();
  }, []);

  const handleTogglePublish = (post: BlogPost) => {
    startTransition(async () => {
      const newStatus = post.status === "Published" ? "Draft" : "Published";
      try {
        const postRef = doc(db, "blogPosts", post.id);
        await updateDoc(postRef, { status: newStatus });

        setBlogPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === post.id ? { ...p, status: newStatus } : p
          )
        );

        toast({
          title: "Success!",
          description: `Post has been ${newStatus.toLowerCase()}.`,
        });
      } catch (error) {
        console.error("Error updating status: ", error);
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Failed to update post status.",
        });
      }
    });
  };

  const handleDeletePost = () => {
    if (!postToDelete) return;

    startTransition(async () => {
      try {
        await deleteDoc(doc(db, "blogPosts", postToDelete.id));
        setBlogPosts((prevPosts) =>
          prevPosts.filter((p) => p.id !== postToDelete.id)
        );
        toast({
          title: "Success!",
          description: "Post has been deleted.",
        });
      } catch (error) {
        console.error("Error deleting post: ", error);
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Failed to delete post.",
        });
      } finally {
        setPostToDelete(null);
      }
    });
  };

  return (
    <div className="bg-secondary/50 flex-grow">
      <div className="container py-12">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-headline">
              Manage Announcements
            </h1>
            <p className="text-muted-foreground mt-2">
              Create, edit, and publish news and blog posts.
            </p>
          </div>
          <Link href="/admin/announcements/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </Link>
        </header>

        <main>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="w-24 hidden sm:table-cell">
                      Status
                    </TableHead>
                    <TableHead className="hidden md:table-cell w-40">
                      Date
                    </TableHead>
                    <TableHead className="w-24 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center h-24">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                      </TableCell>
                    </TableRow>
                  ) : (
                    blogPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">
                          {post.title}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge
                            variant={
                              post.status === "Published"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {post.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">
                          {format(new Date(post.date), "MMMM d, yyyy")}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/admin/announcements/edit/${post.id}`}
                                >
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onSelect={() => handleTogglePublish(post)}
                                disabled={isPending}
                              >
                                {post.status === "Published"
                                  ? "Unpublish"
                                  : "Publish"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onSelect={() => setPostToDelete(post)}
                                className="text-destructive"
                                disabled={isPending}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>

        <AlertDialog
          open={!!postToDelete}
          onOpenChange={(open) => !open && setPostToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                post "{postToDelete?.title}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeletePost}
                className="bg-destructive hover:bg-destructive/90"
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
