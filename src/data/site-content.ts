import type {
  BlogPost,
  GalleryImage,
  NavItem,
  Product,
  Service,
  SiteStat,
  TeamMember,
  Testimonial
} from "@/types";
import { paragraphsToHtml } from "@/lib/blog-content";

export const businessName = "iFarmer Agricultural Products Services Limited";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ifarmerslimited.com";

export const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://ifarmer-backend.onrender.com/api";

export const contactInfo = {
  phoneDisplay: "+234 904 605 0154",
  phoneRaw: "+2349046050154",
  email: "info@ifarmerslimited.com",
  whatsapp: "https://wa.me/2349046050154",
  addressLines: [
    "Amb I Osakwe House",
    "Innerblock Street",
    "Central Business District",
    "Abuja, Nigeria"
  ],
  openingHours: "Mon - Fri: 8:00am - 6:00pm"
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Knowledge Center", href: "/knowledge" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" }
];

export const homeSlides = [
  {
    image: "/assets/hero/hero1.jpg",
    title: "Innovating Agriculture for a Sustainable Future",
    subtitle:
      "Precision solutions, reliable supply chains, and export-ready agricultural products for modern farms and agribusinesses.",
    cta: "Explore Services",
    href: "/services"
  },
  {
    image: "/assets/hero/hero2.webp",
    title: "Premium Fertilizer Blending Solutions",
    subtitle:
      "Custom NPK formulations designed around soil needs, crop performance, and operational efficiency.",
    cta: "Request Custom Blend",
    href: "/services/fertilizer-blending"
  },
  {
    image: "/assets/hero/hero5.webp",
    title: "Trusted Agricultural Product Supply",
    subtitle:
      "From ginger and soy beans to sesame seeds, cashew, tigernut, cocoa, and hibiscus, we support bulk buyers with quality sourcing.",
    cta: "Visit the Shop",
    href: "/shop"
  },
  {
    image: "/assets/hero/hero4.webp",
    title: "Business-Ready Digital Agriculture Support",
    subtitle:
      "Farm management software, reporting, training, and project support designed for scale.",
    cta: "Book an Appointment",
    href: "/book-appointment"
  }
];

export const services: Service[] = [
  {
    title: "Fertilizer Blending",
    slug: "fertilizer-blending",
    summary:
      "Custom NPK formulations tailored to crop, soil, and performance goals.",
    description:
      "Our state-of-the-art blending facility produces custom NPK formulations tailored to specific soil and crop requirements.",
    longDescription: [
      "iFarmer Agricultural Products Services Limited delivers fertilizer blending services designed for crop-specific and soil-specific results. We work with growers, cooperatives, programmes, and agribusiness buyers that need dependable formulations and consistent output.",
      "Our blending process focuses on product consistency, formulation accuracy, and operational support. Beyond product delivery, we also support clients with advisory guidance on crop suitability, field requirements, and practical implementation.",
      "This service is ideal for intervention programmes, commercial farms, distributors, and institutional buyers looking for a reliable fertilizer partner in Nigeria."
    ],
    image:
      "https://d64gsuwffb70l.cloudfront.net/692e6b896dea5f3608504ed6_1764649956214_0a045282.webp",
    heroImage:
      "https://d64gsuwffb70l.cloudfront.net/692e6b896dea5f3608504ed6_1764649956214_0a045282.webp",
    features: [
      "Custom NPK ratios based on soil analysis",
      "Micro-nutrient enrichment options",
      "Bulk and retail packaging",
      "Quality-tested and certified production",
      "Fast turnaround times",
      "Technical support and deployment guidance"
    ],
    highlights: [
      { label: "NPK Variants", value: "50+" },
      { label: "Delivery", value: "Nationwide" },
      { label: "Use Case", value: "Commercial & Programmes" }
    ],
    seoTitle:
      "Fertilizer Blending Services | iFarmer Agricultural Products Services Limited",
    seoDescription:
      "Custom fertilizer blending services in Nigeria for programmes, commercial farms, and agribusiness buyers.",
    cta: "Request Custom Blend"
  },
  {
    title: "Input Supply",
    slug: "input-supply",
    summary:
      "Quality seeds, fertilizers, chemicals, and field tools from trusted sources.",
    description:
      "We supply high-quality agricultural inputs including seeds, fertilizers, crop protection chemicals, and field tools.",
    longDescription: [
      "Our input supply service supports farmers, projects, and agribusiness operators with dependable agricultural products sourced for performance and reliability.",
      "We help clients access quality seeds, fertilizers, soil amendments, crop protection inputs, and operational farm materials with a service model focused on availability and responsiveness.",
      "This service strengthens procurement workflows for institutions and helps reduce sourcing delays for farms and rural value chains."
    ],
    image:
      "https://d64gsuwffb70l.cloudfront.net/692e6b896dea5f3608504ed6_1764649958165_0c643f7a.webp",
    heroImage:
      "https://d64gsuwffb70l.cloudfront.net/692e6b896dea5f3608504ed6_1764649958165_0c643f7a.webp",
    features: [
      "Certified seeds from leading breeders",
      "Premium fertilizers and soil amendments",
      "Crop protection chemicals",
      "Modern farming equipment and tools",
      "Irrigation supply support",
      "Bulk pricing for enterprise buyers"
    ],
    highlights: [
      { label: "Products", value: "500+" },
      { label: "Support", value: "Procurement Ready" },
      { label: "Delivery", value: "Bulk & Retail" }
    ],
    seoTitle:
      "Agricultural Input Supply | iFarmer Agricultural Products Services Limited",
    seoDescription:
      "Agricultural input supply for seeds, fertilizers, chemicals, and farm tools across Nigeria.",
    cta: "Request a Quote"
  },
  {
    title: "Agricultural Project Management",
    slug: "agricultural-project-management",
    summary:
      "End-to-end planning, deployment, monitoring, and farmer support programmes.",
    description:
      "We manage agricultural projects from setup through training, field monitoring, and performance evaluation.",
    longDescription: [
      "iFarmer supports agricultural projects with operational structure, programme coordination, and field-level execution support.",
      "Our team works with public-sector initiatives, development programmes, private agribusiness projects, and commercial operations that require planning, monitoring, reporting, and implementation support.",
      "The goal is to help clients deliver better project outcomes with clearer execution systems and stronger reporting discipline."
    ],
    image:
      "https://d64gsuwffb70l.cloudfront.net/692e6b896dea5f3608504ed6_1764649959108_f4bc7b5f.webp",
    heroImage:
      "https://d64gsuwffb70l.cloudfront.net/692e6b896dea5f3608504ed6_1764649959108_f4bc7b5f.webp",
    features: [
      "Project planning and deployment support",
      "Farmer training and extension coordination",
      "Monitoring and evaluation frameworks",
      "Programme reporting support",
      "Market linkage guidance",
      "Field operations advisory"
    ],
    highlights: [
      { label: "Farmers Reached", value: "50,000+" },
      { label: "States Served", value: "23" },
      { label: "Coverage", value: "Dry & Wet Seasons" }
    ],
    seoTitle:
      "Agricultural Project Management | iFarmer Agricultural Products Services Limited",
    seoDescription:
      "Agricultural project management services for government programmes, commercial farms, and agribusiness projects.",
    cta: "Book a Consultation"
  },
  {
    title: "Agri Software Solutions",
    slug: "agri-software-solutions",
    summary:
      "Digital agriculture tools for planning, monitoring, reporting, and operational visibility.",
    description:
      "Smart software support for data-driven agricultural decisions, reporting, and farm operations.",
    longDescription: [
      "Our agri software solutions are designed to help farms and agricultural programmes organise information better, improve visibility, and support faster decision-making.",
      "The service combines digital workflows with agricultural operations so that clients can manage activities, track outcomes, and improve reporting across teams and project cycles.",
      "This is especially useful for organisations that need structured operational data, field monitoring, and management insight."
    ],
    image:
      "https://d64gsuwffb70l.cloudfront.net/692e6b896dea5f3608504ed6_1764649957169_eb6b50d3.webp",
    heroImage:
      "https://d64gsuwffb70l.cloudfront.net/692e6b896dea5f3608504ed6_1764649957169_eb6b50d3.webp",
    features: [
      "Farm management dashboards",
      "Operational tracking support",
      "Weather and field reporting workflows",
      "Expense and performance visibility",
      "Yield planning support",
      "Accessible web-first deployment"
    ],
    highlights: [
      { label: "Deployment", value: "Cloud Based" },
      { label: "Insight", value: "Decision Support" },
      { label: "Benefit", value: "Reporting Ready" }
    ],
    seoTitle:
      "Agri Software Solutions | iFarmer Agricultural Products Services Limited",
    seoDescription:
      "Agri software solutions for farm management, monitoring, analytics, and agricultural reporting.",
    cta: "Request a Demo"
  }
];

export const products: Product[] = [
  {
    name: "Ginger",
    slug: "ginger",
    summary:
      "Export-ready ginger sourced from Nigerian farmers and aggregators for bulk buyers.",
    description:
      "Premium ginger supplied for processors, exporters, distributors, and commercial buyers.",
    details: [
      "Our ginger supply service supports bulk procurement for local processing, export operations, and large commercial buying requirements.",
      "We focus on quality sourcing, commercial readiness, and relationship-based supply support so buyers can engage with more confidence.",
      "Requests are handled based on volume, destination, quality preference, and order timing."
    ],
    image: "/assets/gallery/ginger.jpg",
    gallery: ["/assets/gallery/ginger.jpg", "/assets/gallery/export1.png"],
    category: "Spices",
    origin: "Nigeria",
    minOrder: "Custom bulk request",
    availability: "Seasonal / Bulk supply",
    seoTitle:
      "Buy Ginger in Bulk | iFarmer Agricultural Products Services Limited",
    seoDescription:
      "Bulk ginger supply for exporters, processors, and commercial buyers from Nigeria.",
    useCases: ["Export supply", "Processing", "Bulk trading"]
  },
  {
    name: "Soy Beans",
    slug: "soy-beans",
    summary:
      "Commercial soy beans for food processing, feed production, export, and commodity trading.",
    description:
      "Quality soy beans supplied for industrial buyers, commodity traders, and agribusiness processors.",
    details: [
      "We support soy bean sourcing for processors, aggregators, wholesalers, and buyers requiring dependable commercial supply.",
      "Orders can be tailored around use case, quality preference, and delivery expectation.",
      "The service is designed to simplify sourcing conversations and help buyers move from enquiry to commercial evaluation quickly."
    ],
    image: "/assets/gallery/soyabeans.jpg",
    gallery: ["/assets/gallery/soyabeans.jpg", "/assets/gallery/gallery10.jpg"],
    category: "Grains",
    origin: "Nigeria",
    minOrder: "Bulk quotation basis",
    availability: "Available on request",
    seoTitle:
      "Soy Beans Supply in Nigeria | iFarmer Agricultural Products Services Limited",
    seoDescription:
      "Bulk soy beans supply for feed mills, processors, exporters, and commodity buyers.",
    useCases: ["Feed production", "Food processing", "Commodity trading"]
  },
  {
    name: "Sesame Seeds",
    slug: "sesame-seeds",
    summary:
      "Sesame seed supply for export buyers and local processors needing quality bulk fulfilment.",
    description:
      "Commercial sesame seed sourcing and fulfilment for wholesale and export demand.",
    details: [
      "Our sesame seed offering is built for commercial supply conversations with processors, exporters, and institutional commodity buyers.",
      "We support enquiries with volume-based coordination and buyer requirement handling.",
      "This helps businesses access sourcing support with clearer communication and faster commercial screening."
    ],
    image: "/assets/gallery/sesame.jpg",
    gallery: ["/assets/gallery/sesame.jpg", "/assets/gallery/gallery11.jpg"],
    category: "Oil Seeds",
    origin: "Nigeria",
    minOrder: "Bulk order request",
    availability: "Available on request",
    seoTitle:
      "Sesame Seeds Supply | iFarmer Agricultural Products Services Limited",
    seoDescription:
      "Bulk sesame seed supply for exporters, commodity traders, and processors in Nigeria.",
    useCases: ["Export", "Processing", "Commodity sourcing"]
  },
  {
    name: "Cashew",
    slug: "cashew",
    summary:
      "Commercial cashew sourcing support for local and international buyers.",
    description:
      "Cashew supply support for buyers looking for dependable sourcing relationships in Nigeria.",
    details: [
      "We support cashew procurement for trade and export-oriented demand, with sourcing support matched to buyer needs.",
      "The focus is on responsiveness, quality conversations, and structured commercial engagement.",
      "Cashew requests can include order timing, destination, and commercial detail requirements."
    ],
    image: "/assets/gallery/cashew.webp",
    gallery: ["/assets/gallery/cashew.webp", "/assets/gallery/gallery15.jpg"],
    category: "Nuts",
    origin: "Nigeria",
    minOrder: "Bulk order request",
    availability: "Seasonal / enquiry based",
    seoTitle:
      "Cashew Supply in Nigeria | iFarmer Agricultural Products Services Limited",
    seoDescription:
      "Bulk cashew sourcing and supply support for exporters, traders, and processors.",
    useCases: ["Export supply", "Commodity trade", "Food processing"]
  },
  {
    name: "Tigernut",
    slug: "tigernut",
    summary:
      "Bulk tigernut supply for processing, trading, and export-led demand.",
    description:
      "Sourcing support for tigernut buyers that need reliable agricultural product access.",
    details: [
      "Our tigernut product page supports commercial buyers looking for sourcing conversations that can move toward fulfilment.",
      "We position enquiries around buyer detail, quantity expectation, and destination information.",
      "This helps the admin team respond with clearer commercial follow-up."
    ],
    image: "/assets/gallery/tiggernut.jpeg",
    gallery: ["/assets/gallery/tiggernut.jpeg", "/assets/gallery/gallery16.jpg"],
    category: "Specialty Crops",
    origin: "Nigeria",
    minOrder: "Bulk quotation basis",
    availability: "Available on request",
    seoTitle:
      "Tigernut Supply | iFarmer Agricultural Products Services Limited",
    seoDescription:
      "Bulk tigernut supply and sourcing support for processors, traders, and export buyers.",
    useCases: ["Processing", "Beverage production", "Trading"]
  },
  {
    name: "Hibiscus",
    slug: "hibiscus",
    summary:
      "Commercial hibiscus supply for export, processing, and agribusiness buyers.",
    description:
      "Bulk hibiscus sourcing support for local and international demand channels.",
    details: [
      "We help buyers submit structured requests for hibiscus sourcing based on their commercial needs.",
      "The product service is positioned for export-oriented demand, processing use, and commodity supply conversations.",
      "Buyers can submit quantity and destination detail directly from the product page."
    ],
    image: "/assets/gallery/hibiscus.jpg",
    gallery: ["/assets/gallery/hibiscus.jpg", "/assets/gallery/gallery17.jpg"],
    category: "Flowers & Herbs",
    origin: "Nigeria",
    minOrder: "Bulk quotation basis",
    availability: "Available on request",
    seoTitle:
      "Hibiscus Bulk Supply | iFarmer Agricultural Products Services Limited",
    seoDescription:
      "Bulk hibiscus supply for exporters, processors, and commodity buyers from Nigeria.",
    useCases: ["Export", "Processing", "Commodity sourcing"]
  },
  {
    name: "Cocoa",
    slug: "cocoa",
    summary:
      "Bulk cocoa sourcing support for exporters, processors, and commodity buyers.",
    description:
      "Commercial cocoa supply positioned for trade, processing, and export channels.",
    details: [
      "Our cocoa sourcing workflow is designed for agribusiness buyers that need a credible conversation path from enquiry to commercial review.",
      "The product page supports lead capture with the buyer detail needed for follow-up.",
      "This improves commercial handling compared with a generic contact-only workflow."
    ],
    image: "/assets/gallery/cocoa.jpg",
    gallery: ["/assets/gallery/cocoa.jpg", "/assets/gallery/gallery14.jpg"],
    category: "Cash Crops",
    origin: "Nigeria",
    minOrder: "Bulk quotation basis",
    availability: "Available on request",
    seoTitle:
      "Cocoa Supply in Nigeria | iFarmer Agricultural Products Services Limited",
    seoDescription:
      "Bulk cocoa sourcing and supply support for exporters, processors, and trade buyers.",
    useCases: ["Processing", "Export", "Commodity trade"]
  }
];

export const blogPosts: BlogPost[] = [
  {
    title: "Understanding Soil pH and Its Impact on Crop Yield",
    slug: "understanding-soil-ph-and-crop-yield",
    excerpt:
      "Learn how soil pH affects nutrient availability and what growers can do to improve field performance.",
    category: "Blog",
    author: "Editorial Team",
    publishedAt: "2025-11-28",
    coverImage:
      "https://d64gsuwffb70l.cloudfront.net/692e6b896dea5f3608504ed6_1764650353095_7f7b72e2.webp",
    seoTitle:
      "Understanding Soil pH and Crop Yield | iFarmer Knowledge Center",
    seoDescription:
      "A practical explanation of soil pH, nutrient uptake, and crop yield outcomes for Nigerian farmers and agribusinesses.",
    content: paragraphsToHtml([
      "Soil pH influences how nutrients behave in the soil and how available those nutrients become to crops. When pH is outside the preferred range for a crop, nutrient uptake becomes less efficient and field performance can suffer.",
      "For farms and projects, this means soil management should not rely on guesswork. Good input decisions work better when they are matched to actual soil conditions, crop needs, and management goals.",
      "This is one reason why tailored fertilizer support and informed agronomy matter. Better decisions start with better field information."
    ]),
    tags: ["soil health", "crop yield", "fertility"]
  },
  {
    title: "Complete Guide to NPK Fertilizer Ratios",
    slug: "complete-guide-to-npk-fertilizer-ratios",
    excerpt:
      "Everything you need to know about nitrogen, phosphorus, and potassium for crop support.",
    category: "Guides",
    author: "Editorial Team",
    publishedAt: "2025-11-25",
    coverImage:
      "https://d64gsuwffb70l.cloudfront.net/692e6b896dea5f3608504ed6_1764649956214_0a045282.webp",
    seoTitle:
      "Guide to NPK Fertilizer Ratios | iFarmer Knowledge Center",
    seoDescription:
      "Understand NPK fertilizer ratios and how to think about crop-specific nutrient planning.",
    content: paragraphsToHtml([
      "NPK ratios describe the relative nutrient composition of a fertilizer blend, especially nitrogen, phosphorus, and potassium. These numbers matter because different crops and soil conditions require different nutrient strategies.",
      "There is no universal ratio that works for every location or season. Better performance comes from aligning blend choices with crop need, soil information, and production objectives.",
      "For institutions and commercial farms, customised blending can improve decision quality and help procurement teams avoid one-size-fits-all input choices."
    ]),
    tags: ["fertilizer", "npk", "guides"]
  },
  {
    title: "How to Use Farm Management Software for Better Reporting",
    slug: "how-to-use-farm-management-software-for-better-reporting",
    excerpt:
      "A practical look at how digital workflows improve visibility and agricultural operations.",
    category: "Tutorials",
    author: "Editorial Team",
    publishedAt: "2025-11-22",
    coverImage:
      "https://d64gsuwffb70l.cloudfront.net/692e6b896dea5f3608504ed6_1764649957169_eb6b50d3.webp",
    seoTitle:
      "Using Farm Management Software for Better Reporting | iFarmer Knowledge Center",
    seoDescription:
      "See how agri software improves monitoring, reporting, and operational decision-making.",
    content: paragraphsToHtml([
      "Digital agriculture systems are useful when they help teams track activities, improve reporting clarity, and support better operational decisions. The value is not just in dashboards, but in the visibility they create.",
      "For agricultural businesses and programmes, better reporting means fewer blind spots and stronger management conversations.",
      "Software works best when it is aligned with real agricultural workflows rather than treated as a generic technology layer."
    ]),
    tags: ["software", "reporting", "operations"]
  },
  {
    title: "How Structured Agricultural Projects Improve Programme Delivery",
    slug: "how-structured-agricultural-projects-improve-programme-delivery",
    excerpt:
      "A closer look at why planning, monitoring, and execution discipline matter in agricultural programmes.",
    category: "Case Studies",
    author: "Editorial Team",
    publishedAt: "2025-11-20",
    coverImage:
      "https://d64gsuwffb70l.cloudfront.net/692e6b896dea5f3608504ed6_1764650355026_643b61e3.webp",
    seoTitle:
      "Agricultural Project Delivery and Programme Structure | iFarmer Knowledge Center",
    seoDescription:
      "Why strong planning, monitoring, and field execution improve agricultural programme outcomes.",
    content: paragraphsToHtml([
      "Agricultural programmes often struggle when execution is disconnected from field realities. Better outcomes come from planning, monitoring, training, and performance visibility working together.",
      "Structured project management helps teams coordinate stakeholders, deploy inputs efficiently, and communicate performance more clearly.",
      "For large initiatives, operational discipline is often the difference between a programme that looks good on paper and one that delivers measurable value."
    ]),
    tags: ["project management", "programme delivery", "case study"]
  },
  {
    title: "Climate-Smart Agriculture Practices for Resilient Operations",
    slug: "climate-smart-agriculture-practices",
    excerpt:
      "Adapting farming practices to changing climate conditions with better planning and support.",
    category: "Blog",
    author: "Editorial Team",
    publishedAt: "2025-11-18",
    coverImage:
      "https://d64gsuwffb70l.cloudfront.net/692e6b896dea5f3608504ed6_1764650356931_7fb3775c.webp",
    seoTitle:
      "Climate-Smart Agriculture Practices | iFarmer Knowledge Center",
    seoDescription:
      "Practical climate-smart agriculture ideas for stronger planning and operational resilience.",
    content: paragraphsToHtml([
      "Climate-smart agriculture is about building resilience into planning, input decisions, cropping strategy, and operational coordination.",
      "As conditions change, agribusinesses and farms need systems that support faster adjustments and better visibility rather than reactive decisions alone.",
      "This is where advisory support, better data, and stronger supply planning can make a measurable difference."
    ]),
    tags: ["climate", "resilience", "farming"]
  },
  {
    title: "Pest Management Best Practices for Sustainable Production",
    slug: "pest-management-best-practices",
    excerpt:
      "Integrated pest management ideas that support long-term production quality.",
    category: "Guides",
    author: "Editorial Team",
    publishedAt: "2025-11-15",
    coverImage:
      "https://d64gsuwffb70l.cloudfront.net/692e6b896dea5f3608504ed6_1764650358831_00d305e6.webp",
    seoTitle:
      "Pest Management Best Practices | iFarmer Knowledge Center",
    seoDescription:
      "A practical guide to pest management decisions for sustainable crop production.",
    content: paragraphsToHtml([
      "Pest management works better when it combines monitoring, timely intervention, and the right input decisions rather than depending on last-minute reactions.",
      "Sustainable production depends on preserving crop health while managing cost, safety, and long-term field outcomes.",
      "Programmes and commercial farms benefit from pest management plans that fit their crops, field realities, and operational capacity."
    ]),
    tags: ["pest management", "guides", "production"]
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Chinedu Okeke",
    role: "Cassava Farmer, Enugu",
    image: "/assets/testimonials/user1.webp",
    text:
      "The custom fertilizer support from iFarmer Agricultural Products Services Limited improved our confidence in field planning and product consistency."
  },
  {
    name: "Aminat Bello",
    role: "Rice Farmer, Kebbi",
    image: "/assets/testimonials/user4.jpg",
    text:
      "Their team combines product supply with real business support. That made it easier for us to plan, buy, and follow through."
  },
  {
    name: "Yakubu Ibrahim",
    role: "Maize Farmer, Kaduna",
    image: "/assets/testimonials/user2.webp",
    text:
      "We value the responsiveness, quality discussions, and practical guidance that come with their agricultural services."
  },
  {
    name: "Ben Umeh",
    role: "Vegetable Farmer, Imo",
    image: "/assets/testimonials/user3.jpg",
    text:
      "The website and service experience now reflect a serious agribusiness partner, not just a supplier."
  }
];

export const galleryImages: GalleryImage[] = [
  {
    src: "/assets/gallery/gallery1.jpeg",
    alt: "Farm visit activity",
    caption: "Farm visit, field support, and agribusiness coordination",
    tag: "fields"
  },
  {
    src: "/assets/gallery/gallery2.jpeg",
    alt: "Woman farmer",
    caption: "Farmer engagement and project coordination",
    tag: "people"
  },
  {
    src: "/assets/gallery/gallery3.jpeg",
    alt: "Cassava farmer",
    caption: "Field presence in production communities",
    tag: "people"
  },
  {
    src: "/assets/gallery/gallery4.jpeg",
    alt: "Vegetable farmer",
    caption: "Farmer support and rural engagement",
    tag: "people"
  },
  {
    src: "/assets/gallery/gallery5.jpeg",
    alt: "Agricultural activity",
    caption: "Operational activity snapshot",
    tag: "operations"
  },
  {
    src: "/assets/gallery/gallery6.jpeg",
    alt: "Agricultural logistics",
    caption: "Logistics and coordination in action",
    tag: "operations"
  },
  {
    src: "/assets/gallery/gallery7.jpeg",
    alt: "Field team activity",
    caption: "Team movement across field operations",
    tag: "operations"
  },
  {
    src: "/assets/gallery/gallery8.jpeg",
    alt: "Export commodity",
    caption: "Commodity and export-readiness support",
    tag: "products"
  }
];

export const stats: SiteStat[] = [
  { label: "Farmers Reached", value: 50000, suffix: "+" },
  { label: "Hectares Served", value: 120000, suffix: "+" },
  { label: "Partners", value: 85, suffix: "+" },
  { label: "Years Experience", value: 12 }
];

export const team: TeamMember[] = [
  {
    name: "Programme Coordination Team",
    role: "Field Operations and Delivery",
    image:
      "https://d64gsuwffb70l.cloudfront.net/692e6b896dea5f3608504ed6_1764649940212_17901219.webp"
  },
  {
    name: "Operations Team",
    role: "Execution and Client Support",
    image:
      "https://d64gsuwffb70l.cloudfront.net/692e6b896dea5f3608504ed6_1764649942214_28fdab96.webp"
  },
  {
    name: "Technical Team",
    role: "Agronomy and Solutions Support",
    image:
      "https://d64gsuwffb70l.cloudfront.net/692e6b896dea5f3608504ed6_1764649944150_0a789710.webp"
  },
  {
    name: "Research Support Team",
    role: "Product and Knowledge Development",
    image:
      "https://d64gsuwffb70l.cloudfront.net/692e6b896dea5f3608504ed6_1764649946227_1f23f7ee.webp"
  }
];

export const certifications = [
  {
    name: "Nigeria Export Promotion Council",
    logo: "/assets/gallery/NEPC.png"
  },
  {
    name: "Nigeria Agricultural Quarantine Service",
    logo: "/assets/gallery/naqs.jpg"
  },
  {
    name: "Federal Produce Inspection Service",
    logo: "/assets/gallery/fpis.webp"
  }
];

export const partners = [
  "Martix Fertilizers",
  "Greenwell Fertilizers",
  "United Fertilizers",
  "White Fog Environmental Limited",
  "Produce Export Development Alliance",
  "NEXTAR Quantum Systems"
];

export const homeReasons = [
  {
    title: "Quality Assured",
    description:
      "Agricultural services and commodity supply grounded in quality conversations and dependable execution."
  },
  {
    title: "Sustainable Practices",
    description:
      "A business model focused on responsible agriculture, stronger rural value chains, and long-term outcomes."
  },
  {
    title: "Innovation Driven",
    description:
      "Technology, reporting workflows, and modern service delivery applied where they create business value."
  },
  {
    title: "Farmer First",
    description:
      "We work to create better market access, stronger support systems, and more practical agricultural outcomes."
  }
];

export const defaultSeo = {
  title:
    "iFarmer Agricultural Products Services Limited | Agricultural Solutions, Products, and Agribusiness Support",
  description:
    "iFarmer Agricultural Products Services Limited provides agricultural services, input supply, project management, agri software, and bulk product sourcing across Nigeria.",
  keywords: [
    "iFarmer Agricultural Products Services Limited",
    "agricultural services Nigeria",
    "fertilizer blending",
    "input supply",
    "agricultural project management",
    "bulk ginger supply",
    "bulk soy beans Nigeria",
    "sesame seeds export"
  ]
};
