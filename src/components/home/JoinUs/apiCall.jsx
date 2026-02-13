import joinUsCat from "@/lib/data/homepage/joinUs";
import JoinUs from "./JoinUs";
import getImageUrl from "@/lib/utils/getImageUrl";

export const apiCall = async () => {
  const res = await joinUsCat();
  const content = res.data.joinUs;

  return (
    <JoinUs
      bgImg={getImageUrl(content?.bgImg?.url)}
    />
  );
};

export default apiCall;
