import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Newspaper,
  Wrench,
  Languages,
  ImageIcon,
  CalendarCheck,
  FolderKanban,
  ArrowRight,
  FileText,
  Mail,
  BarChart3,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { BlogPost, PortfolioProject } from "@/lib/definitions";

const adminFeatures = [
  {
    title: "Hero Images",
    description: "Manage homepage slider images",
    icon: ImageIcon,
    href: "/admin/hero-images",
    color: "bg-blue-500",
  },
  {
    title: "Services",
    description: "Manage technical services with images",
    icon: Wrench,
    href: "/admin/services",
    color: "bg-green-500",
  },
  {
    title: "Portfolio",
    description: "Showcase completed projects",
    icon: FolderKanban,
    href: "/admin/portfolio",
    color: "bg-purple-500",
  },
  {
    title: "Announcements",
    description: "Create news and announcements",
    icon: Newspaper,
    href: "/admin/announcements",
    color: "bg-orange-500",
  },
  {
    title: "Blog Posts",
    description: "Write and manage blog content",
    icon: FileText,
    href: "/admin/blog",
    color: "bg-indigo-500",
  },
  {
    title: "Contact Messages",
    description: "View customer inquiries",
    icon: Mail,
    href: "/admin/contact",
    color: "bg-red-500",
  },
  {
    title: "Analytics",
    description: "Website performance metrics",
    icon: BarChart3,
    href: "/admin/analytics",
    color: "bg-teal-500",
  },
  {
    title: "Settings",
    description: "System configuration",
    icon: Settings,
    href: "/admin/settings",
    color: "bg-gray-500",
  },
];

async function getDashboardData() {
  const servicesSnapshot = await getDocs(collection(db, "services"));
  const portfolioSnapshot = await getDocs(collection(db, "portfolioProjects"));
  const blogSnapshot = await getDocs(collection(db, "blogPosts"));

  const recentPostsSnapshot = await getDocs(collection(db, "blogPosts"));
  const recentPosts = recentPostsSnapshot.docs
    .map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date.toDate(),
        } as BlogPost)
    )
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 3);

  const recentProjectsQuery = query(
    collection(db, "portfolioProjects"),
    limit(3)
  ); // No date field, just get latest added
  const recentProjectsSnapshot = await getDocs(recentProjectsQuery);
  const recentProjects = recentProjectsSnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as PortfolioProject)
  );

  return {
    servicesCount: servicesSnapshot.size,
    portfolioCount: portfolioSnapshot.size,
    blogCount: blogSnapshot.size,
    recentPosts,
    recentProjects,
  };
}

export default async function AdminDashboardPage() {
  const {
    servicesCount,
    portfolioCount,
    blogCount,
    recentPosts,
    recentProjects,
  } = await getDashboardData();

  return (
    <div className="bg-secondary/50 flex-grow">
      <div className="container py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold font-headline">
            Admin Control Center
          </h1>
          <p className="text-muted-foreground mt-2">
            Welcome! Here's a summary of your website's content.
          </p>
        </header>

        <main className="grid gap-8 lg:grid-cols-3">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Services
                    </CardTitle>
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{servicesCount}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Portfolio Projects
                    </CardTitle>
                    <FolderKanban className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{portfolioCount}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Announcements
                    </CardTitle>
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
                  <CardTitle className="font-headline">
                    Recent Announcements
                  </CardTitle>
                  <CardDescription>
                    Your latest news and blog posts.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPosts.map((post) => (
                      <div key={post.id} className="flex flex-col">
                        <Link
                          href={`/admin/announcements/edit/${post.id}`}
                          className="font-semibold hover:underline"
                        >
                          {post.title}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(post.date), "MMMM d, yyyy")}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">
                    Recent Projects
                  </CardTitle>
                  <CardDescription>
                    Your latest portfolio additions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentProjects.map((project) => (
                      <div key={project.id} className="flex flex-col">
                        <Link
                          href={`/admin/portfolio/edit/${project.id}`}
                          className="font-semibold hover:underline"
                        >
                          {project.title}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {project.category}
                        </p>
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
                <Link href="/admin/announcements/new">
                  <Button className="w-full justify-start" variant="ghost">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    New Announcement
                  </Button>
                </Link>
                <Link href="/admin/services/new">
                  <Button className="w-full justify-start" variant="ghost">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    New Service
                  </Button>
                </Link>
                <Link href="/admin/portfolio/new">
                  <Button className="w-full justify-start" variant="ghost">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    New Portfolio Project
                  </Button>
                </Link>
                <Link href="/admin/images/new">
                  <Button className="w-full justify-start" variant="ghost">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Upload an Image
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">
                  All Management Areas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {adminFeatures.map((feature) => (
                  <Link
                    href={feature.href}
                    key={feature.title}
                    className="flex items-center p-3 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <div
                      className={`p-2 rounded-lg ${feature.color} mr-4 group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">{feature.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
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
