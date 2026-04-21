import { revalidatePath, revalidateTag } from "next/cache";
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
  "home-page": ["home-page"],
  homepage: ["home-page"],
  "buy-service": ["buy-service"],
  hero: ["home-page"],
  testimonial: ["home-page"],
  "how-we-work": ["home-page"],
  "join-us": ["home-page"],
  "why-outsource": ["home-page"],
  "top-bar": ["home-page"],
};

const modelToPaths = {
  article: ["/blogs"],
  service: ["/", "/services", "/service/[slug]", "/sitemap.xml"],
  faq: ["/faqs"],
  "general-quiz": ["/faqs"],
  "contact-us": ["/contactUs"],
  "about-us": ["/aboutus"],
  "our-story": ["/aboutus"],
  "mission-statement": ["/aboutus"],
  "our-value": ["/aboutus"],
  "home-page": ["/"],
  homepage: ["/"],
  "buy-service": ["/"],
  hero: ["/"],
  testimonial: ["/"],
  "how-we-work": ["/"],
  "join-us": ["/"],
  "why-outsource": ["/"],
  "top-bar": ["/"],
};

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("secret") !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }
  const model =
    typeof body?.model === "string" ? body.model.trim().toLowerCase() : "";

  if (!model) {
    return NextResponse.json(
      { message: "Missing model in request body" },
      { status: 400 },
    );
  }

  const tags = modelToTags[model] || [];
  const paths = modelToPaths[model] || [];

  tags.forEach((tag) => revalidateTag(tag, "max"));

  paths.forEach((path) => {
    if (path.includes("[")) {
      revalidatePath(path, "page");
      return;
    }

    revalidatePath(path);
  });

  // Buy service data is used in root layout (buy now button in navbar).
  if (model === "buy-service") {
    revalidatePath("/", "layout");
  }

  return NextResponse.json({ revalidated: true, model, tags, paths });
}
