// ============================================================
//  EDIT YOUR PORTFOLIO CONTENT HERE
//  This is the ONLY file you need to touch to update text,
//  links, projects, skills and experience. Save and the site
//  updates automatically.
// ============================================================

//  1) BASIC INFO  ------------------------------------------------
export const profile = {
  name: "Chris Ruzario",                       // <-- your name (appears big in the hero)
  tagline: "Business Analytics | Data, Strategy & Systems", // <-- short tagline
  intro:
    "I turn data, business problems, and technology into clear insights and practical solutions.", // <-- one-line intro
};

//  2) CONTACT LINKS  --------------------------------------------
export const contact = {
  email: "chris25cr7@gmail.com",               // <-- your email
  linkedin: "https://www.linkedin.com/in/chrisruzario", // <-- your LinkedIn URL
  github: "https://github.com/chrisruzario",   // <-- your GitHub URL
};

//  3) ABOUT ME  -------------------------------------------------
export const about =
  "I am a student of Business Analytics and a Computer Engineer. I like to play in the data analysis, business strategy, dashboards and process improvement sandboxes, taking messy business problems in the real world and turning them into clear insights and well designed, practical solutions.";

//  4) SKILLS  (add / remove freely) -----------------------------
export const skills = [
  "Business Analysis",
  "Data Analysis",
  "SQL",
  "Excel",
  "Power BI",
  "Python Basics",
  "R",
  "Dashboarding",
  "Problem Solving",
  "Communication",
];

//  5) PROJECTS  (edit title, summary, tools, and links) ---------
export const projects = [
  {
    title: "Taxi Fare Prediction Dashboard",
    summary:
      "Data cleaning, machine learning, and dashboard insights using taxi trip data.",
    tools: ["Python", "Pandas", "Scikit-learn", "Power BI"],
    github: "https://github.com/chrisruzario/NYC-Taxi-Fare-Prediction-Spark",     // <-- replace # with your GitHub repo link
    demo: "#",       // <-- replace # with your live demo link (or remove)
  },
  {
    title: "Irish Housing Price Analysis",
    summary:
      "Econometric analysis of housing price trends using R.",
    tools: ["R", "Econometrics", "ggplot2"],
    github: "https://github.com/chrisruzario/ireland-new-houses-econometrics",
    demo: "#",
  },
  {
    title: "Startup Success Analysis",
    summary:
      "Classification and insights project exploring startup performance factors.",
    tools: ["Python", "Classification", "EDA"],
    github: "https://github.com/chrisruzario/startup-success-prediction",
    demo: "#",
  },
];

//  6) EXPERIENCE  (timeline — add your roles here) --------------
export const experience = [
  {
    period: "2025 — Present",
    role: "MSc in Business Analytics",
    company: "University of Limerick",       // <-- edit
    detail:
      "Focusing on data analysis, statistics, dashboarding and applied business strategy.",
  },
 
  {
    period: "2021 — 2025",
    role: "B.E in Computer Engineering",
    company: "Don Bosco Institute Of Technology",        // <-- edit
    detail:
      "Foundation in programming, systems and problem solving that powers my analytics work.",
  },
];
