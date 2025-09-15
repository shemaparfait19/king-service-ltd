export default function robots() {
  const host = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${host}/sitemap.xml`,
  };
}
