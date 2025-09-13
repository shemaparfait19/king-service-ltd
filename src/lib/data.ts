import type { Service, FaqItem, BlogPost, PortfolioProject } from './definitions';
import { PlaceHolderImages } from './placeholder-images';
import {
  Refrigerator,
  Wifi,
  CookingPot,
  Car,
  Power,
  Wrench,
  AirVent,
  AlarmSmoke,
  Camera,
  Share2,
  Sun,
  HeartPulse,
  Factory,
  Cable,
  GraduationCap,
  PenTool,
} from 'lucide-react';

export const services: Service[] = [
  {
    id: 1,
    title: 'Fridge Repair',
    slug: 'fridge-repair',
    icon: Refrigerator,
    short_desc: 'Fast and reliable refrigerator repair services.',
    long_desc: 'Our expert technicians can diagnose and fix any issue with your refrigerator, from cooling problems to strange noises. We handle all major brands and models, ensuring your food stays fresh.',
    details: ['Compressor replacement', 'Freon leak repair', 'Thermostat issues', 'Door seal replacement'],
    gallery: [
      PlaceHolderImages.find(p => p.id === 'service-fridge-1')!,
      PlaceHolderImages.find(p => p.id === 'service-fridge-2')!,
    ]
  },
  {
    id: 2,
    title: 'WiFi Installation',
    slug: 'wifi-installation',
    icon: Wifi,
    short_desc: 'Professional WiFi setup for home and business.',
    long_desc: 'We provide end-to-end WiFi installation services, from network design and hardware setup to signal optimization. Get seamless, high-speed internet coverage across your entire property.',
    details: ['Home and office network setup', 'Mesh WiFi systems', 'Signal strength optimization', 'Network security configuration'],
    gallery: [
      PlaceHolderImages.find(p => p.id === 'service-wifi-1')!,
      PlaceHolderImages.find(p => p.id === 'service-wifi-2')!,
    ]
  },
  {
    id: 3,
    title: 'Gas Cooker Repair',
    slug: 'gas-cooker-repair',
    icon: CookingPot,
    short_desc: 'Safe and efficient gas cooker repair.',
    long_desc: 'Our certified technicians handle all types of gas cooker repairs, including ignition problems, gas leaks, and uneven heating. Safety is our top priority.',
    details: ['Igniter repair', 'Gas leak detection', 'Burner issues', 'Oven temperature calibration'],
    gallery: [
      PlaceHolderImages.find(p => p.id === 'service-gas-cooker')!,
    ]
  },
  {
    id: 4,
    title: 'Car AC Refilling',
    slug: 'car-ac-refilling',
    icon: Car,
    short_desc: 'Keep your car cool with our AC services.',
    long_desc: 'We offer quick and affordable car air conditioning refilling and maintenance services to ensure you drive in comfort, no matter the weather.',
    details: ['Refrigerant top-up', 'Leak detection and repair', 'AC system diagnostics', 'Compressor check'],
    gallery: [
       PlaceHolderImages.find(p => p.id === 'service-car-ac')!,
    ]
  },
  {
    id: 5,
    title: 'Generator Repair',
    slug: 'generator-repair',
    icon: Power,
    short_desc: 'Reliable generator maintenance and repair.',
    long_desc: 'Don\'t get left in the dark. We service and repair all types of generators to ensure you have a reliable backup power source when you need it most.',
    details: ['Engine servicing', 'Electrical component repair', 'Fuel system cleaning', 'Automatic transfer switch issues'],
    gallery: [
        PlaceHolderImages.find(p => p.id === 'service-generator')!,
    ]
  },
  {
    id: 6,
    title: 'All Electronic Repair',
    slug: 'all-electronic-repair',
    icon: Wrench,
    short_desc: 'Comprehensive repair for all your electronics.',
    long_desc: 'From TVs and audio systems to specialized gadgets, our skilled team can fix a wide range of electronic devices. If it has a circuit board, we can probably fix it.',
    details: ['TV and display repair', 'Audio system servicing', 'Small appliance repair', 'Custom electronics troubleshooting'],
    gallery: [
      PlaceHolderImages.find(p => p.id === 'service-electronics-repair')!,
    ]
  },
  {
    id: 7,
    title: 'Air Condition Installation & Maintenance',
    slug: 'ac-installation-maintenance',
    icon: AirVent,
    short_desc: 'Expert AC installation and regular maintenance.',
    long_desc: 'We provide professional installation of all types of air conditioning units, as well as regular maintenance plans to keep your system running efficiently and extend its lifespan.',
    details: ['Split and central AC installation', 'Regular cleaning and servicing', 'Efficiency optimization', 'Ductwork inspection'],
    gallery: [
       PlaceHolderImages.find(p => p.id === 'service-ac-install')!,
    ]
  },
  {
    id: 8,
    title: 'Fire Alarm Installation & Maintenance',
    slug: 'fire-alarm-installation',
    icon: AlarmSmoke,
    short_desc: 'Protect your property with certified fire alarm systems.',
    long_desc: 'We install and maintain certified fire alarm systems for residential and commercial properties, ensuring compliance with safety regulations and providing peace of mind.',
    details: ['System design and installation', 'Regular testing and inspection', 'Smoke and heat detector maintenance', 'Emergency lighting checks'],
    gallery: [
        PlaceHolderImages.find(p => p.id === 'service-fire-alarm')!,
    ]
  },
  {
    id: 9,
    title: 'CCTV Camera & Internet Installation',
    slug: 'cctv-internet-installation',
    icon: Camera,
    short_desc: 'Integrated security and connectivity solutions.',
    long_desc: 'Secure your premises with our high-definition CCTV camera systems, fully integrated with reliable internet solutions for remote monitoring and access.',
    details: ['HD and IP camera setup', 'Remote access and mobile viewing', 'Network video recorder (NVR) configuration', 'Data cabling'],
    gallery: [
       PlaceHolderImages.find(p => p.id === 'service-cctv')!,
    ]
  },
  {
    id: 10,
    title: 'IoT Solutions',
    slug: 'iot-solutions',
    icon: Share2,
    short_desc: 'Smart solutions for a connected world.',
    long_desc: 'We develop and deploy custom Internet of Things (IoT) solutions to automate processes, monitor assets, and gather valuable data for your home or business.',
    details: ['Smart home automation', 'Industrial IoT sensors', 'Custom device integration', 'Data dashboards'],
    gallery: [
        PlaceHolderImages.find(p => p.id === 'service-iot')!,
    ]
  },
  {
    id: 11,
    title: 'Solar Systems',
    slug: 'solar-systems',
    icon: Sun,
    short_desc: 'Harness the power of the sun with our solar solutions.',
    long_desc: 'Go green and reduce your energy bills with our complete solar system services, from design and installation to maintenance and repair.',
    details: ['Rooftop solar panel installation', 'Battery storage solutions', 'Inverter maintenance', 'Off-grid and on-grid systems'],
    gallery: [
      PlaceHolderImages.find(p => p.id === 'service-solar')!,
    ]
  },
  {
    id: 12,
    title: 'Biomedical Equipment Repair',
    slug: 'biomedical-equipment-repair',
    icon: HeartPulse,
    short_desc: 'Specialized repair for medical equipment.',
    long_desc: 'Our trained technicians provide critical repair and maintenance services for a wide range of biomedical equipment, ensuring accuracy and reliability for healthcare providers.',
    details: ['Diagnostic equipment servicing', 'Patient monitoring systems', 'Surgical tool maintenance', 'Calibration services'],
    gallery: [
      PlaceHolderImages.find(p => p.id === 'service-biomedical')!,
    ]
  },
  {
    id: 13,
    title: 'Industrial Electronic Mechanic Repair',
    slug: 'industrial-electronic-repair',
    icon: Factory,
    short_desc: 'Keeping your industrial machinery running.',
    long_desc: 'We specialize in troubleshooting and repairing complex electronic systems in industrial machinery, minimizing downtime and maximizing productivity.',
    details: ['PLC troubleshooting', 'Variable frequency drive (VFD) repair', 'Control panel servicing', 'Robotics and automation'],
    gallery: [
        PlaceHolderImages.find(p => p.id === 'service-industrial-repair')!,
    ]
  },
  {
    id: 14,
    title: 'Electrical Solutions',
    slug: 'electrical-solutions',
    icon: Cable,
    short_desc: 'Comprehensive electrical services for all needs.',
    long_desc: 'From residential wiring to commercial electrical installations, our licensed electricians provide safe, reliable, and code-compliant electrical solutions.',
    details: ['New construction wiring', 'Electrical panel upgrades', 'Lighting installation', 'Safety inspections'],
    gallery: [
        PlaceHolderImages.find(p => p.id === 'service-electrical')!,
    ]
  },
  {
    id: 15,
    title: 'Internships & Training',
    slug: 'internships-training',
    icon: GraduationCap,
    short_desc: 'Building the next generation of technicians.',
    long_desc: 'We are committed to fostering talent. Our internship and training programs offer hands-on experience and expert mentorship in the field of electronics and IT.',
    details: ['Structured internship programs', 'Practical skills workshops', 'On-the-job training', 'Career development'],
    gallery: [
        PlaceHolderImages.find(p => p.id === 'service-training')!,
    ]
  },
  {
    id: 16,
    title: 'Graphic Design',
    slug: 'graphic-design',
    icon: PenTool,
    short_desc: 'Creative design services for your brand.',
    long_desc: 'Beyond technical services, we also offer creative graphic design solutions to help build your brand identity, from logos to marketing materials.',
    details: ['Logo design and branding', 'Marketing collateral', 'Digital and print advertisements', 'UI/UX design concepts'],
    gallery: [
      PlaceHolderImages.find(p => p.id === 'service-graphic-design')!,
    ]
  }
];

export const faqs: FaqItem[] = [
    {
        id: 1,
        question: "What are your operating hours?",
        answer: "We are open from Monday to Saturday, 8:00 AM to 6:00 PM. We are closed on Sundays and public holidays."
    },
    {
        id: 2,
        question: "Do you provide a warranty for your repairs?",
        answer: "Yes, we offer a 90-day warranty on all our repair services for the specific issue that was addressed. This covers both parts and labor."
    },
    {
        id: 3,
        question: "What is your service area?",
        answer: "Our primary service area is Bugesera District in the Eastern Province. However, we also provide services nationwide for larger projects and specialized requests. Please contact us to confirm availability in your area."
    },
    {
        id: 4,
        question: "How can I book a service?",
        answer: "You can book a service by calling us at +250 787 649 480, sending us a message on WhatsApp, or filling out the contact form on our website. For specific services, you can also use the 'Request a Quote' form on the service page."
    }
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '5 Signs Your Refrigerator Needs a Repair',
    slug: '5-signs-refrigerator-repair',
    excerpt: 'Is your fridge making strange noises? Food not staying cold? It might be time for a check-up. Learn the key warning signs to look out for to prevent a major appliance meltdown.',
    content: `
      <p>Your refrigerator is one of the most important appliances in your home, running 24/7 to keep your food fresh. When it starts to fail, it can be a major inconvenience. Here are five key signs to watch out for that indicate your fridge might need professional repair.</p>
      
      <h3 class="font-headline text-2xl mt-8 mb-4">1. Excessive Condensation</h3>
      <p>A little condensation on the inside of your fridge can be normal, but if you\'re noticing excessive moisture or "sweating," it could mean the door seals aren\'t working correctly. This forces your fridge to work harder, increasing energy consumption.</p>

      <h3 class="font-headline text-2xl mt-8 mb-4">2. The Motor is Constantly Running</h3>
      <p>It\'s normal for a refrigerator\'s motor to kick on and off. However, if you notice the motor running continuously, it\'s a sign that the cooling system is struggling to maintain the set temperature. This could be due to a variety of issues, from dirty condenser coils to a faulty thermostat.</p>

      <h3 class="font-headline text-2xl mt-8 mb-4">3. Food is Spoiling Quickly</h3>
      <p>If you find that your milk is souring before its expiration date or vegetables are wilting faster than usual, your refrigerator is likely not cooling properly. This is a critical issue that needs immediate attention to prevent food waste and potential health risks.</p>

      <h3 class="font-headline text-2xl mt-8 mb-4">4. Strange Noises</h3>
      <p>While refrigerators make some noise, loud buzzing, clicking, or rattling sounds are not normal. These could indicate problems with the compressor, fans, or other mechanical parts. Don\'t ignore these auditory warnings!</p>

      <h3 class="font-headline text-2xl mt-8 mb-4">5. The Freezer is Over-Icing</h3>
      <p>A thick layer of ice in your freezer (especially in a frost-free model) is a red flag. It can be caused by a faulty defrost system, which can lead to temperature inconsistencies and reduce freezer efficiency.</p>

      <p class="mt-8">If you notice any of these signs, it\'s best to call a professional technician. At KSTech Solutions, we can diagnose and fix the problem quickly and efficiently. <a href="/contact" class="text-accent hover:underline">Contact us today!</a></p>
    `,
    date: 'July 15, 2024',
    author: 'Admin',
    category: 'Appliance Repair',
    image: PlaceHolderImages.find(p => p.id === 'service-fridge-1'),
  },
  {
    id: 2,
    title: 'The Benefits of a Professionally Installed CCTV System',
    slug: 'benefits-cctv-system',
    excerpt: 'Home and business security is more important than ever. Discover the advantages of a professional CCTV installation, from remote monitoring to deterring potential intruders.',
    date: 'July 10, 2024',
    author: 'Admin',
    category: 'Security',
    content: '<p>Coming soon...</p>',
    image: PlaceHolderImages.find(p => p.id === 'service-cctv'),
  },
  {
    id: 3,
    title: 'Getting Started with Solar Power for Your Home',
    slug: 'getting-started-solar-power',
    excerpt: 'Thinking about making the switch to solar? This guide breaks down the basics of residential solar systems, including panel types, battery storage, and potential savings.',
    date: 'July 5, 2024',
    author: 'Admin',
    category: 'Energy',
    content: '<p>Coming soon...</p>',
    image: PlaceHolderImages.find(p => p.id === 'service-solar'),
  },
];

export const portfolioProjects: PortfolioProject[] = [
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
      image: PlaceHolderImages.find(p => p.id === 'portfolio-smart-home')!,
    },
    {
      id: 5,
      title: 'Biomedical Equipment Calibration for Clinic',
      category: 'Biomedical Repair',
      description: 'Performed annual calibration and preventive maintenance on diagnostic equipment for a regional health clinic, ensuring accurate readings and patient safety.',
      image: PlaceHolderImages.find(p => p.id === 'service-biomedical')!,
    },
    {
      id: 6,
      title: 'Community Center WiFi Hotspot',
      category: 'WiFi Installation',
      description: 'Provided free public WiFi access for a community center by installing a managed, high-capacity wireless network capable of supporting hundreds of simultaneous users.',
      image: PlaceHolderImages.find(p => p.id === 'service-wifi-1')!,
    },
  ];
