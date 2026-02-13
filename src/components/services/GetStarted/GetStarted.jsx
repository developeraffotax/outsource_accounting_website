import GetStartedButton from "@/components/shared/buttons/GetStartedButton";

const GetStarted = ({ data }) => {
  return (
    <div className="rounded-2xl flex flex-col bg-blue-100 text-center gap-6 my-3 md:my-12 mx-3 md:mx-24 lg:my-24 2xl:mx-76 py-3 md:py-8 px-4 md:px-24">
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
  );
};
export default GetStarted;
