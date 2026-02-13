import AboutHero from "@/components/about/AboutHero/AboutHero.jsx";
import MissionStatement from "@/components/about/MissionStatement/MissionStatement";
import OurStoryPg from "@/components/about/OurStory/OurStory";
import OurValues from "@/components/about/OurValues/OurValues";
import joinUsApiCall from "@/components/home/JoinUs/apiCall.jsx";

export default async function aboutus() {
  const JoinUs = await joinUsApiCall();
  return (
    <>
      <AboutHero />
      <OurStoryPg />
      <MissionStatement />
      <OurValues />
      {JoinUs}
    </>
  );
}
