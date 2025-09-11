import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper, Wrench, Languages, ImageIcon, CalendarCheck } from 'lucide-react';
import Link from 'next/link';

const adminFeatures = [
    {
        title: "Manage Services",
        description: "Add, edit, or remove service listings.",
        icon: Wrench,
        href: "/admin/services",
        bgColor: "bg-blue-100 dark:bg-blue-900/50",
        iconColor: "text-blue-500"
    },
    {
        title: "Manage Announcements",
        description: "Create and publish news and announcements.",
        icon: Newspaper,
        href: "/admin/announcements",
        bgColor: "bg-green-100 dark:bg-green-900/50",
        iconColor: "text-green-500"
    },
    {
        title: "Manage Bookings",
        description: "View and update client service bookings.",
        icon: CalendarCheck,
        href: "#",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/50",
        iconColor: "text-yellow-500"
    },
    {
        title: "Picture Library",
        description: "Upload and manage site images.",
        icon: ImageIcon,
        href: "#",
        bgColor: "bg-purple-100 dark:bg-purple-900/50",
        iconColor: "text-purple-500"
    },
    {
        title: "Language Content",
        description: "Edit content for English and French.",
        icon: Languages,
        href: "#",
        bgColor: "bg-red-100 dark:bg-red-900/50",
        iconColor: "text-red-500"
    }
]

export default function AdminDashboardPage() {
    return (
        <div className="bg-secondary/50 flex-grow">
            <div className="container py-12">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold font-headline">Admin Control Center</h1>
                    <p className="text-muted-foreground mt-2">Select a category below to manage your website's content.</p>
                </header>

                <main>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {adminFeatures.map((feature) => (
                             <Link href={feature.href} key={feature.title}>
                                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group hover:-translate-y-1">
                                    <CardHeader className="flex flex-row items-center gap-4">
                                        <div className={`p-4 rounded-lg ${feature.bgColor}`}>
                                            <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                                        </div>
                                        <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
