"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, ChartPie } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { type ControllerRenderProps, useForm } from "react-hook-form";
import {
  type AddOrganizationGoalsValues,
  addOrganizationGoalsSchema,
  useAddOrganizationGoalsMutation,
} from "@/entities/organization";
import {
  OrganizationGoalCard,
  OrganizationGoalCardSkeleton,
  useGetOrganizationGoalsQuery,
} from "@/entities/organization-goal";
import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/form";
import { EmptyState } from "@/widgets/empty-state";

export const CreateOrganizationStep2Form = () => {
  const searchParams = useSearchParams();
  const orgId = searchParams.get("orgId");
  const router = useRouter();

  const {
    data: organizationGoals,
    isLoading,
    error,
  } = useGetOrganizationGoalsQuery();

  const form = useForm<AddOrganizationGoalsValues>({
    resolver: zodResolver(addOrganizationGoalsSchema),
    mode: "onChange",
    defaultValues: {
      goalsIds: [],
    },
  });

  const { mutate: addOrganizationGoals, isPending } =
    useAddOrganizationGoalsMutation();

  const handleCheckedChange = (
    checked: boolean,
    field: ControllerRenderProps<AddOrganizationGoalsValues, "goalsIds">,
    goalId: string,
  ) => {
    return checked
      ? field.onChange([...(field.value || []), goalId])
      : field.onChange(field.value?.filter((value) => value !== goalId));
  };

  const onSubmit = (data: AddOrganizationGoalsValues) => {
    if (!orgId) return;

    addOrganizationGoals(
      {
        orgId,
        goalsIds: data.goalsIds,
      },
      {
        onSuccess: () => {
          router.push(`/create-organization/step-3?orgId=${orgId}`);
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10 h-full"
      >
        <div className="flex flex-1 flex-col gap-6">
          {error && (
            <EmptyState
              icon={<AlertCircle className="size-12 mx-auto" />}
              title="Failed to load goals"
              description="An error occurred while loading organization goals. Please try again later."
            />
          )}

          {organizationGoals?.length === 0 && (
            <EmptyState
              icon={<ChartPie className="size-12 mx-auto" />}
              title="No goals available"
              description="The list of organization goals is currently empty. Please try refreshing the page or check back later."
            />
          )}

          {(isLoading ||
            (organizationGoals && organizationGoals.length > 0)) && (
            <FormField
              control={form.control}
              name="goalsIds"
              render={() => (
                <FormItem>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {isLoading &&
                      Array.from({ length: 8 }, (_, i) => i).map((i) => (
                        <OrganizationGoalCardSkeleton key={i} />
                      ))}

                    {organizationGoals?.map((organizationGoal) => (
                      <FormField
                        key={organizationGoal.id}
                        control={form.control}
                        name="goalsIds"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormControl>
                                <OrganizationGoalCard
                                  organizationGoal={organizationGoal}
                                  isChecked={field.value?.includes(
                                    organizationGoal.id,
                                  )}
                                  onCheckedChange={(checked) => {
                                    handleCheckedChange(
                                      checked,
                                      field,
                                      organizationGoal.id,
                                    );
                                  }}
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
          )}
        </div>
        <footer className="w-full flex items-center justify-between fixed lg:static bottom-0 left-0 bg-gray-100 lg:bg-background py-3 lg:py-0 px-5 sm:px-10 lg:px-0 shadow-[0_-1px_3px_0_#0000001a] lg:shadow-none">
          <Button
            size="lg"
            className="h-10 text-sm ml-auto"
            disabled={!form.formState.isValid || isPending}
          >
            Next step
            <ArrowRight className="ml-2 h-5 w-5" strokeWidth={2.5} />
          </Button>
        </footer>
      </form>
    </Form>
  );
};
