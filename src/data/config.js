// CUP2EAT Centralized Configuration & Business Details
// All business details, contact info, and demo parameters are centralized here.

export const BRAND_CONFIG = {
  name: "CUP2EAT",
  legalName: "CUP2EAT Private Limited (Demo)",
  primaryTagline: "EAT YOUR DRINK.",
  secondaryTagline: "The Cup You Can Eat.",
  coreMessage: "An edible way to make every sip more memorable.",
  supportingCopy: "More than just a cup. An experience you can sip and eat.",
  concept: "Why should the cup be something you throw away when it can become part of the experience?",
  
  // Brand Color Tokens
  colors: {
    emeraldGreen: "#0F5C47",
    deepForest: "#1F2A1A",
    antiqueGold: "#C9A24B",
    chocolateMaroon: "#6B2F33",
    darkCocoa: "#3B1F1A",
    sageCream: "#E5EAD9",
    warmOffWhite: "#F8F8F2",
    biscuitTan: "#D9A56B"
  },

  // Configurable Placeholders (Clearly identified for owner verification)
  contact: {
    phone: "+91 98765 43210", // Configurable placeholder
    phoneDisplay: "+91 (0) 98765 43210",
    email: "hello@cup2eat.demo", // Configurable placeholder
    businessEmail: "b2b@cup2eat.demo",
    address: "CUP2EAT Experience Hub, Bengaluru, Karnataka, India", // Configurable placeholder
    gstin: "29AAAAA0000A1Z5", // Demo GSTIN for invoices
    fssaiLicense: "FSSAI LIC. NO. 10023000000000 (Demo Verification Required)",
    businessHours: "Monday – Saturday: 9:00 AM – 7:00 PM IST",
    whatsappNumber: "919876543210", // Raw phone number for WhatsApp wa.me links
  },

  socials: {
    instagram: "https://instagram.com/cup2eat_official",
    facebook: "https://facebook.com/cup2eat",
    linkedin: "https://linkedin.com/company/cup2eat",
    youtube: "https://youtube.com/@cup2eat"
  },

  // Demo Admin Credentials
  adminAuth: {
    email: "admin@cup2eat.demo",
    password: "Cup2Eat@123",
    role: "Administrator (Demo)"
  },

  // Demo Customer Credentials
  demoCustomer: {
    name: "Aarav Sharma",
    email: "aarav@cup2eat.demo",
    password: "demoPassword123",
    phone: "+91 98765 00000",
    address: {
      street: "42, Brigade Road, Ashok Nagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560025"
    }
  },

  // Shipping & Order Rules
  commerce: {
    currency: "₹",
    currencyCode: "INR",
    freeShippingThreshold: 5000,
    standardShippingFee: 250,
    taxRate: 0.05, // 5% GST on packaged bakery/food items
    promoCodes: [
      { code: "CUP2EAT10", discountPercent: 10, minSpend: 2000, description: "10% off on trial orders above ₹2,000" },
      { code: "FIRSTSIP", discountFixed: 300, minSpend: 3000, description: "₹300 flat off on your first order" }
    ]
  },

  // Supplied Ingredients Information
  ingredientsNotice: {
    list: "Refined Wheat Flour (Maida), Wheat Flour, Pulses, Corn Flour, Dextrose Sugar, Salt, Emulsifiers, Food Colours INS 102, INS 122, INS 133, Acidity Regulator (INS 514), Vegetable Oil, Baking Powder E500, Artificial Flavouring Substances, Preservatives E223 & Spices.",
    disclaimer: "Information provided from initial brand specifications. Subject to full batch lab verification and packaging sign-off by CUP2EAT prior to commercial public rollout."
  }
};

// WhatsApp Link Generator with Pre-filled Messages
export function getWhatsAppUrl(type = "general", product = null) {
  const base = `https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}`;
  let text = "";

  switch (type) {
    case "product":
      text = `Hello CUP2EAT! I am interested in learning more about "${product?.name || 'Edible Cups'}" (${product?.capacity || ''}). Please share bulk pricing and delivery lead times.`;
      break;
    case "b2b":
      text = "Hello CUP2EAT! I run a café / business and would like to partner with you for serving edible cups. Please share your B2B wholesale catalogue.";
      break;
    case "bulk":
      text = "Hello CUP2EAT! I would like to place a bulk / event enquiry for edible cups. Please connect me with your sales team.";
      break;
    default:
      text = "Hello CUP2EAT! I visited your website and would like to learn more about your edible cups.";
      break;
  }

  return `${base}?text=${encodeURIComponent(text)}`;
}

