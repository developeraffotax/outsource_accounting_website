import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const modelToTags = {
  article: ["articles"], // use actual endpoint used by blogs fetch helper
  service: ["services", "home-page"],
  faq: ["faq"],
  "general-quiz": ["faq"],
  "contact-us": ["contact-us"],
  "about-us": ["about-us"],
  "our-story": ["about-us"],
  "mission-statement": ["about-us"],
  "our-value": ["about-us"],
  homepage: ["home-page"],
  hero: ["home-page"],
  testimonial: ["home-page"],
  "how-we-work": ["home-page"],
  "join-us": ["home-page"],
  "why-outsource": ["home-page"],
  "top-bar": ["home-page"],
};

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("secret") !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const body = await request.json();
  const tags = modelToTags[body.model] || [];
  tags.forEach((tag) => revalidateTag(tag));

  return NextResponse.json({ revalidated: true, model: body.model, tags });
}
