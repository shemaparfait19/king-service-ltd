import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CareersPage() {
  const jobOpenings = [
    {
      title: 'Senior Electronics Technician',
      location: 'Nyamata, Bugesera',
      type: 'Full-time',
      description: 'Seeking an experienced technician with 5+ years of experience in diagnosing and repairing a wide range of consumer and industrial electronics. Proficiency in soldering and component-level repair is a must.'
    },
    {
      title: 'IT & Network Support Specialist',
      location: 'Nyamata, Bugesera',
      type: 'Full-time',
      description: 'Responsible for installing and maintaining network infrastructure, including WiFi, CCTV, and IoT systems for our clients. CCNA or equivalent certification is a plus.'
    },
    {
      title: 'Customer Service Representative',
      location: 'Nyamata, Bugesera',
      type: 'Part-time',
      description: 'The first point of contact for our clients. Excellent communication skills and a passion for helping people are required. Technical knowledge is beneficial but not mandatory.'
    },
  ];

  return (
    <div className="bg-secondary/50">
      <div className="container py-12 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Join Our Team</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            We are passionate about technology and dedicated to providing exceptional service. If you share our vision, we'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-bold font-headline border-b pb-4">Current Openings</h2>
            {jobOpenings.map(job => (
              <Card key={job.title}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4 pt-2">
                    <span className="flex items-center gap-2"><Briefcase className="h-4 w-4" />{job.type}</span>
                    <span className="flex items-center gap-2"><MapPin className="h-4 w-4" />{job.location}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{job.description}</p>
                </CardContent>
                <CardFooter>
                   <Link href="/contact">
                      <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                   </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
             <Card className="bg-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <GraduationCap /> Internships
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our internship program is designed to provide aspiring technicians with valuable hands-on experience. Work alongside our experts on real projects.
                </p>
              </CardContent>
               <CardFooter>
                  <Link href="/contact?subject=Internship+Application">
                    <Button variant="outline">Inquire About Internships</Button>
                  </Link>
              </CardFooter>
            </Card>
             <Card className="bg-background">
              <CardHeader>
                <CardTitle className="font-headline">Why KSTech?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <p><strong>Professional Growth:</strong> We invest in our team's skills and development.</p>
                  <p><strong>Innovative Projects:</strong> Work on a diverse range of exciting and challenging projects.</p>
                  <p><strong>Positive Impact:</strong> Be part of a company that's driving technological growth in the community.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
