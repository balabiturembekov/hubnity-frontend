"use client";

import { AxiosError } from "axios";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useAcceptInviteLinkMutation,
  useGetOrganizationByInviteTokenQuery,
} from "@/entities/invite-link";
import { Button } from "@/shared/ui/button";
import { ScreenLoader } from "@/widgets/loader";

export default function JoinPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const invite = searchParams.get("invite");

  const { mutateAsync: acceptInviteLink, isPending: isAcceptingInviteLink } =
    useAcceptInviteLinkMutation();

  const { data: organization, isLoading: isOrganizationLoading } =
    useGetOrganizationByInviteTokenQuery(invite as string);

  if (isOrganizationLoading) {
    return <ScreenLoader className="text-primary" />;
  }

  const handleAcceptInviteLink = async () => {
    try {
      await acceptInviteLink({ token: invite as string });
      router.replace(`/dashboard/${organization?.id}`);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        router.replace(`/dashboard/${organization?.id}`);
      }
    }
  };

  return (
    <main className="min-h-dvh flex overflow-hidden items-center bg-linear-to-br from-primary/5 via-white to-primary/5 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        <div className="mb-8">
          <Image
            src="/img/hubnity-logo.png"
            alt="Hubnity Logo"
            width={220}
            height={110}
            priority
            unoptimized
          />
        </div>

        <div className="text-center space-y-4 max-w-2xl px-4">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Join your team workspace
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground leading-[1.6] max-w-lg mx-auto">
            You were invited to join organization{" "}
            <span className="text-primary bg-primary/10 px-2 py-1 rounded-md">
              {organization?.name}
            </span>
            . Accept the invitation to continue.
          </p>

          <div className="pt-2">
            <Button
              size="lg"
              className="h-10 text-sm bg-primary border-primary-foreground"
              onClick={handleAcceptInviteLink}
              disabled={isAcceptingInviteLink}
            >
              <span>Accept invitation</span>
              <ArrowRight className="ml-1 h-5 w-5" strokeWidth={2.5} />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
