import topBarQuery from "@/lib/data/topBarQuery";

const FALLBACK_CONTACT_INFO = {
  email: "admin@outsourceaccountings.co.uk",
  number: "0208 144 6811",
  euNumber: "+44 7802 611110",
};

const normalizeContactInfo = (raw = {}) => {
  const merged = { ...FALLBACK_CONTACT_INFO, ...raw };
  const whatsappDigits = String(merged.euNumber || "").replace(/\D/g, "");
  const phoneDigits = String(merged.number || "").replace(/\D/g, "");

  return {
    ...merged,
    mailtoHref: `mailto:${merged.email}`,
    telHref: phoneDigits ? `tel:+${phoneDigits}` : null,
    whatsappHref: whatsappDigits ? `https://wa.me/${whatsappDigits}` : null,
  };
};

export const getContactInfo = async () => {
  try {
    const res = await topBarQuery();
    return normalizeContactInfo(res?.data?.topBar);
  } catch (error) {
    console.error("Failed to load contact data:", error);
    return normalizeContactInfo();
  }
};

export { FALLBACK_CONTACT_INFO, normalizeContactInfo };
