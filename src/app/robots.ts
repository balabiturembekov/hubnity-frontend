import type { MetadataRoute } from "next";
import { getSiteBaseUrl } from "@/shared/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/"],
      },
    ],
    sitemap: `${getSiteBaseUrl()}/sitemap.xml`,
  };
}
