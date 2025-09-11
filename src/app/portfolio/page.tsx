import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: 'Commercial Complex Security & Network Overhaul',
      category: 'CCTV & Internet',
      description: 'Designed and deployed a state-of-the-art surveillance system with over 50 IP cameras and a robust, building-wide mesh WiFi network for a multi-tenant commercial building in Nyamata.',
      image: PlaceHolderImages.find(p => p.id === 'portfolio-1'),
    },
    {
      id: 2,
      title: 'Residential Solar Power Implementation',
      category: 'Solar Systems',
      description: 'Installed a complete 5kW off-grid solar system for a rural household, including panels, battery storage, and inverter, providing reliable, 24/7 electricity.',
      image: PlaceHolderImages.find(p => p.id === 'service-solar'),
    },
    {
      id: 3,
      title: 'Industrial Machine Control Panel Repair',
      category: 'Industrial Electronics',
      description: 'Successfully diagnosed and repaired a critical failure in a PLC control panel for a local manufacturing plant, restoring production within 24 hours and preventing costly downtime.',
      image: PlaceHolderImages.find(p => p.id === 'hero-2'),
    },
     {
      id: 4,
      title: 'Smart Home Automation for Modern Villa',
      category: 'IoT Solutions',
      description: 'Implemented a comprehensive IoT solution including smart lighting, climate control, automated blinds, and security, all controllable via a central mobile app.',
      image: { id: 'smart-home', imageHint: 'smart home app', imageUrl: 'https://picsum.photos/seed/smarthome/700/500' },
    },
    {
      id: 5,
      title: 'Biomedical Equipment Calibration for Clinic',
      category: 'Biomedical Repair',
      description: 'Performed annual calibration and preventive maintenance on diagnostic equipment for a regional health clinic, ensuring accurate readings and patient safety.',
      image: PlaceHolderImages.find(p => p.id === 'service-detail-1'),
    },
    {
      id: 6,
      title: 'Community Center WiFi Hotspot',
      category: 'WiFi Installation',
      description: 'Provided free public WiFi access for a community center by installing a managed, high-capacity wireless network capable of supporting hundreds of simultaneous users.',
      image: PlaceHolderImages.find(p => p.id === 'service-wifi'),
    },
  ];

  return (
     <div className="bg-background">
      <div className="container py-12 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Our Portfolio</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A selection of projects that showcase our expertise, commitment to quality, and diverse capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden group">
                {project.image && (
                  <div className="overflow-hidden">
                    <Image
                      src={project.image.imageUrl}
                      alt={project.title}
                      width={700}
                      height={500}
                      className="object-cover w-full aspect-[4/3] group-hover:scale-105 transition-transform duration-300"
                      data-ai-hint={project.image.imageHint}
                    />
                  </div>
                )}
                <CardHeader>
                    <Badge variant="secondary" className="w-fit">{project.category}</Badge>
                </CardHeader>
                <CardContent>
                    <h3 className="text-xl font-bold font-headline mb-2">{project.title}</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
