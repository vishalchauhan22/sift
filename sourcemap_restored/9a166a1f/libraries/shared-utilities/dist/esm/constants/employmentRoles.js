import "../chunk-BYZ2GIR3.js";
const CEO = "CEO";
const COMMUNICATIONS = "Communications";
const CONSULTING = "Consulting";
const CUSTOMER_SERVICE = "Customer Service";
const EDUCATION = "Education";
const ENGINEERING = "Engineering";
const EXECUTIVE = "Executive";
const FINANCE = "Finance";
const FOUNDER = "Founder";
const HEALTH_PROFESSIONAL = "Health Professional";
const HUMAN_RESOURCES = "Human Resources";
const INFORMATION_TECHNOLOGY = "Information Technology";
const LEGAL = "Legal";
const MARKETING = "Marketing";
const OPERATIONS = "Operations";
const OWNER = "Owner";
const PRESIDENT = "President";
const PRODUCT = "Product";
const PUBLIC_RELATIONS = "Public Relations";
const REAL_ESTATE = "Real Estate";
const RECRUITING = "Recruiting";
const RESEARCH = "Research";
const SALES = "Sales";
const PERSONAL = "Personal";
const OTHER = "Other";
const ALL = [
  CEO,
  COMMUNICATIONS,
  CONSULTING,
  CUSTOMER_SERVICE,
  EDUCATION,
  ENGINEERING,
  EXECUTIVE,
  FINANCE,
  FOUNDER,
  HEALTH_PROFESSIONAL,
  HUMAN_RESOURCES,
  INFORMATION_TECHNOLOGY,
  LEGAL,
  MARKETING,
  OPERATIONS,
  OWNER,
  PRESIDENT,
  PRODUCT,
  PUBLIC_RELATIONS,
  REAL_ESTATE,
  RECRUITING,
  RESEARCH,
  SALES,
  PERSONAL,
  OTHER
];
const SUPPORT = "Support";
const DESIGN = "Design";
const CUSTOMER_SUCCESS = "Customer Success";
const ONBOARDING_JOB_ROLES = [
  EXECUTIVE,
  SALES,
  PRODUCT,
  SUPPORT,
  MARKETING,
  DESIGN,
  OPERATIONS,
  ENGINEERING,
  CUSTOMER_SUCCESS,
  HUMAN_RESOURCES
];
const MANAGEMENT_LEVEL_IC = "Individual Contributor";
const MANAGEMENT_LEVEL_MANAGER = "Manager";
const MANAGEMENT_LEVEL_EXECUTIVE = "Executive";
const ONBOARDING_MANAGEMENT_LEVELS = [
  MANAGEMENT_LEVEL_IC,
  MANAGEMENT_LEVEL_MANAGER,
  MANAGEMENT_LEVEL_EXECUTIVE
];
const ONBOARDING_JOB_ROLES_WITH_MESSAGE = [
  {
    role: SALES,
    message: "Sales teams use Loom for personal outreach videos.",
    emojiShortName: "handshake"
  },
  {
    role: DESIGN,
    message: "Designers use Loom to walk through designs."
  },
  {
    role: PRODUCT,
    message: "Product teams use Loom to provide context."
  },
  {
    role: ENGINEERING,
    message: "Engineers use Loom to demo new features."
  },
  {
    role: MARKETING,
    message: "Marketing teams use Loom to promote new features."
  },
  {
    role: OPERATIONS,
    message: "Operations teams use Loom to provide feedback."
  },
  {
    role: SUPPORT,
    message: "Support teams use Loom to record how-to videos."
  },
  {
    role: CUSTOMER_SUCCESS,
    message: "Customer Success teams use Loom to onboard new customers."
  },
  {
    role: EXECUTIVE,
    message: "Executives use Loom to send out company updates."
  },
  {
    role: HUMAN_RESOURCES,
    message: "HR teams use Loom to onboard new teammates."
  },
  {
    role: OTHER,
    message: "People use Loom to share ideas and provide context."
  }
];
const ONBOARDING_NOTIFICATIONS_ON_JOB_ROLES = {
  [MARKETING]: {
    message: "Highlight new features to help customers get the most out of your product. Discover how the best Marketing teams use Loom effectively",
    title: "Highlight new product features with Loom",
    notificationTitle: "Record a Loom to highlight new features",
    videoId: "473fad25ebd24b5ea8091503253dfecf"
  },
  [SALES]: {
    message: "Capture your prospect\u2019s attention and build a personal connection right from the start with a personalized video. Discover how the best Sales & Success teams use Loom effectively",
    title: "Add a personal touch to your communication with a Loom",
    notificationTitle: "Record a Loom to add a personal touch",
    videoId: "94b9a9dbe2304e408e34113bf7c94723"
  },
  [CUSTOMER_SUCCESS]: {
    message: "Capture your prospect\u2019s attention and build a personal connection right from the start with a personalized video. Discover how the best Sales & Success teams use Loom effectively",
    title: "Add a personal touch to your communication with a Loom",
    notificationTitle: "Record a Loom to add a personal touch",
    videoId: "94b9a9dbe2304e408e34113bf7c94723"
  },
  [ENGINEERING]: {
    message: "Add a Loom to your next PR to accelerate the review. Discover how 10x Engineering teams use Loom effectively",
    title: "Accelerate your next code review with a Loom",
    notificationTitle: "Record a Loom to speed up your next code review",
    videoId: "58f28868587a4a78bdc5b638836c5438"
  },
  [DESIGN]: {
    message: "Instead of scheduling a quick sync to walk through designs, record a Loom instead. Discover how the best Design teams use Loom effectively",
    title: "Share your new designs with a Loom",
    notificationTitle: "Record a Loom to share your new designs",
    videoId: "184bd186134943d5b58a72fd29242ddf"
  },
  [SUPPORT]: {
    message: "Make it easier for a customer to understand a specific workflow or feature in your product with a Loom. Discover how the best Support teams use Loom effectively",
    title: "Help resolve your customer\u2019s issue with a  Loom ",
    notificationTitle: "Record a Loom to help your customers ",
    videoId: "3906c5248a424f0e9d6585856b76918a"
  },
  [PRODUCT]: {
    message: "Record a walkthrough of your product specs and timelines. Discover how the best Product teams use Loom effectively",
    title: "Share your product roadmap with a Loom",
    notificationTitle: "Record a Loom of your roadmap",
    videoId: "fc8cee3a6f514d32a5bcb0cd1ef391ca"
  },
  [EXECUTIVE]: {
    message: "Streamline your next meeting by sending over a pre-watch Loom. Discover how the best Leaders use Loom effectively",
    title: "Save time by recording a pre-watch Loom before a meeting",
    notificationTitle: "Record a pre-watch Loom before your next meeting",
    videoId: "3906c5248a424f0e9d6585856b76918a"
  },
  [EDUCATION]: {
    message: "Add helpful context to your next homework assignments by recording a Loom. Discover how the best Educators use Loom",
    title: "Add more context to your assignments with a Loom",
    notificationTitle: "Record a Loom to add context to assignments",
    videoId: "bfad5e8907854db1b61e66a46553c28c"
  },
  [PERSONAL]: {
    message: "Save time for you and your customers by sending a Loom. Discover all the ways you can use Loom",
    title: "Help save your customers\u2019 time with a Loom",
    notificationTitle: "Record a Loom to save time",
    videoId: "3906c5248a424f0e9d6585856b76918a"
  },
  [OTHER]: {
    message: "Save your teammates 30 minutes or more with a quick Loom to replace or complement a meeting. Discover all the ways you can use Loom",
    title: "Help your teammates save time with a Loom",
    notificationTitle: "Record a Loom to save time",
    videoId: "3906c5248a424f0e9d6585856b76918a"
  }
};
const ONBOARDING_NOTIFICATIONS_REMINDER_ON_JOB_ROLES = {
  [MARKETING]: {
    message: "Share a video walkthrough of your latest content marketing campaign. Discover how the best Marketing teams use Loom effectively",
    title: "Showcase your latest content marketing campaign with Loom",
    notificationTitle: "Record a Loom to showcase your latest marketing campaign",
    videoId: "3a08fa56f26e4536ac2fdd0fbcfd2321"
  },
  [SALES]: {
    message: "Optimize your next sales enablement session with a Loom. Discover how the best Sales & Success teams use Loom effectively",
    title: "Share a detailed walkthrough of the deal with the customer using Loom",
    notificationTitle: "Record a Loom to share the details of the deal with the customer",
    videoId: "6c8abbf2d2864fcb8b5e617102b36d5b"
  },
  [CUSTOMER_SUCCESS]: {
    message: "Optimize your next sales enablement session with a Loom. Discover how the best Sales & Success teams use Loom effectively",
    title: "Share a detailed walkthrough of the deal with the customer using Loom",
    notificationTitle: "Record a Loom to share the details of the deal with the customer",
    videoId: "6c8abbf2d2864fcb8b5e617102b36d5b"
  },
  [ENGINEERING]: {
    message: "Record bugs in your development environment to document, diagnose, and resolve them faster. Discover how the best Engineering teams use Loom effectively",
    title: "Document and diagnose bugs faster with Loom",
    notificationTitle: "Record a Loom to accelerate bug resolution",
    videoId: "ae496101aae14583980cd6eab62360dd"
  },
  [DESIGN]: {
    message: "Supercharge your next design critique with a Loom. Discover how the best Design teams use Loom effectively",
    title: "Make design critiques more effective with Loom",
    notificationTitle: "Record a Loom to critique new designs ",
    videoId: "197d7ead107148cd9512ae6e4b6a085c"
  },
  [SUPPORT]: {
    message: "Make support documentation more engaging by adding a video. Discover how the best Support teams use Loom effectively",
    title: "Add life to support documentation with Loom ",
    notificationTitle: "Record a Loom to upgrade your support documentation",
    videoId: "473fad25ebd24b5ea8091503253dfecf"
  },
  [PRODUCT]: {
    message: "Help your cross-functional partners get ready for the next product kickoff by sharing a video message. Discover how the best Product teams use Loom effectively",
    title: "Get ready for your next product kickoff with Loom",
    notificationTitle: "Record a Loom before the next product kickoff",
    videoId: "b6a0cc53d9a8443d842170895839543e"
  },
  [EXECUTIVE]: {
    message: "Amplify your next announcement by adding a video message. Discover how the best Leaders use Loom effectively",
    title: "Broaden the reach of your next announcement with Loom",
    notificationTitle: "Record a Loom to broaden the reach of your next announcement",
    videoId: "d356cb172656442b8b17d5a2213eea83"
  },
  [EDUCATION]: {
    message: "Complement your curriculum with a Loom. Discover how the best Educators use Loom",
    title: "Record a Loom to complement your curriculum",
    notificationTitle: "Record a Loom to complement your curriculum",
    videoId: "3906c5248a424f0e9d6585856b76918a"
  },
  [PERSONAL]: {
    message: "Add a personal touch to your communication by sending a Loom. Discover all the ways you can use Loom",
    title: "Personalize communication with Loom",
    notificationTitle: "Record a loom to add a personal touch to your messages",
    videoId: "dea825b9e4e944b2bb9b70d570bf192f"
  },
  [OTHER]: {
    message: "Add a personal touch to your communication by sending a Loom. Discover all the ways you can use Loom",
    title: "Personalize communication with Loom",
    notificationTitle: "Record a Loom to add a personal touch to your messages",
    videoId: "dea825b9e4e944b2bb9b70d570bf192f"
  }
};
const MOBILE_ONBOARDING_NOTIFICATIONS_ON_JOB_ROLES = {
  [ENGINEERING]: {
    message: "35% of teams like yours use quick recordings to share progress and stay in sync",
    title: "Record a demo with Loom and save meeting minutes \u{1F4A1}"
  },
  [PRODUCT]: {
    message: "25% of teams like yours use quick recordings to stay in sync",
    title: "Send a message with Loom and save meeting minutes \u{1F4A1}"
  }
};
const USE_CASE_LINKS_ON_ROLES = {
  [CUSTOMER_SUCCESS]: "use-case/sales",
  [EDUCATION]: "use-case/education",
  [ENGINEERING]: "use-case/engineering",
  [EXECUTIVE]: "use-case/team-alignment",
  [MARKETING]: "use-case/marketing",
  [OTHER]: "use-case",
  [PERSONAL]: "use-case",
  [PRODUCT]: "use-case/product-management",
  [SALES]: "use-case/sales"
};
export {
  ALL,
  CEO,
  COMMUNICATIONS,
  CONSULTING,
  CUSTOMER_SERVICE,
  CUSTOMER_SUCCESS,
  DESIGN,
  EDUCATION,
  ENGINEERING,
  EXECUTIVE,
  FINANCE,
  FOUNDER,
  HEALTH_PROFESSIONAL,
  HUMAN_RESOURCES,
  INFORMATION_TECHNOLOGY,
  LEGAL,
  MANAGEMENT_LEVEL_EXECUTIVE,
  MANAGEMENT_LEVEL_IC,
  MANAGEMENT_LEVEL_MANAGER,
  MARKETING,
  MOBILE_ONBOARDING_NOTIFICATIONS_ON_JOB_ROLES,
  ONBOARDING_JOB_ROLES,
  ONBOARDING_JOB_ROLES_WITH_MESSAGE,
  ONBOARDING_MANAGEMENT_LEVELS,
  ONBOARDING_NOTIFICATIONS_ON_JOB_ROLES,
  ONBOARDING_NOTIFICATIONS_REMINDER_ON_JOB_ROLES,
  OPERATIONS,
  OTHER,
  OWNER,
  PERSONAL,
  PRESIDENT,
  PRODUCT,
  PUBLIC_RELATIONS,
  REAL_ESTATE,
  RECRUITING,
  RESEARCH,
  SALES,
  SUPPORT,
  USE_CASE_LINKS_ON_ROLES
};
//# sourceMappingURL=employmentRoles.js.map
