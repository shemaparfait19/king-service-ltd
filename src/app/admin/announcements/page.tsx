import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';

// Placeholder data for blog posts
const blogPosts = [
    {
      id: 1,
      title: '5 Signs Your Refrigerator Needs a Repair',
      status: 'Published',
      date: 'July 15, 2024',
      author: 'Admin',
    },
    {
      id: 2,
      title: 'The Benefits of a Professionally Installed CCTV System',
      status: 'Published',
      date: 'July 10, 2024',
      author: 'Admin',
    },
    {
      id: 3,
      title: 'Getting Started with Solar Power for Your Home',
      status: 'Draft',
      date: 'July 5, 2024',
      author: 'Admin',
    },
  ];

export default function AdminAnnouncementsPage() {
  return (
    <div className="bg-secondary/50 flex-grow">
      <div className="container py-12">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-headline">Manage Announcements</h1>
            <p className="text-muted-foreground mt-2">Create, edit, and publish news and blog posts.</p>
          </div>
          <Link href="/admin/announcements/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </Link>
        </header>

        <main>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="w-24 hidden sm:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell w-40">Date</TableHead>
                    <TableHead className="w-24 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                         <Badge variant={post.status === 'Published' ? 'default' : 'secondary'}>
                            {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">{post.date}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                               <Link href="/admin/announcements/edit/1">Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                {post.status === 'Published' ? 'Unpublish' : 'Publish'}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
