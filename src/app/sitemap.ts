import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const host = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const now = new Date().toISOString();
  const urls = [
    "",
    "/en",
    "/en/services",
    "/en/portfolio",
    "/en/blog",
    "/en/careers",
    "/en/careers/jobs",
    "/en/careers/internships",
    "/en/careers/trainings",
    "/en/contact",
  ];
  return urls.map((path) => ({
    url: `${host}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" || path === "/en" ? 1 : 0.7,
  }));
}
