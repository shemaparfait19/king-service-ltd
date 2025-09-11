import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, Mail, BarChart2 } from 'lucide-react';

export default function AdminDashboardPage() {
    // These would come from a database or API in a real application
    const stats = {
        visitors: 1250,
        jobApplicants: 12,
        contactSubmissions: 45,
        servicesRequested: 78,
    };

    return (
        <div className="bg-secondary/50 flex-grow">
            <div className="container py-12">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold font-headline">Admin Dashboard</h1>
                    <p className="text-muted-foreground mt-2">Welcome back, Admin. Here's a summary of your site's activity.</p>
                </header>

                <main>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.visitors.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">+5.2% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Job Applicants</CardTitle>
                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+{stats.jobApplicants}</div>
                                <p className="text-xs text-muted-foreground">3 new applications</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
                                <Mail className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+{stats.contactSubmissions}</div>
                                <p className="text-xs text-muted-foreground">10 unread</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Services Requested</CardTitle>
                                <BarChart2 className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.servicesRequested}</div>
                                <p className="text-xs text-muted-foreground">+12 since last week</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-12">
                         <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Activity feed is under construction.</p>
                                {/* In a real app, this would be a list or table of recent events */}
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}
