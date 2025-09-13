import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import prisma from '@/lib/prisma';

export default async function AdminPortfolioPage() {
  const projects = await prisma.portfolioProject.findMany();

  return (
    <div className="bg-secondary/50 flex-grow">
      <div className="container py-12">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-headline">Manage Portfolio</h1>
            <p className="text-muted-foreground mt-2">Add, edit, or delete your portfolio projects.</p>
          </div>
          <Link href="/admin/portfolio/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
        </header>

        <main>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24 hidden sm:table-cell">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="w-24 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="hidden sm:table-cell">
                        {project.imageUrl && (
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            width={80}
                            height={60}
                            className="rounded-md object-cover"
                          />
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        <Badge variant="secondary">{project.category}</Badge>
                      </TableCell>
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
                              <Link href={`/admin/portfolio/edit/${project.id}`}>Edit</Link>
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
