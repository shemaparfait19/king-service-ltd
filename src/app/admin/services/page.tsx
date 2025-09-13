import { serviceIcons } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, PlusCircle, Wrench } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import type { Service } from '@/lib/definitions';

export default async function AdminServicesPage() {
  const dbServices = await prisma.service.findMany();
  const services: Service[] = dbServices.map(service => ({
      ...service,
      icon: serviceIcons[service.slug as keyof typeof serviceIcons] || Wrench,
  }));

  return (
    <div className="bg-secondary/50 flex-grow">
      <div className="container py-12">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-headline">Manage Services</h1>
            <p className="text-muted-foreground mt-2">Here you can add, edit, or delete your service offerings.</p>
          </div>
          <Link href="/admin/services/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Service
            </Button>
          </Link>
        </header>

        <main>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16 hidden sm:table-cell">Icon</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Short Description</TableHead>
                    <TableHead className="w-24 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="hidden sm:table-cell">
                        <div className="bg-muted p-2 rounded-lg inline-flex">
                          <service.icon className="h-6 w-6 text-muted-foreground" />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{service.title}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">{service.short_desc}</TableCell>
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
                              <Link href={`/admin/services/edit/${service.id}`}>Edit</Link>
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
