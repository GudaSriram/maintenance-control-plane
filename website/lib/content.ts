export const services = [
  {
    slug: "agentic-workflows", title: "Agentic Workflows & Systems", short: "Agents that coordinate work, with clear controls.", icon: "workflow",
    description: "Design agentic systems that use tools, retrieve context and coordinate multi-step work within defined permissions and approval boundaries.",
    items: ["Workflow and tool orchestration", "Single-agent and multi-agent design", "Human approval and escalation", "Context and state management", "API and business-system integrations", "Execution traces and bounded retries"],
    outcome: "A reviewable workflow with defined responsibilities, observable execution and a clear path when an agent cannot safely continue.",
    tech: ["Tool calling", "Orchestration", "APIs", "n8n", "Make"]
  },
  {
    slug: "agent-reliability", title: "Agent Reliability & Maintenance", short: "Dependable beyond the first launch.", icon: "cloud",
    description: "Monitor, evaluate and maintain AI agents as models, tools and business needs change. Support coverage and response expectations are defined in your engagement.",
    items: ["Agent traces, failure monitoring and alerting", "Regression evaluations for model and prompt changes", "Tool and integration maintenance", "Permission and approval reviews", "Latency and cost monitoring", "Incident triage, recovery and runbooks", "Versioned releases and rollback plans"],
    outcome: "Visible agent behaviour, controlled changes and an agreed maintenance process that helps your team detect problems and recover.",
    tech: ["Evaluations", "Observability", "Versioning", "Runbooks"]
  },

  {
    slug: "web-development",
    title: "Websites & Web Applications",
    short: "Digital experiences, built to perform.",
    icon: "code",
    description:
      "From a clear first impression to a complex customer portal, we build responsive, accessible digital products around your business.",
    items: [
      "Corporate websites & landing pages",
      "E-commerce development",
      "Custom web applications",
      "API integrations",
      "Performance optimization",
      "Maintenance and support",
    ],
    outcome:
      "A maintainable digital foundation that makes it easier for customers to find you, trust you and take action.",
    tech: ["Next.js", "React", "TypeScript", "PostgreSQL"],
  },
  {
    slug: "ai-agents",
    title: "AI Agent Development",
    short: "Useful intelligence. Thoughtful controls.",
    icon: "spark",
    description:
      "Bring your business knowledge into assistants that help customers and teams, with clear boundaries and human oversight.",
    items: [
      "Customer support & lead qualification",
      "Knowledge-base assistants",
      "Internal AI assistants",
      "AI-powered document workflows",
      "Tool-enabled agents with approval controls",
      "Custom AI integrations",
    ],
    outcome:
      "Faster access to relevant information, with source-aware answers, human escalation and explicit approval for consequential actions.",
    tech: ["OpenAI APIs", "Retrieval", "Evaluation", "Tool integrations"],
  },
  {
    slug: "business-automation",
    title: "Business Process Automation",
    short: "Less repetitive work. More forward motion.",
    icon: "workflow",
    description:
      "Connect the tools you already use and turn repetitive processes into observable, dependable workflows.",
    items: [
      "n8n & Make automation",
      "CRM and lead capture workflows",
      "Email notifications & follow-ups",
      "Reporting automation",
      "API & application integrations",
      "Approval-based business workflows",
    ],
    outcome:
      "Consistent handoffs, less manual re-entry and a clearer view of where work stands.",
    tech: ["n8n", "Make", "REST APIs", "Webhooks"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps Consulting",
    short: "A stronger foundation for what comes next.",
    icon: "cloud",
    description:
      "Design, deploy and operate cloud infrastructure with reliability, security and the realities of your team in mind.",
    items: [
      "AWS & Azure architecture",
      "Infrastructure as Code",
      "CI/CD & deployment automation",
      "Docker & Kubernetes",
      "Observability and monitoring",
      "Cloud security & reliability",
      "Infrastructure optimization",
      "Managed infrastructure support",
    ],
    outcome:
      "Repeatable releases and infrastructure your team can understand, operate and evolve.",
    tech: ["AWS", "Azure", "Terraform", "Docker", "Kubernetes"],
  },
  {
    slug: "end-to-end-engineering",
    title: "End-to-End Engineering",
    short: "One connected path from idea to operations.",
    icon: "layers",
    description:
      "Bring architecture, development, integration and operations into one coordinated delivery process.",
    items: [
      "Discovery & requirements",
      "Solution architecture & UX design",
      "Development & integration",
      "Quality assurance",
      "Deployment & monitoring",
      "Documentation & training",
      "Maintenance & optimization",
    ],
    outcome:
      "Clear ownership across the delivery lifecycle, with practical handover and agreed support arrangements.",
    tech: ["Architecture", "Engineering", "QA", "Operations"],
  },
];
export const principles = [
  [
    "Reliability by Design",
    "We build systems with operational stability, maintainability and resilience in mind.",
  ],
  [
    "Security First",
    "We incorporate appropriate security controls throughout design, development and deployment.",
  ],
  [
    "Automation with Purpose",
    "We automate processes where technology can deliver measurable business value.",
  ],
  [
    "Engineering Excellence",
    "We emphasize clean architecture, testing, documentation and maintainable implementations.",
  ],
  [
    "Transparency and Ownership",
    "We communicate clearly about scope, milestones, risks and responsibilities.",
  ],
  [
    "Continuous Improvement",
    "We design solutions that can evolve as business requirements change.",
  ],
];
export const phases = [
  [
    "Discover",
    "Understand business objectives, current workflows, requirements, constraints and success criteria.",
    "Requirements brief, scope and success criteria",
  ],
  [
    "Architect",
    "Design the solution, integrations, infrastructure, security approach and implementation roadmap.",
    "Architecture, risk register and delivery plan",
  ],
  [
    "Build",
    "Develop maintainable code, suitable frameworks and reliable integrations in reviewable increments.",
    "Working increments and technical documentation",
  ],
  [
    "Integrate",
    "Connect applications, APIs, databases, AI systems and external services with explicit failure handling.",
    "Connected workflows and integration contracts",
  ],
  [
    "Validate",
    "Perform functional and integration testing, security checks and user acceptance testing.",
    "Test evidence and acceptance sign-off",
  ],
  [
    "Deploy",
    "Release through a controlled process with rollback considerations and environment checks.",
    "Release checklist and rollback plan",
  ],
  [
    "Operate",
    "Implement monitoring, alerts, documentation, incident handling and support arrangements.",
    "Runbooks, monitoring and team handover",
  ],
  [
    "Optimize",
    "Review performance, business outcomes and opportunities for further improvement.",
    "Prioritized improvement roadmap",
  ],
];
export const solutions = [
  [
    "Automate Customer Enquiries",
    "Enquiries arrive in several inboxes and ownership is unclear.",
    "Capture requests centrally, categorize them and route each to an accountable owner.",
    "More consistent responses and clearer ownership.",
    "n8n, Make, CRM APIs",
  ],
  [
    "Modernize Your Business Website",
    "An outdated or slow website makes it difficult for customers to act.",
    "Rebuild the experience around clear content, accessibility and conversion journeys.",
    "A faster, clearer customer experience.",
    "Next.js, TypeScript, analytics",
  ],
  [
    "Improve Lead Management",
    "Manual lead transfers create missed handoffs.",
    "Validate incoming leads, sync with CRM and schedule appropriate follow-ups.",
    "Better visibility across the enquiry lifecycle.",
    "CRM APIs, webhooks, PostgreSQL",
  ],
  [
    "Build AI-Powered Customer Support",
    "Teams repeatedly answer the same questions.",
    "Ground an assistant in approved knowledge, evaluate responses and offer human escalation.",
    "More accessible information with defined limits.",
    "Retrieval, AI APIs, human approval",
  ],
  [
    "Connect Disconnected Business Applications",
    "Teams copy information between disconnected systems.",
    "Define a source of truth and build monitored integrations with retries.",
    "Less duplicate entry and more consistent records.",
    "REST APIs, n8n, Make",
  ],
  [
    "Automate Reporting",
    "Recurring reports require repeated manual preparation.",
    "Collect validated data on a schedule and deliver role-appropriate summaries.",
    "Repeatable reporting with traceable data sources.",
    "SQL, APIs, scheduled workflows",
  ],
  [
    "Improve Cloud Reliability",
    "Operational issues are hard to detect and recover from.",
    "Review architecture, add observability and document recovery procedures.",
    "Better operational visibility and recovery readiness.",
    "AWS, Azure, Terraform, monitoring",
  ],
  [
    "Accelerate Software Delivery",
    "Manual releases are inconsistent and difficult to reverse.",
    "Build tested CI/CD pipelines with approval gates and rollback procedures.",
    "More repeatable, reviewable software delivery.",
    "GitHub Actions, Docker, IaC",
  ],
];
export const projects = [
  {
    slug: "clinic-booking",
    title: "Clinic Booking Platform",
    category: "WEB DEVELOPMENT",
    description:
      "An appointment enquiry journey that connects patients and clinic administrators.",
    problem:
      "Appointment requests across calls and messages are difficult to track.",
    solution:
      "A responsive enquiry interface with appointment preferences, validation, notifications and a proposed administrative queue.",
    stack: ["Next.js", "PostgreSQL", "Resend"],
    flow: ["Patient enquiry", "Validation", "Request queue", "Clinic review"],
    summary:
      "The interactive concept demonstrates selecting a time and preparing a request. Production delivery would add authenticated staff access, availability management and privacy controls.",
  },
  {
    slug: "ai-support",
    title: "AI Customer Support Assistant",
    category: "AI & INTELLIGENCE",
    description:
      "A knowledge-led support experience with a clear path to a human.",
    problem:
      "Repeated questions consume support time while complex issues need human attention.",
    solution:
      "Retrieve approved knowledge, answer with sources, qualify enquiries and route unresolved issues to a person.",
    stack: ["React", "OpenAI API", "Retrieval"],
    flow: [
      "Question",
      "Knowledge retrieval",
      "Policy check",
      "Answer / escalate",
    ],
    summary:
      "The local demonstration uses predefined answers, not a live AI model. A production build requires evaluated retrieval, prompt-injection defenses and restricted tool permissions.",
  },
  {
    slug: "lead-automation",
    title: "Lead Automation System",
    category: "BUSINESS AUTOMATION",
    description:
      "From a website enquiry to an organized, accountable follow-up.",
    problem:
      "Manual copying between forms, inboxes and CRM creates missed handoffs.",
    solution:
      "Validate and deduplicate the lead, create a CRM record and queue owner notifications.",
    stack: ["n8n / Make", "CRM API", "Webhooks"],
    flow: [
      "Website form",
      "Validate & deduplicate",
      "CRM record",
      "Follow-up queue",
    ],
    summary:
      "The interactive simulation illustrates routing and human approval. Production integration needs CRM credentials, webhook authentication and retries.",
  },
  {
    slug: "cloud-pipeline",
    title: "Cloud Deployment Pipeline",
    category: "CLOUD & DEVOPS",
    description:
      "A controlled path from code change to an observable deployment.",
    problem: "Manual infrastructure and release steps are hard to reproduce.",
    solution:
      "Use Infrastructure as Code, CI checks, explicit approval and deployment health checks.",
    stack: ["GitHub Actions", "Terraform", "Docker"],
    flow: [
      "Code & tests",
      "Build artifact",
      "Approve release",
      "Deploy & observe",
    ],
    summary:
      "The walkthrough demonstrates release gates locally. Production delivery requires environment-specific IaC, cloud credentials, smoke tests and rollback verification.",
  },
];
export const packages = [
  {
    name: "Web Launch",
    inr: "₹15,000",
    usd: "$350",
    items: [
      "Up to five responsive pages",
      "Contact form & basic SEO",
      "Analytics setup & deployment",
      "Two revision rounds",
    ],
    service: "Website Development",
  },
  {
    name: "Automation Accelerator",
    inr: "₹30,000",
    usd: "$750",
    items: [
      "Workflow discovery",
      "Up to two defined automations",
      "CRM, email or spreadsheet integrations",
      "Testing, documentation & handover",
    ],
    service: "Business Automation",
  },
  {
    name: "AI Agent Builder",
    inr: "₹50,000",
    usd: "$1,200",
    items: [
      "Custom AI assistant",
      "Knowledge-base integration",
      "Lead capture or approved tool actions",
      "Human escalation, testing & deployment",
    ],
    service: "AI Agent Development",
  },
  {
    name: "Cloud & DevOps",
    inr: "Custom quote",
    usd: "Custom quote",
    items: [
      "Architecture & infrastructure review",
      "Scope based on complexity",
      "Delivery and operating plan",
      "Agreed support arrangements",
    ],
    service: "Cloud & DevOps",
  },
];
export const faqs = [
  ["What exactly do I get from a Model Migration Check?", "A test suite built from your agent's critical tasks, business rules and known failures; a side-by-side run of your current version and the planned change; and a written report of what changed, what broke and what to fix first, with a clear recommendation. The test suite is yours to keep."],
  ["Can you work on agents we or someone else already built?", "Yes. That is the main use case. We start from the agent as it runs today and record its current behaviour as the baseline before anything changes."],
  ["We're an agency. Can you work under our name?", "Yes. We can maintain your clients' agents white-label, or alongside you under the SteadyOps name. You keep the client relationship either way."],
  ["What access do you need?", "To start, read access to the agent's code or configuration and a way to run it against test cases, ideally a staging environment. We don't need production credentials for the check, and nothing ships without your approval."],
  ["Which stacks do you support?", "Agents built on the major model providers (OpenAI, Anthropic, Google, Azure OpenAI, open models) and common frameworks, or plain API calls. If it can be run against test inputs, it can be tested."],
  ["Can you guarantee nothing will break?", "No one honestly can. What we guarantee is evidence: you'll know what changed before release, and every release has a way back."],
  ["What happens after the check?", "You can stop there and use the test suite yourselves, or move to monthly maintenance where every change is tested, repaired and released with a rollback plan."],
];
