"use client"

import { useFormState, useFormStatus } from "react-dom"
import { useEffect } from "react"
import { Mail, Phone, User, MessageSquare } from "lucide-react"

import { submitContactForm, type ContactFormState } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? "Sending..." : "Send Message"}
    </Button>
  )
}

export function ContactForm({title, description}: {title: string, description: string}) {
  const initialState: ContactFormState = { message: "", success: false }
  const [state, dispatch] = useFormState(submitContactForm, initialState)
  const { toast } = useToast()

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Success!" : "Error",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      })
    }
  }, [state, toast])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input name="name" placeholder="Your Name" required className="pl-10"/>
            {state.errors?.name && <p className="text-sm text-destructive mt-1">{state.errors.name[0]}</p>}
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input name="email" type="email" placeholder="Your Email" required className="pl-10"/>
            {state.errors?.email && <p className="text-sm text-destructive mt-1">{state.errors.email[0]}</p>}
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input name="phone" type="tel" placeholder="Your Phone (Optional)" className="pl-10"/>
          </div>
          <div className="relative">
             <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Textarea name="message" placeholder="Your Message" required className="pl-10"/>
            {state.errors?.message && <p className="text-sm text-destructive mt-1">{state.errors.message[0]}</p>}
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  )
}
