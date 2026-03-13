import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, ChevronDown, Copy, Plus, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  type AddFirstUsersValues,
  addFirstUsersSchema,
  firstUsersRoles,
  useCreateInvitationLinksMutation,
} from "@/entities/invitation";
import { useGetInviteLinkQuery } from "@/entities/invite-link";
import { getSiteBaseUrl } from "@/shared/lib/site-url";
import { capitalize, cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";

export const CreateOrganizationStep3Form = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orgId = searchParams.get("orgId");

  const { data: inviteLink, isLoading: isInviteLinkLoading } =
    useGetInviteLinkQuery(orgId);

  const fullInviteLink = useMemo(() => {
    if (!inviteLink?.token) {
      return "";
    }

    const inviteUrl = new URL("/organization", getSiteBaseUrl());
    inviteUrl.searchParams.set("invite", inviteLink.token);

    return inviteUrl.toString();
  }, [inviteLink?.token]);

  const {
    mutate: createInvitationLinks,
    isPending: isCreateInvitationLinksPending,
  } = useCreateInvitationLinksMutation();

  const form = useForm<AddFirstUsersValues>({
    resolver: zodResolver(addFirstUsersSchema),
    mode: "onChange",
    defaultValues: {
      invitations: [
        {
          email: "",
          role: "MANAGER",
        },
        {
          email: "",
          role: "USER",
        },
      ],
    },
    shouldUnregister: false,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "invitations",
  });

  const managerRows = useMemo(
    () =>
      fields
        .map((f, index) => ({ ...f, index }))
        .filter((f) => f.role === firstUsersRoles[1]),
    [fields],
  );

  const userRows = useMemo(
    () =>
      fields
        .map((f, index) => ({ ...f, index }))
        .filter((f) => f.role === firstUsersRoles[0]),
    [fields],
  );

  const users = form.watch("invitations");

  const hasAnyFilled = users.some((u) => u.email.trim() !== "");

  const hasInvalidFilled = users.some((u, i) => {
    const filled = u.email.trim() !== "";
    const hasEmailError = !!form.formState.errors.invitations?.[i]?.email;
    return filled && hasEmailError;
  });

  const ifFinishDisabled = hasAnyFilled && hasInvalidFilled;

  const [usersOpen, setUsersOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const inviteLinkRef = useRef<HTMLInputElement | null>(null);

  const handleCopy = async () => {
    if (!fullInviteLink) {
      return;
    }

    try {
      await navigator.clipboard.writeText(fullInviteLink);
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

  const onSubmit = (data: AddFirstUsersValues) => {
    const payload = {
      organizationId: orgId as string,
      invitations: data.invitations.filter((user) => user.email !== ""),
    };

    createInvitationLinks(payload, {
      onSuccess: () => router.replace(`/dashboard/${orgId}`),
    });
  };

  const isPending = isCreateInvitationLinksPending || isInviteLinkLoading;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10 h-full"
      >
        <div className="flex flex-1 flex-col gap-6">
          <div>
            <h4 className="text-xl font-medium text-gray-800 mb-2">
              Invite your first manager
            </h4>

            <div className="flex flex-col gap-2">
              {managerRows.map((user) => (
                <div key={user.id} className="flex items-stretch">
                  <FormField
                    control={form.control}
                    name={`invitations.${user.index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="rounded-r-none"
                            placeholder="alex@company.com"
                            autoComplete="none"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="w-32 flex items-center justify-center border border-input rounded-md border-l-none rounded-l-none bg-gray-100 px-5 text-gray-700 font-light text-sm">
                    {capitalize(firstUsersRoles[1])}
                  </div>
                  {managerRows.length > 1 && (
                    <button
                      type="button"
                      className="text-destructive hover:text-destructive/60 transition-colors cursor-pointer ml-1"
                      onClick={() => remove(user.index)}
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
              onClick={() => append({ email: "", role: firstUsersRoles[1] })}
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
                        {userRows.map((user) => (
                          <div key={user.id} className="flex items-stretch">
                            <FormField
                              control={form.control}
                              name={`invitations.${user.index}.email`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      className="rounded-r-none"
                                      placeholder="alex@company.com"
                                      autoComplete="none"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <div className="w-32 flex items-center justify-center border border-input rounded-md border-l-none rounded-l-none bg-gray-100 px-5 text-gray-700 font-light text-sm">
                              {capitalize(firstUsersRoles[0])}
                            </div>
                            {userRows.length > 1 && (
                              <button
                                type="button"
                                className="text-destructive hover:text-destructive/60 transition-colors cursor-pointer ml-1"
                                onClick={() => remove(user.index)}
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
                          append({ email: "", role: firstUsersRoles[0] })
                        }
                      >
                        <Plus className="size-4!" />
                        <span>Add another user</span>
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
                        value={fullInviteLink}
                        className="rounded-r-none"
                        disabled={isInviteLinkLoading}
                        ref={inviteLinkRef}
                      />
                      <Button
                        variant="outline"
                        type="button"
                        className="w-30 uppercase text-primary hover:text-primary border-l-none rounded-l-none"
                        onClick={handleCopy}
                        disabled={isInviteLinkLoading}
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
            <Link href={`/create-organization/step-2?orgId=${orgId}`}>
              <ArrowLeft className="mr-2 h-5 w-5" strokeWidth={2.5} />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="h-10 text-sm ml-auto"
            disabled={ifFinishDisabled || isPending}
          >
            Finish
          </Button>
        </footer>
      </form>
    </Form>
  );
};
