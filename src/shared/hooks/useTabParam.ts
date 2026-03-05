import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface UseTabParamProps {
  defaultTab: string;
}

export const useTabParam = ({ defaultTab }: UseTabParamProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || defaultTab;

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return { tab, handleTabChange };
};
