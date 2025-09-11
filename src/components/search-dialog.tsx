"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { services, blogPosts, portfolioProjects } from "@/lib/data"

type SearchResultItem = {
  title: string;
  href: string;
  excerpt?: string;
};

type SearchResultGroup = {
  group: string;
  items: SearchResultItem[];
};

export function SearchDialog() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResultGroup[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (query.length > 2) {
      const lowerCaseQuery = query.toLowerCase();
      
      const serviceResults = services
        .filter(s =>
          s.title.toLowerCase().includes(lowerCaseQuery) ||
          s.short_desc.toLowerCase().includes(lowerCaseQuery)
        )
        .map(s => ({ title: s.title, href: `/services/${s.slug}`, excerpt: s.short_desc }));
      
      const blogResults = blogPosts
        .filter(p =>
          p.title.toLowerCase().includes(lowerCaseQuery) ||
          p.excerpt.toLowerCase().includes(lowerCaseQuery)
        )
        .map(p => ({ title: p.title, href: `/blog/${p.slug}`, excerpt: p.excerpt }));
        
      const portfolioResults = portfolioProjects
        .filter(p =>
          p.title.toLowerCase().includes(lowerCaseQuery) ||
          p.description.toLowerCase().includes(lowerCaseQuery)
        )
        .map(p => ({ title: p.title, href: `/portfolio`, excerpt: p.description }));


      const newResults: SearchResultGroup[] = [];
      if (serviceResults.length > 0) {
        newResults.push({ group: "Services", items: serviceResults });
      }
      if (blogResults.length > 0) {
        newResults.push({ group: "Announcements", items: blogResults });
      }
      if (portfolioResults.length > 0) {
        newResults.push({ group: "Portfolio Projects", items: portfolioResults });
      }

      setResults(newResults);
    } else {
      setResults([]);
    }
  }, [query]);
  
  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Search KSTech Solutions</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search services, announcements, projects..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
          <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {query.length > 0 && results.length === 0 && (
                <p className="text-center text-muted-foreground">
                    {query.length > 2 ? "No results found." : "Keep typing to see results..."}
                </p>
            )}
            {results.map((resultGroup) => (
              <div key={resultGroup.group} className="space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground px-3">{resultGroup.group}</h3>
                <div className="space-y-1">
                  {resultGroup.items.map((item) => (
                     <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>
                      <div className="p-3 rounded-md border hover:bg-secondary cursor-pointer transition-colors">
                        <p className="font-semibold">{item.title}</p>
                        {item.excerpt && (
                            <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
