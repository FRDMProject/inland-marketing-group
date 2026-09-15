export const cities = [
  {
    slug: "riverside",
    name: "Riverside",
    region: "Riverside County",
    line: "Big ideas. Riverside roots.",
    description:
      "Custom websites for Riverside businesses, from service companies to independent practices. Make your offer clear, your brand memorable, and the next step easy.",
    context:
      "From Downtown and the Magnolia corridor to the neighborhoods your business serves, your website should make it easy to understand where you work and what you do.",
    angle: "A clear path from local search to a real conversation.",
    audience: ["Home & professional services", "Independent practices", "Retail & hospitality"],
    focus:
      "Show your service area, answer the questions people ask before calling, and make mobile inquiries effortless.",
  },
  {
    slug: "anaheim",
    name: "Anaheim",
    region: "Orange County",
    line: "Stand out beyond the first impression.",
    description:
      "Distinctive Anaheim web design for service businesses, hospitality, and independent brands. Turn a busy market into a clear opportunity to be chosen.",
    context:
      "Anaheim brings together neighborhood businesses, visitor-facing brands, and business-to-business services. Each needs a different first impression and a clear customer journey.",
    angle: "Design for the people you want to reach.",
    audience: [
      "Hospitality & experiences",
      "Local service businesses",
      "Business-to-business brands",
    ],
    focus:
      "Separate visitor and local-customer needs, highlight practical details, and put the right booking or inquiry action in front of each audience.",
  },
  {
    slug: "inland-empire",
    name: "the Inland Empire",
    region: "Southern California",
    line: "Built for what’s next in the IE.",
    description:
      "Inland Empire web design for ambitious businesses across Riverside and San Bernardino counties. A distinctive website with a practical plan for growth.",
    context:
      "A regional business needs more than a long list of city names. We organize your services and coverage so customers can see whether you are the right fit, wherever they find you.",
    angle: "One clear brand. A region full of opportunity.",
    audience: ["Multi-area service businesses", "Growing local brands", "Professional services"],
    focus:
      "Create a useful service-area structure, keep contact details consistent, and connect regional campaigns to relevant landing pages.",
  },
  {
    slug: "pomona",
    name: "Pomona",
    region: "Los Angeles County",
    line: "Independent spirit. Distinctive design.",
    description:
      "Custom Pomona website design for independent businesses and professional services. Give your brand a clear voice and your customers an easy next step.",
    context:
      "Whether you serve Pomona neighborhoods or customers across the valley, the site needs to explain your offering without making people work for the details.",
    angle: "Let your business’s character come through.",
    audience: ["Independent shops & studios", "Professional services", "Local trades"],
    focus:
      "Use strong service explanations, useful FAQs, and a recognizable visual identity to help customers decide with confidence.",
  },
  {
    slug: "corona",
    name: "Corona",
    region: "Riverside County",
    line: "A stronger home for your business.",
    description:
      "Corona web design for service businesses and growing brands. Purposeful design, thoughtful development, and a simpler path to an inquiry.",
    context:
      "Businesses serving Corona and the surrounding communities need to make their coverage, capabilities, and next steps easy to find on a phone.",
    angle: "Make the next customer’s decision easier.",
    audience: ["Home service companies", "Professional firms", "Growing regional businesses"],
    focus:
      "Bring service scope and coverage forward, build useful quote-request journeys, and connect paid search to the right offer.",
  },
  {
    slug: "ontario",
    name: "Ontario",
    region: "San Bernardino County",
    line: "Built for business. Designed for people.",
    description:
      "Ontario, California web design for business-to-business companies, service providers, and local brands. Turn complex offerings into clear digital experiences.",
    context:
      "Ontario’s business landscape includes companies with detailed capabilities and longer sales conversations. A website should help the right buyer understand your value before making contact.",
    angle: "Make complex services feel straightforward.",
    audience: [
      "Business-to-business services",
      "Industrial & trade businesses",
      "Local consumer brands",
    ],
    focus:
      "Structure capabilities, service information, and quote requests around what a decision-maker needs to know.",
  },
  {
    slug: "rancho-cucamonga",
    name: "Rancho Cucamonga",
    region: "San Bernardino County",
    line: "A sharper presence in your market.",
    description:
      "Rancho Cucamonga web design for professional services, independent practices, and local businesses. A considered experience from the first visit to the first conversation.",
    context:
      "A business with a strong local reputation deserves a website that feels just as considered. We help organize your expertise into a clear, approachable experience.",
    angle: "Let the quality of your business show.",
    audience: [
      "Professional & advisory services",
      "Independent practices",
      "Retail & lifestyle businesses",
    ],
    focus:
      "Explain your expertise, answer common questions, and make consultation requests simple on every screen.",
  },
] as const;
export type City = (typeof cities)[number];
export const getCity = (slug: string) => cities.find((city) => city.slug === slug);

export const services = [
  {
    slug: "local-seo",
    name: "Local SEO",
    label: "Get discovered.",
    description:
      "Help nearby customers understand what you do, where you work, and why your business is relevant to their search.",
    deliverables: [
      "Technical and local search audit",
      "Service and location content",
      "Google Business Profile recommendations",
      "Measurement and ongoing priorities",
    ],
    detail:
      "We start with your services, your existing visibility, and the questions people actually ask. Then we build a practical plan for your website and local presence. Rankings are earned over time and are never guaranteed.",
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    label: "Meet the moment.",
    description:
      "Connect high-intent searches with a focused offer, a relevant landing page, and a measurable customer journey.",
    deliverables: [
      "Search intent and campaign planning",
      "Dedicated landing pages",
      "Conversion and lead-quality measurement",
      "Search-term and budget review",
    ],
    detail:
      "A click is the beginning. We connect the ad, the landing page, and the inquiry experience, then evaluate what turns into a qualified conversation. Budgets and campaign changes are agreed before launch.",
  },
  {
    slug: "ai-search",
    name: "AI search visibility",
    label: "Be understood.",
    description:
      "Make your services, expertise, and business information easier for search systems and people to understand.",
    deliverables: [
      "Content and entity clarity review",
      "Structured data where appropriate",
      "Answer-focused service content",
      "Visibility observations and reporting",
    ],
    detail:
      "We focus on clear information, useful answers, and a technically accessible website. AI recommendations vary by platform and query; no agency can promise your inclusion in an answer.",
  },
] as const;

export const projects = [
  {
    slug: "forma",
    name: "Forma",
    category: "Architecture & interiors",
    style: "forma",
    title: "Space to think differently.",
    brief:
      "An editorial design direction for an architecture practice. The work takes center stage, with a simple route into a project conversation.",
    details: [
      "Art-directed project stories",
      "Service-led navigation",
      "A considered inquiry flow",
    ],
  },
  {
    slug: "ridgeline",
    name: "Ridgeline",
    category: "Outdoor & lifestyle",
    style: "ridge",
    title: "Find your own way out.",
    brief:
      "An expressive concept for an outdoor brand. Big landscapes, confident typography, and practical product discovery share the same space.",
    details: [
      "Immersive brand storytelling",
      "Product discovery structure",
      "Responsive campaign design",
    ],
  },
  {
    slug: "good-kind",
    name: "Goodkind",
    category: "Wellness & independent brands",
    style: "goodkind",
    title: "A little more good.",
    brief:
      "A warm, playful direction for a wellness brand. A distinctive identity makes room for clear product information and an approachable first visit.",
    details: [
      "A cohesive visual language",
      "Accessible product information",
      "Thoughtful mobile layouts",
    ],
  },
] as const;

export const faqs = [
  [
    "What does a custom website cost?",
    "It depends on the pages, content, and functionality you need. We discuss your priorities and provide a written scope and price before the build starts. Hosting, third-party tools, and ongoing support are explained separately.",
  ],
  [
    "Can you redesign my existing website?",
    "Yes. We review the current content, customer journey, and technical setup, then plan what to keep, improve, and rebuild. Existing URLs and search visibility are considered in the migration.",
  ],
  [
    "What happens after I send an inquiry?",
    "We review your project details and follow up to discuss your goals, the scope, and possible next steps. Sending an inquiry does not commit you to a project.",
  ],
  [
    "Will it work on phones and load quickly?",
    "Responsive layouts, accessible controls, and performance checks are part of the build. Animation is adapted for smaller screens and visitors who prefer reduced motion.",
  ],
  [
    "Can you help with Google Ads and SEO?",
    "Yes. Search campaigns, dedicated landing pages, local SEO, and measurement can be scoped alongside your website or as a separate project. We agree on the work and budget first.",
  ],
  [
    "Do I need to be in the Inland Empire?",
    "We focus on the Inland Empire and nearby Southern California markets, including Anaheim and Pomona. Tell us where your business operates so we can discuss fit and coverage.",
  ],
] as const;
