import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  // 1. Get the secret from the URL params (?secret=...)
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  // 2. Validate the secret against your environment variable
  if (secret !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Strapi webhooks send the model name and the entry data
    const model = body.model;
    const entry = body.entry;

    const revalidatedPaths = [];

    // 3. Logic: Decide what to refresh based on the Strapi content type
    switch (model) {
      case "article":
        revalidatePath("/blogs");
        revalidatedPaths.push("/blogs");
        if (entry?.slug) {
          revalidatePath(`/blogs/${entry.slug}`);
          revalidatedPaths.push(`/blogs/${entry.slug}`);
        }
        break;

      case "service":
        revalidatePath("/services");
        revalidatedPaths.push("/services");
        if (entry?.slug) {
          revalidatePath(`/service/${entry.slug}`);
          revalidatedPaths.push(`/service/${entry.slug}`);
        }
        // Services also appear on homepage
        revalidatePath("/");
        revalidatedPaths.push("/");
        break;

      case "faq":
      case "general-quiz":
        revalidatePath("/faqs");
        revalidatedPaths.push("/faqs");
        break;

      case "contact-us":
        revalidatePath("/contactUs");
        revalidatedPaths.push("/contactUs");
        break;

      case "about-us":
      case "our-story":
      case "mission-statement":
      case "our-value":
        revalidatePath("/aboutus");
        revalidatedPaths.push("/aboutus");
        break;

      case "homepage":
      case "hero":
      case "testimonial":
      case "how-we-work":
      case "join-us":
      case "why-outsource":
        revalidatePath("/");
        revalidatedPaths.push("/");
        break;

      case "top-bar":
        // TopBar appears on all pages, revalidate layout
        revalidatePath("/", "layout");
        revalidatedPaths.push("/ (layout)");
        break;

      default:
        // Fallback: revalidate homepage for unknown models
        revalidatePath("/");
        revalidatedPaths.push("/");
    }

    console.log(`Revalidated paths for model "${model}":`, revalidatedPaths);

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      model: model,
      paths: revalidatedPaths,
    });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      { message: "Error revalidating", error: err.message },
      { status: 500 }
    );
  }
}
