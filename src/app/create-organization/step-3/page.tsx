"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  Plus,
  X,
} from "lucide-react";
import Link from "next/link";
import { Suspense, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useRequireOrganization } from "@/features/create-organization";
import { capitalize, cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { CreateOrganizationLayout } from "@/widgets/organization";

enum InviteUserRole {
  MANAGER = "MANAGER",
  USER = "USER",
}

type InviteUserType = {
  id: string;
  email: string;
  role: InviteUserRole;
};

const INVITE_LINK = "https://hubnity.de/organization?invite=token";

const CreateOrganizationStep3PageContent = () => {
  const [invitedUsers, setInvitedUsers] = useState<InviteUserType[]>([
    {
      id: "1",
      email: "",
      role: InviteUserRole.MANAGER,
    },
    {
      id: "2",
      email: "",
      role: InviteUserRole.USER,
    },
  ]);
  const [usersOpen, setUsersOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const invitedManagers = useMemo(
    () => invitedUsers.filter((user) => user.role === InviteUserRole.MANAGER),
    [invitedUsers],
  );
  const invitedEmployees = useMemo(
    () => invitedUsers.filter((user) => user.role === InviteUserRole.USER),
    [invitedUsers],
  );
  const inviteLinkRef = useRef<HTMLInputElement | null>(null);
  const { isReady } = useRequireOrganization();

  if (!isReady) return null;

  const handleAddInvitedUser = (role: InviteUserRole) => {
    setInvitedUsers((prev) => [
      ...prev,
      { id: invitedUsers[invitedUsers.length - 1].id + 1, email: "", role },
    ]);
  };

  const handleRemoveInvitedUser = (id: string) => {
    setInvitedUsers((prev) => prev.filter((i) => i.id !== id));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INVITE_LINK);
    } catch {
      inviteLinkRef.current?.select();
      document.execCommand("copy");
    }

    toast.success("Link copied!");

    setLinkCopied(true);

    setTimeout(() => {
      setLinkCopied(false);
    }, 1000);
  };

  return (
    <CreateOrganizationLayout currentStep={3}>
      {/* <Form {...form}> */}
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10 h-full"
      >
        <div className="flex flex-1 flex-col gap-6">
          <div>
            <h4 className="text-xl font-medium text-gray-800 mb-2">
              Invite your first manager
            </h4>

            <div className="flex flex-col gap-2">
              {invitedManagers.map((user) => (
                <div key={user.id} className="flex items-stretch">
                  <Input
                    className="rounded-r-none"
                    placeholder="alex@company.com"
                  />
                  <div className="w-32 flex items-center justify-center border border-input rounded-md border-l-none rounded-l-none bg-gray-100 px-5 text-gray-700 font-light text-sm">
                    {capitalize(InviteUserRole.MANAGER)}
                  </div>
                  {invitedManagers.length > 1 && (
                    <button
                      type="button"
                      className="text-destructive hover:text-destructive/60 transition-colors cursor-pointer ml-1"
                      onClick={() => handleRemoveInvitedUser(user.id)}
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="link"
              type="button"
              className="gap-0 px-0!"
              onClick={() => handleAddInvitedUser(InviteUserRole.MANAGER)}
            >
              <Plus className="size-4!" />
              <span>Add another manager</span>
            </Button>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => setUsersOpen((prev) => !prev)}
            >
              <ChevronDown
                className={cn("transition-transform", {
                  "-rotate-180": usersOpen,
                })}
              />
              <span>Or, invite your users</span>
            </Button>

            <AnimatePresence>
              {usersOpen && (
                <motion.div
                  initial={{
                    height: 0,
                  }}
                  animate={{
                    height: "auto",
                  }}
                  exit={{
                    height: 0,
                  }}
                  transition={{
                    duration: 0.1,
                    ease: "easeInOut",
                  }}
                  className="w-full overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-5"
                >
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xl font-medium text-gray-800 mb-2 leading-4">
                        Invite members via email
                      </h4>
                      <p className="text-sm text-muted-foreground font-light">
                        You can always invite members later.
                      </p>
                    </div>
                    <div>
                      <div className="flex flex-col gap-2">
                        {invitedEmployees.map((user) => (
                          <div key={user.id} className="flex items-stretch">
                            <Input
                              className="rounded-r-none"
                              placeholder="alex@company.com"
                            />
                            <div className="w-32 flex items-center justify-center border border-input rounded-md border-l-none rounded-l-none bg-gray-100 px-5 text-gray-700 font-light text-sm">
                              {capitalize(InviteUserRole.USER)}
                            </div>
                            {invitedEmployees.length > 1 && (
                              <button
                                type="button"
                                className="text-destructive hover:text-destructive/60 transition-colors cursor-pointer ml-1"
                                onClick={() => handleRemoveInvitedUser(user.id)}
                              >
                                <X size={18} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="link"
                        type="button"
                        className="gap-0 px-0!"
                        onClick={() =>
                          handleAddInvitedUser(InviteUserRole.USER)
                        }
                      >
                        <Plus className="size-4!" />
                        <span>Add another manager</span>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xl font-medium text-gray-800 mb-2 leading-4">
                        Send an invite link
                      </h4>
                      <p className="text-sm text-muted-foreground font-light">
                        Copy the link below to send to your team.
                      </p>
                    </div>
                    <div className="flex">
                      <Input
                        readOnly
                        value={INVITE_LINK}
                        className="rounded-r-none"
                        ref={inviteLinkRef}
                      />
                      <Button
                        variant="outline"
                        type="button"
                        className="w-30 uppercase text-primary hover:text-primary border-l-none rounded-l-none"
                        onClick={handleCopy}
                      >
                        {linkCopied ? (
                          <Check />
                        ) : (
                          <>
                            Copy
                            <Copy />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <footer className="w-full flex items-center justify-between fixed lg:static bottom-0 left-0 bg-gray-100 lg:bg-background py-3 lg:py-0 px-5 sm:px-10 lg:px-0 shadow-[0_-1px_3px_0_#0000001a] lg:shadow-none">
          <Button asChild variant="outline" size="lg" className="h-10 text-sm">
            {/* TODO: Поставить настоящий id */}
            <Link href={`/create-organization/step-2?${123123}`}>
              <ArrowLeft className="mr-2 h-5 w-5" strokeWidth={2.5} />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="h-10 text-sm ml-auto"
            // disabled={!form.formState.isValid || isPending}
          >
            Next step
            <ArrowRight className="ml-2 h-5 w-5" strokeWidth={2.5} />
          </Button>
        </footer>
      </form>
      {/* </Form> */}
    </CreateOrganizationLayout>
  );
};

export default function CreateOrganizationStep3Page() {
  return (
    <Suspense>
      <CreateOrganizationStep3PageContent />
    </Suspense>
  );
}
