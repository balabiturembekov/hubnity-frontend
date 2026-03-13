/**
 * Canonical base URL for the site. Used for sitemap, robots, metadata, and structured data.
 * Set NEXT_PUBLIC_APP_URL for staging/prod/self-hosted deployments.
 */
export function getSiteBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://hubnity.eu")
  );
}
