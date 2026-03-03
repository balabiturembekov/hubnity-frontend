import { UserStar } from "lucide-react";
import { reviews } from "../consts";
import { ReviewCard } from "./review-card";
import { SectionHeader } from "./section-header";

const half = Math.ceil(reviews.length / 2);
const row1 = reviews.slice(0, half);
const row2 = reviews.slice(half);

const extendedRow1 = [...row1, ...row1, ...row1].map((review, index) => ({
  ...review,
  uniqueId: `row1-${review.id}-${index}`,
}));

const extendedRow2 = [...row2, ...row2, ...row2].map((review, index) => ({
  ...review,
  uniqueId: `row2-${review.id}-${index}`,
}));

export const ReviewsSection = () => {
  return (
    <section
      id="reviews"
      className="relative pb-20 sm:pb-32 pt-20 space-y-18 scroll-mt-6 sm:scroll-mt-14 lg:scroll-mt-2 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          title="What Our Customers Say"
          description="Read reviews from our satisfied customers and see how our time tracking software has helped them improve their productivity and attendance."
          badge="Reviews"
          Icon={UserStar}
        />
      </div>

      <div className="relative overflow-hidden w-full py-8 -my-8">
        <div className="relative flex flex-col gap-6 py-4 w-full -rotate-1 transform-gpu">
          <div className="flex w-max animate-marquee hover:paused active:paused will-change-transform transform-gpu">
            {[1, 2].map((group) => (
              <div
                key={`group1-${group}`}
                className="flex gap-6 px-3"
                aria-hidden={group === 2 ? "true" : "false"}
              >
                {extendedRow1.map((review) => (
                  <div
                    key={`${group}-${review.uniqueId}`}
                    className="shrink-0 select-none transform-gpu backface-hidden"
                  >
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex w-max animate-marquee-reverse hover:paused active:paused will-change-transform transform-gpu">
            {[1, 2].map((group) => (
              <div
                key={`group2-${group}`}
                className="flex gap-6 px-3"
                aria-hidden={group === 2 ? "true" : "false"}
              >
                {extendedRow2.map((review) => (
                  <div
                    key={`${group}-${review.uniqueId}`}
                    className="shrink-0 select-none transform-gpu backface-hidden"
                  >
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background to-transparent z-10 transform-gpu" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background to-transparent z-10 transform-gpu" />
        </div>
      </div>
    </section>
  );
};
