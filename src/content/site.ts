export const site = {
  name: "Uptrix",
  tagline:
    "The monitoring engine teams rely on for speed, accuracy, and incident-ready signals.",
} as const;

export const navLinks = [
  { href: "#product", label: "Product" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
] as const;

export const introduction = {
  eyebrow: "MONITORING FOR ENTERPRISE",
  titleLead: "Enterprise Grade",
  titleAccent: "Monitoring Engine",
  subtitle:
    "Probe globally, interpret responses intelligently, and alert the right people before users notice—built for teams who cannot afford blind spots or noisy pages.",
  primaryCta: "Start Monitoring Free",
  secondaryCta: "View Demo",
  demoHref: "#precision",
} as const;

export const uptimeSection = {
  title: "Uptime Monitoring",
  subtitle:
    "Synthetic checks from multiple regions with TLS validation and protocol flexibility.",
  features: [
    {
      title: "Multi-Region Verification",
      body: "Run the same probe from distinct edge locations to catch regional outages and routing drift early.",
      icon: "globe" as const,
    },
    {
      title: "SSL/TLS Integrity",
      body: "Catch certificate expiry and chain issues before browsers do—with clear timelines for remediation.",
      icon: "shield-check" as const,
    },
    {
      title: "Custom Protocols",
      body: "Beyond GET: exercise POST bodies, headers, and assertions tailored to your APIs and auth flows.",
      icon: "settings-2" as const,
    },
  ],
} as const;

export const intervalsSection = {
  title: "Check Intervals & Precision",
  description:
    "Tune frequency against noise: ship granular schedules, map HTTP semantics cleanly, and validate payloads—not just status codes.",
  checklist: [
    "Granular Intervals",
    "Smart Status Mapping",
    "Keyword Assertion",
  ],
  stats: [
    { value: "30s", label: "Check intervals" },
    { value: "2xx", label: "HTTP status codes" },
    { value: "JSON", label: "Response analysis" },
    { value: "POST", label: "HTTP request methods" },
  ],
} as const;

export const analyticsSection = {
  title: "Actionable Analytics",
  subtitle:
    "Trends, geography, and baselines in one place—plus an API when you need charts inside your own tools.",
  features: [
    {
      title: "Uptime Trends",
      body: "Rolling availability and latency windows that leadership can trust at a glance.",
      icon: "trending-up" as const,
    },
    {
      title: "Location Map",
      body: "Visualize probe health by region to pinpoint isolated failures versus systemic incidents.",
      icon: "map-pin" as const,
    },
    {
      title: "Baseline Comparison",
      body: "Compare windows side-by-side to spot regressions after deploys or infra changes.",
      icon: "git-compare" as const,
    },
    {
      title: "Analytics API",
      body: "Pull aggregates into Grafana, internal consoles, or exec summaries—without CSV gymnastics.",
      icon: "webhook" as const,
    },
  ],
} as const;

export const ctaBanner = {
  title: "Ready to secure your uptime?",
  subtitle:
    "Join over 10,000 developers who trust Uptrix to keep their services running 24/7/365.",
  primaryCta: "Get Started for Free",
  secondaryCta: "Talk to Sales",
  salesHref: "mailto:sales@uptrix.example",
  footerNote: "No credit card required • 14-day free trial of Pro features",
} as const;

export const footerColumns = [
  {
    heading: "Features",
    links: [
      { href: "#features", label: "Uptime Monitoring" },
      { href: "#analytics", label: "Cloud Status" },
      { href: "#precision", label: "Incident Routing" },
      { href: "#pricing", label: "Pricing" },
    ],
  },
  {
    heading: "About",
    links: [
      { href: "#site-footer", label: "About Us" },
      { href: "#customers", label: "Customers" },
      { href: "#careers", label: "Careers" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "#privacy", label: "Privacy Policy" },
      { href: "#terms", label: "Terms of Service" },
      { href: "#security", label: "Security" },
    ],
  },
] as const;

export const footerSocial = [
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://twitter.com", label: "Twitter" },
] as const;
