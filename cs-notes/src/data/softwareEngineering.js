const softwareEngineeringData = {
  "Software Engineering": {
    icon: "ti-settings",
    color: "#5F5E5A",
    topics: {
      "SDLC": {
        explanation: "The Software Development Life Cycle is a structured process for planning, creating, testing, and deploying software.",
        details: [
          "Phases: Planning, Requirements, Design, Implementation, Testing, Deployment, Maintenance",
          "Models: Waterfall, Agile, Spiral, V-Model, RAD",
          "Goal: deliver high-quality software on time and within budget"
        ],
        example: `// SDLC phases
1. PLANNING       → feasibility, timeline, budget
2. REQUIREMENTS   → SRS document (functional + non-functional)
3. DESIGN         → HLD (architecture), LLD (schemas, classes)
4. IMPLEMENTATION → coding, code review, version control
5. TESTING        → unit, integration, system, UAT
6. DEPLOYMENT     → release to production
7. MAINTENANCE    → bug fixes, updates, enhancements`
      },
      "Agile/Scrum": {
        explanation: "Agile is an iterative methodology. Scrum is a popular framework using short sprints (1–4 weeks) to deliver working software incrementally.",
        details: [
          "Roles: Product Owner, Scrum Master, Development Team",
          "Artifacts: Product Backlog, Sprint Backlog, Increment",
          "Ceremonies: Sprint Planning, Daily Standup, Sprint Review, Retrospective"
        ],
        example: `// User Story format
"As a [user], I want [feature] so that [benefit]"
Ex: "As a customer, I want to filter by price
     so that I can find affordable items."

// Sprint 2 weeks:
Planning → Daily Standup (15 min) → Review → Retrospective

// Daily Standup:
// What did I do yesterday?
// What will I do today?
// Any blockers?`
      },
      "Git": {
        explanation: "Git is a distributed version control system that tracks changes in code, enables collaboration, and allows reverting to previous versions.",
        details: [
          "Repository: project folder tracked by git",
          "Commit: snapshot of changes with a message",
          "Branch: independent line of development",
          "Merge: combine branches; Rebase: replay commits"
        ],
        example: `git init / git clone <url>
git add . && git commit -m "Add feature"
git push origin main / git pull origin main

git branch feature/login    # create branch
git checkout -b feature/signup  # create + switch

git merge feature/login     # merge into current
git log --oneline           # view history
git stash / git stash pop   # save/restore WIP
git reset --soft HEAD~1     # undo last commit (keep changes)`
      }
    }
  }
};

export default softwareEngineeringData;
