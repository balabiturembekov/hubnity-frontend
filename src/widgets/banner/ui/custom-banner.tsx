import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

interface CustomBanner {
  title: string;
  description: string;
  imageSrc: string;
  bgFrom: string;
  bgTo: string;
  mainButtonHref: string;
  mainButtonText: string;
  secondaryButtonHref: string;
  secondaryButtonText: string;
}

export const CustomBanner = ({
  bgFrom,
  bgTo,
  mainButtonHref,
  secondaryButtonHref,
  imageSrc,
  mainButtonText,
  secondaryButtonText,
  description,
  title,
}: CustomBanner) => {
  return (
    <div
      className={cn(
        `text-white p-6 pr-0 flex items-center justify-between bg-linear-to-r @container`,
        bgFrom,
        bgTo,
      )}
    >
      <div className="flex flex-col justify-between gap-8">
        <h3 className="text-3xl font-light">{title}</h3>
        <div>{description}</div>
        <div className="flex items-center gap-5">
          <Button asChild>
            <Link href={mainButtonHref}>{mainButtonText}</Link>
          </Button>
          <Button variant="outline" className="text-foreground" asChild>
            <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
          </Button>
        </div>
      </div>

      <Image
        src={imageSrc}
        alt="Banner image"
        width={664}
        height={145}
        className="hidden @[768px]:block"
      />
    </div>
  );
};
