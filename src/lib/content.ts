// Content retained from the original PYDP HTML prototype.
export const opportunities = [
  {
    "category": "Scholarships",
    "title": "Sample: Youth Leadership Scholarship",
    "description": "Illustrative scholarship listing for students interested in public leadership and community impact.",
    "guidance": "Check academic eligibility, required documents and official provider deadline."
  },
  {
    "category": "Internships",
    "title": "Sample: Public Policy Internship",
    "description": "Illustrative placement to observe policy research, programme work and public-sector processes.",
    "guidance": "Check host institution, application dates and whether placements are paid."
  },
  {
    "category": "Dialogues",
    "title": "Sample: Youth Dialogue Table",
    "description": "A structured discussion where young people exchange perspectives on a national or global issue.",
    "guidance": "Check organiser, theme, participation format and registration."
  },
  {
    "category": "Conferences",
    "title": "Sample: Youth Policy & Innovation Conference",
    "description": "A platform to present ideas, learn from speakers and connect across disciplines.",
    "guidance": "Check abstract requirements, fees, travel support and dates."
  },
  {
    "category": "Policy",
    "title": "Sample: Student Policy Research Challenge",
    "description": "An opportunity to develop a short evidence-based policy contribution.",
    "guidance": "Check topic, submission format, judging criteria and official source."
  },
  {
    "category": "Dialogues",
    "title": "Sample: Inter-University Roundtable",
    "description": "A moderated conversation between students from different academic backgrounds.",
    "guidance": "Check participation criteria, location and registration details."
  }
];

export const lessons = [
  {
    "title": "Define the problem",
    "intro": "Name the issue, affected group and specific gap. Avoid trying to solve a broad topic all at once.",
    "example": "Instead of “youth unemployment”, narrow the issue to “limited access to practical career guidance for final-year students in public universities”.",
    "exercise": "What specific problem do you want to address, who is affected, and where does it occur?"
  },
  {
    "title": "Find and use evidence",
    "intro": "Identify credible evidence, separate facts from assumptions, and connect each important claim to a source.",
    "example": "A policy brief should support its main claims with reliable reports, research, official statistics or documented experience.",
    "exercise": "What evidence would help demonstrate that this problem exists? Name possible sources."
  },
  {
    "title": "Compare possible options",
    "intro": "Consider more than one response and briefly explain advantages, limitations and trade-offs.",
    "example": "Compare a campus career-support programme with a national online guidance portal. Consider reach, cost and implementation.",
    "exercise": "What are two or more possible ways to address the problem? What are their strengths and limits?"
  },
  {
    "title": "Build a recommendation",
    "intro": "State the proposed action, responsible institution or actor, possible partners, resources, timeline and feasibility.",
    "example": "A recommendation is stronger when it identifies who should act, what they should do and how the action could be implemented.",
    "exercise": "What practical action do you recommend, who should lead it, and what would implementation require?"
  },
  {
    "title": "Communicate the idea",
    "intro": "Organise the proposal clearly and prepare a short explanation or policy pitch for its intended audience.",
    "example": "A concise brief helps a decision-maker understand the problem, evidence and recommended action quickly.",
    "exercise": "In 2-3 sentences, explain why your proposal matters and what change it seeks."
  }
];

export const labFields: [string, string, string, string][][] = [
  [
    [
      "topic",
      "Policy brief title / working topic",
      "input",
      "e.g. Improving access to career guidance for university students"
    ],
    [
      "problem",
      "What is the specific problem?",
      "textarea",
      "Describe the issue in clear, focused language."
    ],
    [
      "target",
      "Who is affected and where?",
      "textarea",
      "Identify the target group and context."
    ]
  ],
  [
    [
      "evidence",
      "What evidence supports the problem?",
      "textarea",
      "Add facts, findings or observations and explain what they show."
    ],
    [
      "sources",
      "Possible sources / references",
      "textarea",
      "List credible reports, research, official data or other sources."
    ]
  ],
  [
    [
      "options",
      "What possible responses could address the problem?",
      "textarea",
      "Briefly compare at least two possible approaches."
    ],
    [
      "tradeoffs",
      "What are the advantages, limitations or trade-offs?",
      "textarea",
      "Consider feasibility, cost, reach, inclusion and constraints."
    ]
  ],
  [
    [
      "recommendation",
      "What action do you recommend?",
      "textarea",
      "State a practical action and explain why it is preferable."
    ],
    [
      "actor",
      "Who should be responsible?",
      "input",
      "Institution, department, organisation or other actor"
    ],
    [
      "partners",
      "Possible partners",
      "input",
      "Relevant institutions or partners"
    ],
    [
      "timeline",
      "Indicative timeline and resources",
      "textarea",
      "What time, resources or steps may be needed?"
    ]
  ],
  [
    [
      "outcomes",
      "Expected results and how progress could be assessed",
      "textarea",
      "What change do you expect? How could progress be measured?"
    ],
    [
      "references",
      "References and possible partnerships",
      "textarea",
      "List references and relevant national or international partnerships."
    ]
  ],
  [
    [
      "ready",
      "Preparation checklist",
      "check",
      ""
    ],
    [
      "summary",
      "Short policy pitch / executive summary",
      "textarea",
      "Summarise the problem, evidence and recommendation in a short paragraph."
    ]
  ]
];

export const feedbackExamples = {
  "GREEN": {
    "feedback": "The problem is clearly defined, the evidence is relevant, and the recommendation identifies a feasible action and responsible actor. The draft is sufficiently prepared to be shared with a suitable opportunity.",
    "actions": [
      "Check the selected opportunity’s official eligibility and submission requirements.",
      "Adapt the brief to the receiving organisation’s format.",
      "Submit through the official external channel if eligible."
    ]
  },
  "YELLOW": {
    "feedback": "Your concern is relevant and the target group is identifiable. However, the evidence is limited, the target group needs to be more specific, and the responsible institution is not yet clearly named.",
    "actions": [
      "Add credible evidence and cite the source for each key claim.",
      "Narrow the target group and context.",
      "Identify a responsible institution or implementation partner.",
      "Add a realistic timeline and explain feasibility."
    ]
  },
  "BLUE": {
    "feedback": "The idea has potential, but its strongest fit may be with a different opportunity, research group, institution or policy area. This is a suggested direction, not a confirmed referral.",
    "actions": [
      "Review the suggested alternative route and its current requirements.",
      "Adapt the proposal to the relevant audience or policy area.",
      "Verify the opportunity directly with the external provider."
    ]
  },
  "RED": {
    "feedback": "The submission is not yet ready for this route. Key parts are missing or the proposal needs substantial reconsideration before it can be reviewed meaningfully.",
    "actions": [
      "Revisit the problem and define the issue more clearly.",
      "Reconsider the target group and evidence base.",
      "Use the relevant Learning Hub lessons before preparing a new draft."
    ]
  }
};
