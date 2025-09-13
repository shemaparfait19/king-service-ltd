import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-xl">
            Get in touch with us for all your technical service needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold font-headline mb-6">
              Get in Touch
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-muted-foreground">+250 787 649 480</p>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">info@kstech.rw</p>
              </div>
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-muted-foreground">
                  Bugesera District
                  <br />
                  Eastern Province, Rwanda
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Business Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Saturday: 8:00 AM - 6:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-headline mb-6">
              Send us a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
