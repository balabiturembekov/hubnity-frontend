import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { footerItems, legalLinks, socials } from "@/widgets/footer/consts";

export const Footer = () => {
  return (
    <footer className="bg-linear-to-br from-primary/20 via-primary/5 to-primary/15">
      <div className="container mx-auto px-4 pb-10">
        <div className="flex flex-col items-center gap-4 mx-auto py-20 max-w-165 text-center text-pretty">
          <Badge
            variant="outline"
            className="bg-white py-2 px-3 flex items-center gap-1"
          >
            <Sparkles className="text-transparent fill-primary w-5! h-5!" />
            <span className="text-sm text-primary uppercase">
              Your time tracker assistant
            </span>
          </Badge>

          <h3 className="text-3xl md:text-5xl font-medium">
            Track Time Effortlessly, Boost Productivity Instantly
          </h3>
          <p className="text-sm lg:text-base text-muted-foreground">
            Effortlessly track time, generate insightful reports, and integrate
            with your favorite tools, all with a user-friendly interface
            designed to boost productivity
          </p>

          <div className="flex items-center gap-3 mt-1">
            <Button className="w-32 h-11">Get Started</Button>
            <Button variant="outline" className="w-32 h-11">
              View Demo
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row pb-10">
          <div className="sm:w-full lg:w-1/2 flex items-start justify-between lg:justify-start flex-col sm:flex-row lg:flex-col gap-10 pb-10 lg:pb-0">
            <div className="flex flex-col gap-10">
              <Link href="/" className="w-fit">
                <Image
                  src="/img/hubnity-logo-without-descr.png"
                  alt="Hubnity Logo"
                  width={160}
                  height={37}
                />
              </Link>
              <p className="sm:w-2/3 text-muted-foreground">
                Hubnity is an intuitive and powerful time tracking platform
                designed to simplify the way individuals, freelancers, and teams
                manage their time
              </p>
            </div>

            <div className="flex flex-col gap-3 w-100">
              <span className="text-lg font-medium">
                Follow our social media
              </span>
              <div className="flex items-center sm:justify-end lg:justify-start gap-3">
                {socials.map((social) => (
                  <Link
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    className="bg-primary rounded-full size-7 flex items-center justify-center"
                  >
                    <Image
                      src={social.imgSrc}
                      alt={social.alt}
                      width={20}
                      height={20}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {footerItems.map((item) => (
              <div key={item.id}>
                <h4 className="text-lg mb-4 font-light">{item.label}</h4>
                <ul className="space-y-5 text-sm font-semibold text-foreground">
                  {item.links.map((link) => (
                    <li key={link.id}>
                      <Link href={link.href} className="hover:text-primary">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between flex-col-reverse gap-5 sm:flex-row">
          <p>&copy; Hubnity {new Date().getFullYear()}. All rights reserved</p>

          <div className="flex items-center gap-10">
            {legalLinks.map((link) => (
              <Link key={link.id} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
