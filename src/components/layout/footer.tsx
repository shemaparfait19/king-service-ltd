import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const SiteFooter = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-headline">
              KSTech Solutions
            </h3>
            <p className="text-sm text-primary-foreground/80">
              KING SERVICE TECH LTD (KST) solves electronics and IT service gaps
              in Eastern Province (Bugesera) and nationwide.
            </p>
            <p className="text-sm text-primary-foreground/80">
              CEO: HABIMANA Celestin
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-headline">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services"
                  className="hover:text-accent transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="hover:text-accent transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-accent transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-accent transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-accent transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-headline">
              Contact Info
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Address: V34R+P56, RN15, Nyamata, Bugesera</li>
              <li>
                Primary:{" "}
                <a
                  href="tel:+250787649480"
                  className="hover:text-accent transition-colors"
                >
                  +250 787 649 480
                </a>
              </li>
              <li>
                Secondary:{" "}
                <a
                  href="tel:+250798701852"
                  className="hover:text-accent transition-colors"
                >
                  +250 798 701 852
                </a>
              </li>
              <li>
                Email:{" "}
                <a
                  href="mailto:kstrwanda@gmail.com"
                  className="hover:text-accent transition-colors"
                >
                  kstrwanda@gmail.com
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-headline">Follow Us</h4>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/kingservicetech/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-6 w-6 hover:text-accent transition-colors" />
              </Link>
              <Link
                href="https://rw.linkedin.com/in/celestin-habimana-66427b286"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-6 w-6 hover:text-accent transition-colors" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-sm text-primary-foreground/60">
          <p>
            &copy; {new Date().getFullYear()} KING SERVICE TECH LTD. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
