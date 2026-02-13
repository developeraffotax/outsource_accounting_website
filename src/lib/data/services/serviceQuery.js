import fetchData from "../mainEndPoint";
export async function getServiceBySlug(slug) {
  return fetchData("services", {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      image: true,
      bgImage: true,
      WhatYouGet: {
        populate: {
          card: {
            populate: {
              img: true,
            },
          },
        },
      },
      WhyChooseUs: {
        populate: {
          img: true,
          Card: {
            populate: {
              img: true,
            },
          },
        },
      },
      ServiceProcess: {
        populate: {
          stepCard: {
            populate: {
              imgSrc: true,
            },
          },
        },
      },
      WhatData: {
        populate: {
          img: true,
        },
      },
      WhoData: {
        populate: {
          img: true,
        },
      },
      GetStarted: true,
      statics: {
        populate: {
          imgOne: true,
          data: {
            populate: {
              img: true,
            },
          },
        },
      },
    },
  });
}

export async function getAllServices() {
  return fetchData("services", {
    fields: ["slug"],
  });
}
