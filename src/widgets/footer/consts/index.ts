import type { ReactNode } from "react";
import { FacebookIcon } from "@/shared/icons/facebook-icon";
import { InstagramIcon } from "@/shared/icons/instagram-icon";
import { TiktokIcon } from "@/shared/icons/tiktok-icon";
import { YoutubeIcon } from "@/shared/icons/youtube-icon";

type FooterLinkType = {
  id: string;
  label: string;
  href: string;
};

type FooterItemType = {
  id: string;
  label: string;
  links: FooterLinkType[];
};

export const footerItems: FooterItemType[] = [
  {
    id: "1",
    label: "Product",
    links: [
      {
        id: "1",
        label: "Dashboard",
        href: "/dashboard",
      },
      {
        id: "2",
        label: "Time Tracking",
        href: "/time-entry",
      },
      {
        id: "3",
        label: "Reports",
        href: "/admin/summaries",
      },
      {
        id: "4",
        label: "Team Activity",
        href: "/admin/team-activity",
      },
    ],
  },
  {
    id: "2",
    label: "Company",
    links: [
      {
        id: "1",
        label: "About",
        href: "#", // TODO: Create about page
      },
      {
        id: "2",
        label: "Blog",
        href: "#", // TODO: Create blog page
      },
      {
        id: "3",
        label: "Careers",
        href: "#", // TODO: Create careers page
      },
      {
        id: "4",
        label: "Contact",
        href: "#", // TODO: Create contact page
      },
    ],
  },
  {
    id: "3",
    label: "Resources",
    links: [
      {
        id: "1",
        label: "Documentation",
        href: "#",
      },
      {
        id: "2",
        label: "API Reference",
        href: "#",
      },
      {
        id: "3",
        label: "Support",
        href: "#",
      },
      {
        id: "4",
        label: "Privacy Policy",
        href: "#",
      },
    ],
  },
];

type SocialType = {
  id: string;
  alt: string;
  icon: ({ className }: { className?: string }) => React.JSX.Element;
  href: string;
};

export const socials: SocialType[] = [
  {
    id: "1",
    alt: "Facebook",
    icon: FacebookIcon,
    href: "https://www.facebook.com/hubnity",
  },
  {
    id: "2",
    alt: "Instagram",
    icon: InstagramIcon,
    href: "https://www.instagram.com/hubnity",
  },
  {
    id: "3",
    alt: "TikTok",
    icon: TiktokIcon,
    href: "https://www.tiktok.com/hubnity",
  },
  {
    id: "4",
    alt: "YouTube",
    icon: YoutubeIcon,
    href: "https://www.youtube.com/hubnity",
  },
];

export const legalLinks: FooterLinkType[] = [
  {
    id: "1",
    label: "Privacy",
    href: "#", // TODO: Create privacy page
  },
  {
    id: "2",
    label: "Terms",
    href: "#", // TODO: Create terms page
  },
];
