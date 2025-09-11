"use server"

import { z } from "zod"

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

  // Here you would typically send an email, save to a database, etc.
  // For now, we'll just log it to the console.
  console.log("New contact form submission:", validatedFields.data)

  return {
    message: "Your message has been sent successfully!",
    success: true,
  }
}
