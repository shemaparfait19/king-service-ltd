
"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { db } from "./firebase"
import { collection, getDocs, addDoc } from "firebase/firestore";
import type { Service, BlogPost, PortfolioProject } from "./definitions";

// This server action is now only used on the non-admin contact form.
// All admin-related database operations have been moved to client-side components
// to ensure they run with the logged-in user's permissions.

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
