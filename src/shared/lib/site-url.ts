/**
 * Canonical base URL for the site. Used for sitemap, robots, metadata, and structured data.
 * Set NEXT_PUBLIC_APP_URL in production (e.g. https://hubnity.eu).
 */
export function getSiteBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    "https://hubnity.eu"
  );
}
