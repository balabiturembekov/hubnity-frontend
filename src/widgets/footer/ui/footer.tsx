import { Clock } from "lucide-react";
import Link from "next/link";
import { footerItems, legalLinks } from "@/widgets/footer/consts";

export const Footer = () => {
  return (
    <footer className="border-t bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Clock className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-gray-900">Hubnity</span>
            </div>
            <p className="text-sm text-gray-600">
              The modern time tracking solution for teams who value productivity
              and transparency.
            </p>
          </div>

          {footerItems.map((item) => (
            <div key={item.id}>
              <h4 className="mb-4 font-semibold text-gray-900">{item.label}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
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

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Hubnity. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              {legalLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
