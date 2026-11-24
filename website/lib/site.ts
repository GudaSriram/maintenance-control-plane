// Single place for contact details and the starter offer, so every page stays consistent.
export const CONTACT_EMAIL = "sriram@steadyops.in";
export const FOUNDER = "Sriram";

const enquiryBody = [
  "Hi Sriram,",
  "",
  "1. What our agent does (and who uses it):",
  "2. The change coming up (new model, prompt, API or tool) and when:",
  "3. The task or rule that must keep working:",
  "4. What it's built with (framework, model provider, where it runs):",
  "5. Are you an agency building this for a client? (yes / no)",
  "",
  "Thanks,",
].join("\n");

export const mailto = (subject = "Model Migration Check enquiry") =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(enquiryBody)}`;

export const offer = {
  name: "Model Migration Check",
  usd: "$1,500",
  inr: "₹1,25,000",
  duration: "Typically 1–2 weeks",
  summary:
    "A fixed-price check before you switch models, rewrite prompts or change an integration. You get evidence of what changes, not a guess.",
  steps: [
    ["Capture what must keep working", "We turn your agent's critical tasks, business rules and known failures into a repeatable test suite."],
    ["Run old and new side by side", "The current version and the candidate (new model, prompt or API) run the same cases, multiple times, so noise isn't mistaken for change."],
    ["Report and recommendation", "What changed, what broke, what we'd fix first, and a clear go / fix-first / don't-ship recommendation."],
    ["You keep the test suite", "The checks are yours to rerun on every future change, with or without us."],
  ],
};

export const sources = [
  {
    stat: "47%",
    text: "of organisations replaced the model in a production AI system in the past 12 months.",
    source: "VentureBeat Pulse, Oct 2026 (n=100)",
    url: "https://venturebeat.com/vb-pulse-agentic-orchestration-report-october-2026",
  },
  {
    stat: "69%",
    text: "of those who swapped spent weeks or more on engineering beyond changing the model itself.",
    source: "VentureBeat Pulse, Oct 2026 (n=45)",
    url: "https://venturebeat.com/vb-pulse-agentic-orchestration-report-october-2026",
  },
  {
    stat: "1 in 2",
    text: "enterprises shipped an AI feature that passed internal evaluations and still caused a customer-facing failure.",
    source: "VentureBeat Pulse, Jun 2026 (n=157)",
    url: "https://venturebeat.com/orchestration/enterprise-ai-is-entering-an-evaluation-gap-agents-are-gaining-autonomy-faster-than-companies-can-verify-them",
  },
];
