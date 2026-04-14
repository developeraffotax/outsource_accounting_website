import Container from "@/components/wraper/Container";
import Cards from "./subComponents/Cards";

const Pricing = ({ data }) => {
  const pricingConfig = data?.config || {};
  const pricingPlans = Array.isArray(data?.plans) ? data.plans : [];

  if (!Array.isArray(pricingPlans) || pricingPlans.length === 0) {
    return null;
  }

  return (
    <Container withYPadding={false} className="my-6 md:my-12 lg:my-16">
      <section
        id="pricing"
        className="rounded-2xl border border-blue-100 bg-linear-to-b from-blue-50 to-white px-4 py-8 md:px-8 md:py-10"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">
            {pricingConfig.eyebrow || "Transparent Pricing"}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-gray-900 md:text-4xl">
            {pricingConfig.title || "Service Plans"}
          </h2>
          <p className="mt-3 text-sm text-gray-600 md:text-base">
            {pricingConfig.description ||
              "Pick a package that fits your needs with clear, fixed pricing."}
          </p>
        </div>

        <Cards data={pricingPlans} />
      </section>
    </Container>
  );
};

export default Pricing;
