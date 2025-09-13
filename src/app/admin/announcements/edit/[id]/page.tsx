import { notFound } from 'next/navigation';
import { EditPostForm } from './edit-post-form';
import prisma from '@/lib/prisma';

export default async function EditAnnouncementPage({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id, 10);
  if (isNaN(postId)) {
    notFound();
  }

  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-secondary/50 flex-grow">
      <div className="container py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-headline">Edit Post</h1>
          <p className="text-muted-foreground mt-2">Make changes to your announcement or blog post.</p>
        </header>
        <main>
          <EditPostForm post={post} />
        </main>
      </div>
    </div>
  );
}
