import { howItWorks } from "@/widgets/landing-page/consts";

export const HowItWorksSection = () => {
  return (
    <section className="bg-gray-50 py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mb-12 text-lg text-gray-600">
            Get started in minutes. No complicated setup required.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((item, index) => (
            <div key={item.id} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground z-10">
                  {index + 1}
                </div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
              {index < howItWorks.length - 1 && (
                <div className="absolute right-0 top-8 hidden h-0.5 w-full translate-x-1/2 bg-gray-300 lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
