import { Star } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Checkbox } from "@/shared/ui/checkbox";
import type { OrganizationGoalEntity } from "../model/organization-goal.types";

interface OrganizationGoalItemProps {
  organizationGoal: OrganizationGoalEntity;
  isChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const OrganizationGoalCard = ({
  organizationGoal,
  isChecked,
  onCheckedChange,
}: OrganizationGoalItemProps) => {
  return (
    <label
      htmlFor={organizationGoal.id}
      key={organizationGoal.id}
      className="cursor-pointer"
    >
      <Card
        className={cn(
          "relative gap-4 h-full",
          isChecked && "bg-primary/3 border-primary/10",
        )}
      >
        {organizationGoal.isPopular && (
          <Badge className="bg-purple-200 border-purple-500 text-purple-800 absolute h-6 -top-3 right-6">
            <Star className="block size-4! fill-purple-500 text-transparent" />
            Popular
          </Badge>
        )}
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <Icon className="size-6 text-primary" />  TODO: Добавить иконку */}
            <h3 className="font-semibold">{organizationGoal.title}</h3>
          </div>
          <Checkbox
            id={organizationGoal.id}
            className="size-5 bg-primary/10 border-primary/10"
            onCheckedChange={onCheckedChange}
            checked={isChecked}
          />
        </CardHeader>
        <CardContent className="flex-1 text-muted-foreground text-sm">
          {organizationGoal.subTitle}
        </CardContent>
      </Card>
    </label>
  );
};
