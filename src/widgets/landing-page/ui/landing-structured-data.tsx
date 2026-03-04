import { getSiteBaseUrl } from "@/shared/lib/site-url";
import { questions, reviews } from "../consts";

const baseUrl = getSiteBaseUrl();
const logoUrl = `${baseUrl}/img/hubnity-logo-without-descr.png`;

function buildStructuredData() {
  const organization = {
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "Hubnity",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
    },
  };

  const webApplication = {
    "@type": "WebApplication",
    "@id": `${baseUrl}/#webapp`,
    name: "Hubnity",
    description:
      "Time tracking and team management platform for freelancers, agencies, and distributed teams. Track time, manage projects, and boost productivity.",
    url: baseUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "21-day free trial, no credit card required",
    },
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${baseUrl}/#faq`,
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  const aggregateRating =
    reviews.length > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
          ratingCount: reviews.length,
          reviewCount: reviews.length,
        }
      : null;

  const reviewSchema = reviews.map((r) => ({
    "@type": "Review",
    author: {
      "@type": "Person",
      name: r.name,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: 5,
    },
    reviewBody: r.review,
  }));

  const localBusinessOrProduct = {
    "@type": "SoftwareApplication",
    "@id": `${baseUrl}/#product`,
    name: "Hubnity",
    description:
      "Time tracking and team management for teams. Track time, manage projects, generate reports and invoices.",
    ...(aggregateRating && { aggregateRating }),
    ...(reviewSchema.length > 0 && { review: reviewSchema }),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, webApplication, faqPage, localBusinessOrProduct],
  };
}

export function LandingStructuredData() {
  const jsonLd = buildStructuredData();
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: need to use for SEO
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
