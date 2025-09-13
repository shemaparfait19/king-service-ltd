
"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { db } from "./firebase"
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where, limit, writeBatch } from "firebase/firestore";
import type { Service, BlogPost, PortfolioProject } from "./definitions";


const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
})

export type ContactFormState = {
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    phone?: string[]
    message?: string[]
  }
  success: boolean
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  })

  if (!validatedFields.success) {
    return {
      message: "Failed to send message. Please check your input.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  try {
    await addDoc(collection(db, "contactSubmissions"), {
      ...validatedFields.data,
      submittedAt: new Date(),
    });
    return {
      message: "Your message has been sent successfully!",
      success: true,
    }
  } catch (error) {
    console.error("Firestore submission error:", error);
    return {
      message: "An internal error occurred. Please try again later.",
      success: false,
    }
  }
}

// --- Search Action ---
export type SearchResultItem = {
  title: string;
  href: string;
  excerpt?: string;
};

export type SearchResultGroup = {
  group: string;
  items: SearchResultItem[];
};

export async function searchSite(searchQuery: string): Promise<SearchResultGroup[]> {
  if (searchQuery.length < 3) return [];
  const lowerCaseQuery = searchQuery.toLowerCase();

  try {
    const servicesRef = collection(db, 'services');
    const blogPostsRef = collection(db, 'blogPosts');
    const portfolioProjectsRef = collection(db, 'portfolioProjects');

    const [servicesSnapshot, blogPostsSnapshot, portfolioProjectsSnapshot] = await Promise.all([
      getDocs(servicesRef),
      getDocs(blogPostsRef),
      getDocs(portfolioProjectsRef),
    ]);
    
    const services = servicesSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as Service))
        .filter(s => s.title.toLowerCase().includes(lowerCaseQuery) || s.short_desc.toLowerCase().includes(lowerCaseQuery))
        .slice(0, 5);

    const blogPosts = blogPostsSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as BlogPost))
        .filter(p => p.status === 'Published' && (p.title.toLowerCase().includes(lowerCaseQuery) || p.content.toLowerCase().includes(lowerCaseQuery)))
        .slice(0, 5);
    
    const portfolioProjects = portfolioProjectsSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as PortfolioProject))
        .filter(p => p.title.toLowerCase().includes(lowerCaseQuery) || p.description.toLowerCase().includes(lowerCaseQuery))
        .slice(0, 5);

    const results: SearchResultGroup[] = [];

    if (services.length > 0) {
      results.push({
        group: 'Services',
        items: services.map(s => ({
          title: s.title,
          href: `/services/${s.slug}`,
          excerpt: s.short_desc,
        })),
      });
    }

    if (blogPosts.length > 0) {
      results.push({
        group: 'Announcements',
        items: blogPosts.map(p => ({
          title: p.title,
          href: `/blog/${p.slug}`,
          excerpt: p.excerpt,
        })),
      });
    }

    if (portfolioProjects.length > 0) {
      results.push({
        group: 'Portfolio Projects',
        items: portfolioProjects.map(p => ({
          title: p.title,
          href: '/portfolio',
          excerpt: p.description,
        })),
      });
    }

    return results;
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
}


// --- Admin Actions ---

// BlogPost Actions
export async function createBlogPost(data: { title: string; content: string; status: 'Draft' | 'Published' }) {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const excerpt = data.content.substring(0, 150) + (data.content.length > 150 ? '...' : '');
    
    await addDoc(collection(db, "blogPosts"), {
        ...data,
        slug,
        excerpt,
        author: 'Admin', // Default author
        category: 'General', // Default category
        date: new Date(),
    });
    revalidatePath('/admin/announcements');
    revalidatePath('/blog');
}

export async function updateBlogPost(id: string, data: { title: string; content: string; status: 'Draft' | 'Published' }) {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const excerpt = data.content.substring(0, 150) + (data.content.length > 150 ? '...' : '');

    const postRef = doc(db, "blogPosts", id);
    await updateDoc(postRef, {
        ...data,
        slug,
        excerpt,
    });
    revalidatePath(`/admin/announcements`);
    revalidatePath(`/admin/announcements/edit/${id}`);
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
}

export async function deleteBlogPost(id: string) {
    await deleteDoc(doc(db, "blogPosts", id));
    revalidatePath('/admin/announcements');
    revalidatePath('/blog');
}


// Portfolio Actions
export async function createPortfolioProject(data: { title: string; category: string; description: string, imageUrl?: string }) {
    await addDoc(collection(db, "portfolioProjects"), data);
    revalidatePath('/admin/portfolio');
    revalidatePath('/portfolio');
}

export async function updatePortfolioProject(id: string, data: { title: string; category: string; description: string, imageUrl?: string }) {
    const projectRef = doc(db, "portfolioProjects", id);
    await updateDoc(projectRef, data);
    revalidatePath('/admin/portfolio');
    revalidatePath(`/admin/portfolio/edit/${id}`);
    revalidatePath('/portfolio');
}

export async function deletePortfolioProject(id: string) {
    await deleteDoc(doc(db, "portfolioProjects", id));
    revalidatePath('/admin/portfolio');
    revalidatePath('/portfolio');
}

// Service Actions
export async function createService(data: { title: string; slug: string; short_desc: string; long_desc: string; details: string[] }) {
    await addDoc(collection(db, "services"), data);
    revalidatePath('/admin/services');
    revalidatePath('/services');
}

export async function updateService(id: string, data: { title: string; short_desc: string; long_desc: string; details: string[] }) {
    const serviceRef = doc(db, "services", id);
    await updateDoc(serviceRef, data);
    revalidatePath('/admin/services');
    revalidatePath(`/admin/services/edit/${id}`);
    revalidatePath('/services');
}

export async function deleteService(id: string) {
    await deleteDoc(doc(db, "services", id));
    revalidatePath('/admin/services');
    revalidatePath('/services');
}
