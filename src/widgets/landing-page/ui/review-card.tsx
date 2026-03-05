import { Star } from "lucide-react";
import { UserAvatar } from "@/entities/user";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import type { Review } from "../consts";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Card className="h-full min-w-60 max-w-75 sm:max-w-100 shrink-0 select-none hover:bg-gray-50 active:bg-gray-50 transition-colors duration-75 gap-4">
      <CardHeader className="gap-0">
        <div className="flex items-center gap-1">
          {Array.from({ length: review.rating }, (_, i) => i).map((i) => (
            <Star key={i} className="size-4 fill-yellow-500 text-yellow-500" />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-4">
          {review.review}
        </p>
      </CardContent>
      <CardFooter className="flex gap-3 items-center mt-auto pt-2">
        <UserAvatar name={review.name} />
        <div>
          <p className="text-sm font-medium">{review.name}</p>
          <p className="text-sm text-muted-foreground">
            {review.company} \ {review.role}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};
