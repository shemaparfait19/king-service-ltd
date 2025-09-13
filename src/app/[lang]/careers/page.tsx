import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, Users, Lightbulb } from "lucide-react";

export default function CareersPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
          Join Our Team
        </h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          Be part of a dynamic team that's shaping the future of technical
          services in Rwanda
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
              <Briefcase className="h-8 w-8 text-accent-foreground" />
            </div>
            <CardTitle>Full-Time Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Join our team of skilled technicians and engineers in full-time
              positions with competitive benefits.
            </p>
            <Button className="w-full">View Open Positions</Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
              <GraduationCap className="h-8 w-8 text-accent-foreground" />
            </div>
            <CardTitle>Internships</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Gain hands-on experience and develop your skills through our
              comprehensive internship program.
            </p>
            <Button variant="outline" className="w-full">
              Apply for Internship
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-accent-foreground" />
            </div>
            <CardTitle>Training Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Enhance your technical skills with our specialized training
              programs and certifications.
            </p>
            <Button variant="outline" className="w-full">
              Explore Training
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-secondary rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold font-headline mb-4">
          Why Work With Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <Lightbulb className="h-8 w-8 text-accent mx-auto mb-2" />
            <h3 className="font-semibold mb-2">Innovation</h3>
            <p className="text-sm text-muted-foreground">
              Work with cutting-edge technology
            </p>
          </div>
          <div>
            <Users className="h-8 w-8 text-accent mx-auto mb-2" />
            <h3 className="font-semibold mb-2">Team Environment</h3>
            <p className="text-sm text-muted-foreground">
              Collaborative and supportive culture
            </p>
          </div>
          <div>
            <GraduationCap className="h-8 w-8 text-accent mx-auto mb-2" />
            <h3 className="font-semibold mb-2">Growth</h3>
            <p className="text-sm text-muted-foreground">
              Continuous learning opportunities
            </p>
          </div>
          <div>
            <Briefcase className="h-8 w-8 text-accent mx-auto mb-2" />
            <h3 className="font-semibold mb-2">Impact</h3>
            <p className="text-sm text-muted-foreground">
              Make a difference in your community
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
