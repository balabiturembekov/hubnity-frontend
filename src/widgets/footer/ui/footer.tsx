import { Clock } from "lucide-react";
import Link from "next/link";

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
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/dashboard" className="hover:text-primary">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/tracking" className="hover:text-primary">
                  Time Tracking
                </Link>
              </li>
              <li>
                <Link href="/admin/reports" className="hover:text-primary">
                  Reports
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/team-activity"
                  className="hover:text-primary"
                >
                  Team Activity
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-primary">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Hubnity. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <Link href="#" className="hover:text-primary">
                Terms
              </Link>
              <Link href="#" className="hover:text-primary">
                Privacy
              </Link>
              <Link href="#" className="hover:text-primary">
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
