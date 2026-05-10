import { useState, useMemo } from "react";
import notes from "./data/index";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import NoteContent from "./components/NoteContent";

const allTopics = Object.entries(notes).flatMap(([section, data]) =>
  Object.keys(data.topics).map((topic) => ({ section, topic }))
);

export default function CSNotes() {
  const firstSection = Object.keys(notes)[0];
  const firstTopic = Object.keys(notes[firstSection].topics)[0];

  const [activeSection, setActiveSection] = useState(firstSection);
  const [activeTopic, setActiveTopic] = useState(firstTopic);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return allTopics
      .filter(
        ({ topic, section }) =>
          topic.toLowerCase().includes(q) || section.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [search]);

  const currentNote = notes[activeSection]?.topics[activeTopic];

  const selectTopic = (section, topic) => {
    setActiveSection(section);
    setActiveTopic(topic);
    setSearch("");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "var(--font-sans, system-ui, sans-serif)",
        background: "#ffffff",
        overflow: "hidden",
      }}
    >
      <Sidebar
        notes={notes}
        activeSection={activeSection}
        activeTopic={activeTopic}
        sidebarOpen={sidebarOpen}
        search={search}
        searchResults={searchResults}
        onSearch={setSearch}
        onSelectTopic={selectTopic}
      />

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TopBar
          activeSection={activeSection}
          activeTopic={activeTopic}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        <NoteContent
          notes={notes}
          activeSection={activeSection}
          activeTopic={activeTopic}
          currentNote={currentNote}
          onSetTopic={(topic) => setActiveTopic(topic)}
        />
      </div>
    </div>
  );
}
