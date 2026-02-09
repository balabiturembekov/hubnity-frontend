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
        href: "/tracking",
      },
      {
        id: "3",
        label: "Reports",
        href: "/admin/reports",
      },
      {
        id: "4",
        label: "Team Activity",
        href: "/admin/team-acitivy",
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
        label: "blog",
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

export const legalLinks: FooterLinkType[] = [
  {
    id: "1",
    label: "Terms",
    href: "#", // TODO: Create terms page
  },
  {
    id: "2",
    label: "Privacy",
    href: "#", // TODO: Create privacy page
  },
  {
    id: "3",
    label: "Security",
    href: "#", // TODO: Create Security page
  },
];
