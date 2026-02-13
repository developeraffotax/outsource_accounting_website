import heroData from "@/lib/data/homepage/heroData";
import Cards from "./Cards";
import getImageUrl from "@/lib/utils/getImageUrl";

export const apiCall = async () => {
  const res = await heroData();
  const cardsArray = res.data?.heroSection?.Card || [];

  return (
    <Cards
      cards={cardsArray.map((card) => ({
        id: card.id,
        imgComponent: getImageUrl(card.imgComponent?.url),
        title: card.title,
        content: card.content,
      }))}
    />
  );
};

export default apiCall;
