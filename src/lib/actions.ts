"use server"

import { z } from "zod"
import prisma from "./prisma"
import { revalidatePath } from "next/cache"

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

  // In a real app, you'd save this to the database
  console.log("New contact form submission:", validatedFields.data)

  return {
    message: "Your message has been sent successfully!",
    success: true,
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

export async function searchSite(query: string): Promise<SearchResultGroup[]> {
  if (query.length < 3) return [];

  try {
    const [services, blogPosts, portfolioProjects] = await Promise.all([
      prisma.service.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { short_desc: { contains: query, mode: 'insensitive' } },
            { long_desc: { contains: query, mode: 'insensitive' } },
          ],
        },
        take: 5,
      }),
      prisma.blogPost.findMany({
        where: {
          status: 'Published',
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
            { excerpt: { contains: query, mode: 'insensitive' } },
          ],
        },
        take: 5,
      }),
      prisma.portfolioProject.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { category: { contains: query, mode: 'insensitive' } },
          ],
        },
        take: 5,
      }),
    ]);

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
          href: '/portfolio', // Portfolio items don't have individual pages yet
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
    
    await prisma.blogPost.create({
        data: {
            ...data,
            slug,
            excerpt,
            author: 'Admin', // Default author
            category: 'General', // Default category
        }
    });
    revalidatePath('/admin/announcements');
    revalidatePath('/blog');
}

export async function updateBlogPost(id: number, data: { title: string; content: string; status: 'Draft' | 'Published' }) {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const excerpt = data.content.substring(0, 150) + (data.content.length > 150 ? '...' : '');

    await prisma.blogPost.update({
        where: { id },
        data: {
            ...data,
            slug,
            excerpt,
        }
    });
    revalidatePath(`/admin/announcements`);
    revalidatePath(`/admin/announcements/edit/${id}`);
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
}

export async function deleteBlogPost(id: number) {
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath('/admin/announcements');
    revalidatePath('/blog');
}


// Portfolio Actions
export async function createPortfolioProject(data: { title: string; category: string; description: string, imageUrl?: string }) {
    await prisma.portfolioProject.create({ data });
    revalidatePath('/admin/portfolio');
    revalidatePath('/portfolio');
}

export async function updatePortfolioProject(id: number, data: { title: string; category: string; description: string, imageUrl?: string }) {
    await prisma.portfolioProject.update({ where: { id }, data });
    revalidatePath('/admin/portfolio');
    revalidatePath(`/admin/portfolio/edit/${id}`);
    revalidatePath('/portfolio');
}

export async function deletePortfolioProject(id: number) {
    await prisma.portfolioProject.delete({ where: { id } });
    revalidatePath('/admin/portfolio');
    revalidatePath('/portfolio');
}

// Service Actions
export async function createService(data: { title: string; slug: string; short_desc: string; long_desc: string; details: string[] }) {
    await prisma.service.create({ data });
    revalidatePath('/admin/services');
    revalidatePath('/services');
}

export async function updateService(id: number, data: { title: string; short_desc: string; long_desc: string; details: string[] }) {
    await prisma.service.update({ where: { id }, data });
    revalidatePath('/admin/services');
    revalidatePath(`/admin/services/edit/${id}`);
    revalidatePath('/services');
}

export async function deleteService(id: number) {
    await prisma.service.delete({ where: { id } });
    revalidatePath('/admin/services');
    revalidatePath('/services');
}

// Image Actions
export async function createImagePlaceholder(data: { id: string, description: string, imageUrl: string, imageHint: string }) {
    // This is a placeholder as we're not saving to placeholder-images.json anymore
    // In a real scenario, you'd upload the image to a cloud storage and save the URL in the database.
    console.log('Creating image:', data);
    revalidatePath('/admin/images');
}

export async function deleteImagePlaceholder(id: string) {
    console.log('Deleting image:', id);
    revalidatePath('/admin/images');
}
