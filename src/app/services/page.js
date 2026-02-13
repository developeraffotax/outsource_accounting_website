import servicesApiCall from "@/components/home/Services/apiCall.jsx";
import joinUsApiCall from "@/components/home/JoinUs/apiCall.jsx";

export default async function services() {
  const Services = await servicesApiCall();
  const JoinUs = await joinUsApiCall();

  return (
    <>
      {Services}
      {JoinUs}
    </>
  );
}
