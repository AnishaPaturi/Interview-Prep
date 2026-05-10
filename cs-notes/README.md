# CS Notes — Refactored Project Structure

## Folder Layout

```
src/
├── App.jsx                        ← Main entry point (wires everything)
├── components/
│   ├── Sidebar.jsx                ← Subject/topic navigation sidebar
│   ├── TopBar.jsx                 ← Breadcrumb bar + sidebar toggle
│   └── NoteContent.jsx            ← Displays explanation, key points, code
└── data/
    ├── index.js                   ← Merges all subject files into one `notes` object
    ├── generativeAI.js            ← Generative AI topics
    ├── operatingSystems.js        ← Operating Systems topics
    ├── dbms.js                    ← DBMS topics
    ├── sql.js                     ← SQL topics
    ├── dataStructures.js          ← Data Structures topics
    ├── algorithms.js              ← Algorithms topics
    ├── oops.js                    ← OOPs topics
    ├── computerNetworks.js        ← Computer Networks topics
    ├── programmingFundamentals.js ← Programming Fundamentals topics
    ├── aiMlGenai.js               ← AI / ML / GenAI topics
    ├── softwareEngineering.js     ← Software Engineering topics
    ├── cybersecurity.js           ← Cybersecurity topics
    ├── cloudDevops.js             ← Cloud & DevOps topics
    ├── javaSE8.js                 ← Java SE 8 (OCA + OCP) topics
    ├── daa.js                     ← DAA topics
    ├── competitiveProgramming.js  ← Competitive Programming topics
    └── python.js                  ← Python topics
```

## How It Works

1. **Each subject file** (`data/operatingSystems.js`, etc.) exports a plain JS object
   with a single key (the subject name) containing `icon`, `color`, and `topics`.

2. **`data/index.js`** imports all subject files and spreads them into one `notes` object —
   this is the single source of truth consumed by components.

3. **`App.jsx`** manages all state (`activeSection`, `activeTopic`, `search`, `sidebarOpen`)
   and passes props down to the three components.

4. **`Sidebar.jsx`** renders the subject/topic list and search box.

5. **`TopBar.jsx`** renders the breadcrumb and sidebar toggle button.

6. **`NoteContent.jsx`** renders the explanation, key points, code example, and prev/next nav.

## Adding a New Subject

1. Create `src/data/myNewSubject.js`:
   ```js
   const myNewSubjectData = {
     "My Subject": {
       icon: "ti-code",
       color: "#123456",
       topics: {
         "Topic 1": {
           explanation: "...",
           details: ["point 1", "point 2"],
           example: `// code here`
         }
       }
     }
   };
   export default myNewSubjectData;
   ```

2. Import and spread it in `src/data/index.js`:
   ```js
   import myNewSubjectData from "./myNewSubject";
   const notes = { ...existingSubjects, ...myNewSubjectData };
   ```

That's it — the sidebar and content area pick it up automatically.
