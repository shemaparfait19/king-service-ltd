import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Newspaper, Wrench, Languages, ImageIcon, CalendarCheck, FolderKanban, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { format } from 'date-fns';

const adminFeatures = [
    {
        title: "Manage Services",
        description: "Add, edit, or remove service listings.",
        icon: Wrench,
        href: "/admin/services",
    },
    {
        title: "Manage Announcements",
        description: "Create and publish news and announcements.",
        icon: Newspaper,
        href: "/admin/announcements",
    },
    {
        title: "Manage Portfolio",
        description: "Add, edit, or remove portfolio projects.",
        icon: FolderKanban,
        href: "/admin/portfolio",
    },
    {
        title: "Picture Library",
        description: "Upload and manage site images.",
        icon: ImageIcon,
        href: "/admin/images",
    },
    {
        title: "Manage Bookings",
        description: "View and update client service bookings.",
        icon: CalendarCheck,
        href: "#",
    },
    {
        title: "Language Content",
        description: "Edit content for English and French.",
        icon: Languages,
        href: "#",
    }
]

export default async function AdminDashboardPage() {
    const servicesCount = await prisma.service.count();
    const portfolioCount = await prisma.portfolioProject.count();
    const blogCount = await prisma.blogPost.count();

    const recentPosts = await prisma.blogPost.findMany({
        take: 3,
        orderBy: { date: 'desc' }
    });

    const recentProjects = await prisma.portfolioProject.findMany({
        take: 3,
        orderBy: { id: 'desc' }
    });

    return (
        <div className="bg-secondary/50 flex-grow">
            <div className="container py-12">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold font-headline">Admin Control Center</h1>
                    <p className="text-muted-foreground mt-2">Welcome! Here's a summary of your website's content.</p>
                </header>

                <main className="grid gap-8 lg:grid-cols-3">
                    {/* Main Column */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Quick Stats */}
                        <section>
                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Total Services</CardTitle>
                                        <Wrench className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{servicesCount}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Portfolio Projects</CardTitle>
                                        <FolderKanban className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{portfolioCount}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Announcements</CardTitle>
                                        <Newspaper className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{blogCount}</div>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        {/* Recent Activity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <Card>
                                <CardHeader>
                                    <CardTitle className="font-headline">Recent Announcements</CardTitle>
                                    <CardDescription>Your latest news and blog posts.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recentPosts.map(post => (
                                            <div key={post.id} className="flex flex-col">
                                                <Link href={`/admin/announcements/edit/${post.id}`} className="font-semibold hover:underline">{post.title}</Link>
                                                <p className="text-sm text-muted-foreground">{format(post.date, 'MMMM d, yyyy')}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-headline">Recent Projects</CardTitle>
                                     <CardDescription>Your latest portfolio additions.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                     <div className="space-y-4">
                                        {recentProjects.map(project => (
                                            <div key={project.id} className="flex flex-col">
                                                <Link href={`/admin/portfolio/edit/${project.id}`} className="font-semibold hover:underline">{project.title}</Link>
                                                <p className="text-sm text-muted-foreground">{project.category}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <aside className="space-y-8">
                       <Card>
                           <CardHeader>
                               <CardTitle className="font-headline">Quick Actions</CardTitle>
                           </CardHeader>
                           <CardContent className="space-y-2">
                               <Link href="/admin/announcements/new"><Button className="w-full justify-start" variant="ghost"><ArrowRight className="mr-2 h-4 w-4" />New Announcement</Button></Link>
                               <Link href="/admin/services/new"><Button className="w-full justify-start" variant="ghost"><ArrowRight className="mr-2 h-4 w-4" />New Service</Button></Link>
                               <Link href="/admin/portfolio/new"><Button className="w-full justify-start" variant="ghost"><ArrowRight className="mr-2 h-4 w-4" />New Portfolio Project</Button></Link>
                               <Link href="/admin/images/new"><Button className="w-full justify-start" variant="ghost"><ArrowRight className="mr-2 h-4 w-4" />Upload an Image</Button></Link>
                           </CardContent>
                       </Card>
                        <Card>
                           <CardHeader>
                               <CardTitle className="font-headline">All Management Areas</CardTitle>
                           </CardHeader>
                           <CardContent className="space-y-4">
                            {adminFeatures.map((feature) => (
                                 <Link href={feature.href} key={feature.title} className="flex items-center p-2 rounded-md hover:bg-muted">
                                    <feature.icon className="h-6 w-6 mr-4 text-muted-foreground" />
                                    <div>
                                        <p className="font-semibold">{feature.title}</p>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                </Link>
                            ))}
                           </CardContent>
                       </Card>
                    </aside>
                </main>
            </div>
        </div>
    );
}
