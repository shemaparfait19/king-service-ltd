import { ContactForm } from "@/components/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-secondary">
      <div className="container py-12 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Get In Touch</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Have a question or need a quote? Fill out the form below or reach out to us through one of our contact channels. We're here to help!
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ContactForm 
              title="Send Us a Message"
              description="We typically respond within 24 hours."
            />
          </div>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold font-headline text-lg">Contact Information</h3>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <p className="font-semibold">Our Office</p>
                    <p className="text-muted-foreground">V34R+P56, RN15, Nyamata, Bugesera, Rwanda</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <p className="font-semibold">Phone Lines</p>
                    <a href="tel:+250787649480" className="text-muted-foreground hover:text-primary block">+250 787 649 480 (WhatsApp)</a>
                    <a href="tel:+250798701852" className="text-muted-foreground hover:text-primary block">+250 798 701 852</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <a href="mailto:kstrwanda@gmail.com" className="text-muted-foreground hover:text-primary">kstrwanda@gmail.com</a>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.03714886858!2d30.09018867584167!3d-2.059283937397223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c354728481491d%3A0xe844783354316823!2sKING%20SERVICE%20TECH!5e0!3m2!1sen!2sde!4v1716312480302!5m2!1sen!2sde"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="KSTech Location"
                  className="rounded-lg"
                ></iframe>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
