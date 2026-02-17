import GetStartedButton from "@/components/shared/buttons/GetStartedButton";
import Container from "@/components/wraper/Container";

const GetStarted = ({ data }) => {
  return (
    <Container withYPadding={false} className="my-3 md:my-12 lg:my-24">
      <div className="rounded-2xl flex flex-col bg-blue-100 text-center gap-6 py-3 md:py-8 px-3 md:px-8">
        <h1 className="font-semibold text-2xl md:text-3xl text-blue-900">
          {data.heading}
        </h1>
        <div className="flex flex-col gap-2 ">
          <p>{data.descriptionone}</p>
          <p>{data.descriptiontwo}</p>
          <div className="my-3">
            <GetStartedButton />
          </div>
        </div>
      </div>
    </Container>
  );
};
export default GetStarted;
