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
import type { FaqItem } from './definitions';

// The 'services' array is now for providing icon mapping, not for content.
// Content is now fetched from the database.
export const serviceIcons = {
  'fridge-repair': Refrigerator,
  'wifi-installation': Wifi,
  'gas-cooker-repair': CookingPot,
  'car-ac-refilling': Car,
  'generator-repair': Power,
  'all-electronic-repair': Wrench,
  'ac-installation-maintenance': AirVent,
  'fire-alarm-installation': AlarmSmoke,
  'cctv-internet-installation': Camera,
  'iot-solutions': Share2,
  'solar-systems': Sun,
  'biomedical-equipment-repair': HeartPulse,
  'industrial-electronic-repair': Factory,
  'electrical-solutions': Cable,
  'internships-training': GraduationCap,
  'graphic-design': PenTool,
};


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

// Note: blogPosts and portfolioProjects are no longer needed here as they will be fetched from the database.
