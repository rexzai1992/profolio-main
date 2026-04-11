export type NavLink = {
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  contactEmail: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  platformBadges: string[];
  storyEyebrow: string;
  storyTitle: string;
  storyDescription: string;
  storyPoints: string[];
};

export type TrustStripContent = {
  message: string;
  marks: string[];
};

export type ServiceItem = {
  title: string;
  summary: string;
  highlights: string[];
};

export type ProblemItem = {
  title: string;
  pain: string;
  solution: string;
};

export type ProjectItem = {
  name: string;
  category: string;
  summary: string;
  impact: string;
  badges: string[];
};

export type RoadmapItem = {
  phase: string;
  title: string;
  description: string;
  imageUrl: string;
};

export type ExperienceMetric = {
  label: string;
  value: string;
  context: string;
};

export type ExperienceFocus = {
  title: string;
  details: string;
};

export type WhyMePoint = {
  title: string;
  details: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  summary: string;
  deliverables: string[];
  featured?: boolean;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type ContactChannel = {
  label: string;
  value: string;
  href: string;
  note: string;
};

export type ContentSection<T> = {
  eyebrow: string;
  title: string;
  description: string;
  items: T[];
};

export type ExperienceSection = {
  eyebrow: string;
  title: string;
  description: string;
  metrics: ExperienceMetric[];
  focusTitle: string;
  focuses: ExperienceFocus[];
};

export type PricingSection = {
  eyebrow: string;
  title: string;
  description: string;
  plans: PricingPlan[];
};

export type ProcessSection = {
  eyebrow: string;
  title: string;
  description: string;
  steps: ProcessStep[];
};

export type ContactSection = {
  eyebrow: string;
  title: string;
  description: string;
  channels: ContactChannel[];
  formTitle: string;
  formIntro: string;
};

export type FooterContent = {
  tagline: string;
};

export type PortfolioContent = {
  site: SiteConfig;
  navLinks: NavLink[];
  hero: HeroContent;
  trustStrip: TrustStripContent;
  services: ContentSection<ServiceItem>;
  problems: ContentSection<ProblemItem>;
  featuredProjects: ContentSection<ProjectItem>;
  roadmap: ContentSection<RoadmapItem>;
  experience: ExperienceSection;
  whyWorkWithMe: ContentSection<WhyMePoint>;
  pricing: PricingSection;
  process: ProcessSection;
  contact: ContactSection;
  footer: FooterContent;
};

export const PORTFOLIO_CONTENT_STORAGE_KEY = "izzul-fitree-portfolio-content-v1";

export const defaultPortfolioContent: PortfolioContent = {
  site: {
    name: "Izzul Fitree",
    tagline: "Affordable custom apps for real business problems.",
    description:
      "Premium custom applications for teams that need better operations, automation, and product speed.",
    contactEmail: "hello@izzulfitree.com",
  },
  navLinks: [
    { label: "Services", href: "#services" },
    { label: "Problems", href: "#problems" },
    { label: "Projects", href: "#projects" },
    { label: "Visualizer", href: "#app-visualizer" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Experience", href: "#experience" },
    { label: "Why", href: "#why-me" },
    { label: "Pricing", href: "#pricing" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "Premium Software Partner",
    title: "Affordable custom apps for real business problems.",
    description:
      "I design and build production-ready digital products for teams that need faster operations, smarter automation, and reliable customer experiences.",
    primaryCtaLabel: "Let's Build Your App",
    primaryCtaHref: "#contact",
    secondaryCtaLabel: "View Featured Projects",
    secondaryCtaHref: "#projects",
    platformBadges: [
      "PWA",
      "Android App",
      "iOS App",
      "Web App",
      "Dashboard",
      "Automation",
      "POS",
      "WhatsApp Tool",
    ],
    storyEyebrow: "Product Storytelling Approach",
    storyTitle: "Build once, scale confidently.",
    storyDescription:
      "Every engagement is shaped around one goal: replacing friction with a software flow that your team can trust daily.",
    storyPoints: [
      "AI Photobooth and event products with high-traffic reliability.",
      "Automation tools that reduce repetitive operational work.",
      "Cross-platform app delivery for web, mobile, and internal teams.",
    ],
  },
  trustStrip: {
    message:
      "Built for founders and operators who need software that solves real business bottlenecks, not vanity features.",
    marks: [
      "Business-first product strategy",
      "Fast iteration with measurable outcomes",
      "Clear communication from kickoff to launch",
      "Built for growth, not throwaway demos",
    ],
  },
  services: {
    eyebrow: "Services",
    title: "Software services designed for operational impact",
    description:
      "From custom product builds to automation pipelines, every service is scoped to solve a concrete business bottleneck with measurable outcomes.",
    items: [
      {
        title: "Custom Business Apps",
        summary:
          "Purpose-built software for your operations, customers, and internal teams.",
        highlights: [
          "Web portals, dashboards, and internal platforms",
          "Role-based workflows with clear access control",
          "Maintainable architecture ready for team handover",
        ],
      },
      {
        title: "Automation & AI Workflows",
        summary:
          "Replace repetitive admin work with reliable automations and assisted decision flows.",
        highlights: [
          "WhatsApp and API-driven process automation",
          "AI-assisted features for speed and consistency",
          "Alerts and system triggers for critical actions",
        ],
      },
      {
        title: "Mobile & Field Systems",
        summary:
          "Cross-platform products that keep teams productive on-site and on-the-go.",
        highlights: [
          "PWA, Android, iOS, and companion dashboard delivery",
          "Offline-friendly capture and sync patterns",
          "Production support for event and retail operations",
        ],
      },
    ],
  },
  problems: {
    eyebrow: "Problems I Solve",
    title: "Fixing the operational friction that blocks growth",
    description:
      "I focus on high-friction points where software can immediately improve speed, consistency, and execution confidence.",
    items: [
      {
        title: "Manual workflows are slowing growth",
        pain: "Teams lose hours every week on repetitive tasks, copy-paste operations, and disconnected systems.",
        solution:
          "I design streamlined app workflows and automations that reduce operational friction and improve execution speed.",
      },
      {
        title: "Existing tools do not fit your process",
        pain: "Generic SaaS products force compromises, creating workarounds and fragile team routines.",
        solution:
          "I build tailored products around your real operating model so your software adapts to the business, not the other way around.",
      },
      {
        title: "No clear visibility across operations",
        pain: "Critical data is spread across chats, sheets, and apps, making decisions slower and riskier.",
        solution:
          "I ship dashboards and reporting flows that centralize key metrics for faster, more confident daily decisions.",
      },
    ],
  },
  featuredProjects: {
    eyebrow: "Featured Projects",
    title: "Products shipped for real operational environments",
    description:
      "Selected builds across events, automation, operations, and retail where reliability and execution speed mattered.",
    items: [
      {
        name: "AI Photobooth",
        category: "Event AI Experience",
        summary:
          "An AI-enhanced photobooth product that generates premium participant outputs with a queue-friendly event flow.",
        impact:
          "Improved event throughput by automating generation and result delivery in real time.",
        badges: ["Web App", "Automation", "Dashboard"],
      },
      {
        name: "Photobooth App",
        category: "Event Operations Product",
        summary:
          "A dedicated event photobooth application for capture, session control, and branded output management.",
        impact:
          "Enabled operators to run high-volume booths with fewer manual touchpoints and cleaner execution.",
        badges: ["PWA", "Web App", "Dashboard"],
      },
      {
        name: "Event Management System",
        category: "Operations Platform",
        summary:
          "Centralized scheduling, team coordination, and event logistics in one system tailored to operational workflows.",
        impact:
          "Reduced planning overhead while improving visibility across tasks, owners, and event timelines.",
        badges: ["Web App", "Dashboard", "Automation"],
      },
      {
        name: "WhatsApp Automation Tool",
        category: "Communication Automation",
        summary:
          "Automated WhatsApp workflows for notifications, lead responses, and operational updates with business logic controls.",
        impact:
          "Cut response time and manual messaging effort while preserving consistent customer communication.",
        badges: ["WhatsApp Tool", "Automation", "Dashboard"],
      },
      {
        name: "Android POS System",
        category: "Retail & Payments",
        summary:
          "A transaction-focused POS system built for speed, inventory flow, and everyday cashier reliability.",
        impact:
          "Improved checkout efficiency and reporting accuracy for retail teams managing live operations.",
        badges: ["Android App", "POS", "Dashboard"],
      },
    ],
  },
  roadmap: {
    eyebrow: "Roadmap & Gallery",
    title: "Build journey and app photo showcase",
    description:
      "Use this timeline to present release phases and attach screenshots or app photos for each milestone.",
    items: [
      {
        phase: "Phase 01",
        title: "Core product foundation",
        description: "Initial architecture, core flows, and first production release.",
        imageUrl: "",
      },
      {
        phase: "Phase 02",
        title: "Automation and integrations",
        description: "Integrated API workflows and reduced manual operational tasks.",
        imageUrl: "",
      },
      {
        phase: "Phase 03",
        title: "Scale and optimization",
        description: "Performance hardening, analytics, and quality refinements.",
        imageUrl: "",
      },
    ],
  },
  experience: {
    eyebrow: "Experience Snapshot",
    title: "Built around business execution, not demo-only features",
    description:
      "A track record of shipping practical systems for operations-heavy teams that need dependable product outcomes.",
    metrics: [
      {
        label: "Featured builds delivered",
        value: "5",
        context: "Across events, automation, ops, and retail products",
      },
      {
        label: "Platform capabilities",
        value: "8",
        context: "Web, mobile, dashboard, POS, automation, and WhatsApp systems",
      },
      {
        label: "Delivery model",
        value: "End-to-end",
        context: "From problem discovery to launch and improvement cycles",
      },
    ],
    focusTitle: "Focus areas delivered",
    focuses: [
      {
        title: "Event and experiential products",
        details:
          "Built high-throughput event systems like AI Photobooth flows that balance quality, speed, and operator ease.",
      },
      {
        title: "Operational automation systems",
        details:
          "Designed automation logic for repetitive communication and admin tasks to reduce manual workload.",
      },
      {
        title: "Commerce and internal operations",
        details:
          "Shipped practical systems such as POS and management platforms to support day-to-day business execution.",
      },
    ],
  },
  whyWorkWithMe: {
    eyebrow: "Why Work With Me",
    title: "A partner model built for speed, clarity, and ownership",
    description:
      "You get direct collaboration with a builder focused on solving real business problems with quality implementation.",
    items: [
      {
        title: "Business-first thinking",
        details:
          "Every feature is justified by operational value, cost reduction, or customer experience impact.",
      },
      {
        title: "Fast, transparent delivery",
        details:
          "Short feedback loops, clear priorities, and visible progress keep projects moving without surprises.",
      },
      {
        title: "Premium quality, lean cost",
        details:
          "You get robust product quality without carrying the overhead of a large agency team.",
      },
      {
        title: "Built to last and evolve",
        details:
          "Systems are structured for maintainability so your app can scale with business changes.",
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Clear pricing paths aligned with delivery scope",
    description:
      "Pricing is scoped to complexity and business impact. Final proposals are tailored after discovery.",
    plans: [
      {
        name: "Starter Build",
        price: "From USD 2.5k",
        summary: "For focused MVPs or internal tools that solve one high-priority workflow.",
        deliverables: [
          "Discovery and scope framing",
          "Core workflow implementation",
          "Launch support and handover",
        ],
      },
      {
        name: "Growth System",
        price: "From USD 6k",
        summary: "For multi-module apps requiring stronger architecture and integrations.",
        deliverables: [
          "Product planning and architecture",
          "Dashboard + automation integrations",
          "Testing, launch, and iteration cycle",
        ],
        featured: true,
      },
      {
        name: "Product Partner",
        price: "Custom monthly",
        summary: "Ongoing build and optimization support for teams shipping continuously.",
        deliverables: [
          "Prioritized monthly roadmap",
          "Continuous features and improvements",
          "Monitoring and product advisory",
        ],
      },
    ],
  },
  process: {
    eyebrow: "Process",
    title: "A practical execution process from idea to launch",
    description:
      "Structured enough to reduce risk, flexible enough to keep momentum and adapt to business feedback.",
    steps: [
      {
        step: "01",
        title: "Discovery",
        description:
          "Clarify goals, constraints, and the real operational bottleneck worth solving first.",
      },
      {
        step: "02",
        title: "Blueprint",
        description:
          "Define user flows, scope, and architecture so we can move fast without breaking quality.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "Implement in focused cycles with regular updates, reviews, and practical iteration points.",
      },
      {
        step: "04",
        title: "Launch",
        description:
          "Deploy production-ready software with QA, rollout checks, and usage readiness guidance.",
      },
      {
        step: "05",
        title: "Optimize",
        description:
          "Improve based on real usage data, team feedback, and the next highest-value opportunities.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Tell me what you need built",
    description:
      "Share your current bottleneck, expected outcome, and timeline. You will get a clear recommendation and next steps.",
    channels: [
      {
        label: "Email",
        value: "hello@izzulfitree.com",
        href: "mailto:hello@izzulfitree.com",
        note: "Best for full project briefs and requirements.",
      },
      {
        label: "Discovery call",
        value: "Request a 30-minute call",
        href: "mailto:hello@izzulfitree.com?subject=Discovery%20Call%20Request",
        note: "Great for discussing scope, timeline, and fit.",
      },
      {
        label: "Response window",
        value: "Typically within 24 hours",
        href: "mailto:hello@izzulfitree.com",
        note: "Clear next steps shared after first contact.",
      },
    ],
    formTitle: "Project brief",
    formIntro: "This sends your details to hello@izzulfitree.com.",
  },
  footer: {
    tagline: "Affordable custom apps for real business problems.",
  },
};

export function isPortfolioContentLike(value: unknown): value is PortfolioContent {
  if (!value || typeof value !== "object") {
    return false;
  }

  const obj = value as Record<string, unknown>;

  const requiredTopLevel = [
    "site",
    "navLinks",
    "hero",
    "trustStrip",
    "services",
    "problems",
    "featuredProjects",
    "roadmap",
    "experience",
    "whyWorkWithMe",
    "pricing",
    "process",
    "contact",
    "footer",
  ];

  return requiredTopLevel.every((key) => key in obj);
}
