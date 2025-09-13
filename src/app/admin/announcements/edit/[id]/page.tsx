import { notFound } from 'next/navigation';
import { EditPostForm } from './edit-post-form';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { BlogPost } from '@/lib/definitions';


export default async function EditAnnouncementPage({ params }: { params: { id: string } }) {
  const postDoc = await getDoc(doc(db, "blogPosts", params.id));

  if (!postDoc.exists()) {
    notFound();
  }

  const postData = postDoc.data();
  const post = {
      id: postDoc.id,
      ...postData,
      date: postData.date.toDate()
  } as BlogPost;


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
