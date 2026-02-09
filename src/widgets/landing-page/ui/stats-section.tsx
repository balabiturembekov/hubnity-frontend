import { stats } from "@/widgets/landing-page/consts";

export const StatsSection = () => {
  return (
    <section className="border-y bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="mb-2 text-3xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
