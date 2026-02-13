import React, { forwardRef, useEffect, useState } from "react";
import Card from "./Card";
import testimonialData from "@/lib/data/homepage/testimonial";
import getImageUrl from "@/lib/utils/getImageUrl";

const Cards = forwardRef((props, ref) => {
  const [testimonialCardContent, setTestimonialCardContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await testimonialData();
      setTestimonialCardContent(
        res.data?.clientsTestimonial?.testimonialCard || []
      );
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <section className="w-full h-[95vh] lg:h-[90vh] flex items-center justify-center">
        Loading...
      </section>
    );
  }
  if (!testimonialCardContent) {
    return null;
  }

  return (
    <div
      ref={ref}
      className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-8 px-2"
    >
      {testimonialCardContent.map((card, index) => {
        return (
          <div key={card.id || index} className="flex">
            <Card
              key={card.id || index}
              bgImg={getImageUrl(card.testimonialBgImg?.url)}
              personImg={getImageUrl(card.testimonialPersonImg?.url)}
              name={card.testimonialPersonName}
              title={card.testimonialTitle}
              description={card.testimonialDescription}
            />
          </div>
        );
      })}
    </div>
  );
});

export default Cards;
