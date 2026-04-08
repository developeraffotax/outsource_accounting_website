import GetStartedButton from "@/components/shared/buttons/GetStartedButton";
import getImageUrl from "@/lib/utils/getImageUrl";
import Container from "@/components/wraper/Container";

const AnnualAcounts = ({ data }) => {
  const imgUrl = getImageUrl(data.img?.url);

  return (
    <Container withYPadding={false} className="py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="flex flex-col gap-4 md:gap-6 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {data.heading}
          </h1>
          <p className="font-light text-gray-700">{data.descriptionOne}</p>
          <p className="font-light text-gray-700">{data.descriptionTwo}</p>
          <div className="flex justify-center lg:justify-start">
            <GetStartedButton />
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-xl overflow-hidden rounded-2xl shadow-lg">
            <img
              src={imgUrl}
              alt="Annual accounts preparation illustration"
              className="w-full h-auto aspect-video lg:aspect-4/3 object-cover"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
export default AnnualAcounts;
