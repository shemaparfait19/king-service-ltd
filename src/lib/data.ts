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
  Icon,
} from 'lucide-react';
import type { Service, FaqItem } from './definitions';

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
      { id: 'service-fridge', imageHint: 'fridge repair', imageUrl: 'https://picsum.photos/seed/fridge4/600/400' },
      { id: 'service-detail-1', imageHint: 'technician working', imageUrl: 'https://picsum.photos/seed/techwork1/600/400' }
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
      { id: 'service-wifi', imageHint: 'wifi router', imageUrl: 'https://picsum.photos/seed/wifi5/600/400' },
      { id: 'service-detail-2', imageHint: 'network cables', imageUrl: 'https://picsum.photos/seed/netcable2/600/400' }
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
    gallery: []
  },
  {
    id: 4,
    title: 'Car AC Refilling',
    slug: 'car-ac-refilling',
    icon: Car,
    short_desc: 'Keep your car cool with our AC services.',
    long_desc: 'We offer quick and affordable car air conditioning refilling and maintenance services to ensure you drive in comfort, no matter the weather.',
    details: ['Refrigerant top-up', 'Leak detection and repair', 'AC system diagnostics', 'Compressor check'],
    gallery: []
  },
  {
    id: 5,
    title: 'Generator Repair',
    slug: 'generator-repair',
    icon: Power,
    short_desc: 'Reliable generator maintenance and repair.',
    long_desc: 'Don\'t get left in the dark. We service and repair all types of generators to ensure you have a reliable backup power source when you need it most.',
    details: ['Engine servicing', 'Electrical component repair', 'Fuel system cleaning', 'Automatic transfer switch issues'],
    gallery: []
  },
  {
    id: 6,
    title: 'All Electronic Repair',
    slug: 'all-electronic-repair',
    icon: Wrench,
    short_desc: 'Comprehensive repair for all your electronics.',
    long_desc: 'From TVs and audio systems to specialized gadgets, our skilled team can fix a wide range of electronic devices. If it has a circuit board, we can probably fix it.',
    details: ['TV and display repair', 'Audio system servicing', 'Small appliance repair', 'Custom electronics troubleshooting'],
    gallery: []
  },
  {
    id: 7,
    title: 'Air Condition Installation & Maintenance',
    slug: 'ac-installation-maintenance',
    icon: AirVent,
    short_desc: 'Expert AC installation and regular maintenance.',
    long_desc: 'We provide professional installation of all types of air conditioning units, as well as regular maintenance plans to keep your system running efficiently and extend its lifespan.',
    details: ['Split and central AC installation', 'Regular cleaning and servicing', 'Efficiency optimization', 'Ductwork inspection'],
    gallery: []
  },
  {
    id: 8,
    title: 'Fire Alarm Installation & Maintenance',
    slug: 'fire-alarm-installation',
    icon: AlarmSmoke,
    short_desc: 'Protect your property with certified fire alarm systems.',
    long_desc: 'We install and maintain certified fire alarm systems for residential and commercial properties, ensuring compliance with safety regulations and providing peace of mind.',
    details: ['System design and installation', 'Regular testing and inspection', 'Smoke and heat detector maintenance', 'Emergency lighting checks'],
    gallery: []
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
       { id: 'service-cctv', imageHint: 'security camera', imageUrl: 'https://picsum.photos/seed/cctv6/600/400' }
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
    gallery: []
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
      { id: 'service-solar', imageHint: 'solar panels', imageUrl: 'https://picsum.photos/seed/solar7/600/400' }
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
      { id: 'service-detail-1', imageHint: 'medical equipment', imageUrl: 'https://picsum.photos/seed/biomed9/800/600' }
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
    gallery: []
  },
  {
    id: 14,
    title: 'Electrical Solutions',
    slug: 'electrical-solutions',
    icon: Cable,
    short_desc: 'Comprehensive electrical services for all needs.',
    long_desc: 'From residential wiring to commercial electrical installations, our licensed electricians provide safe, reliable, and code-compliant electrical solutions.',
    details: ['New construction wiring', 'Electrical panel upgrades', 'Lighting installation', 'Safety inspections'],
    gallery: []
  },
  {
    id: 15,
    title: 'Internships & Training',
    slug: 'internships-training',
    icon: GraduationCap,
    short_desc: 'Building the next generation of technicians.',
    long_desc: 'We are committed to fostering talent. Our internship and training programs offer hands-on experience and expert mentorship in the field of electronics and IT.',
    details: ['Structured internship programs', 'Practical skills workshops', 'On-the-job training', 'Career development'],
    gallery: []
  },
  {
    id: 16,
    title: 'Graphic Design',
    slug: 'graphic-design',
    icon: PenTool,
    short_desc: 'Creative design services for your brand.',
    long_desc: 'Beyond technical services, we also offer creative graphic design solutions to help build your brand identity, from logos to marketing materials.',
    details: ['Logo design and branding', 'Marketing collateral', 'Digital and print advertisements', 'UI/UX design concepts'],
    gallery: []
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
