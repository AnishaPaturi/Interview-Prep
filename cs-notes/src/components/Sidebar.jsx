export default function Sidebar({
  notes,
  activeSection,
  activeTopic,
  sidebarOpen,
  search,
  searchResults,
  onSearch,
  onSelectTopic,
}) {
  return (
    <div
      style={{
        width: sidebarOpen ? 260 : 0,
        minWidth: sidebarOpen ? 260 : 0,
        transition: "all 0.2s",
        overflow: "hidden",
        background: "#ffffff",
        borderRight: "0.5px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header + Search */}
      <div
        style={{
          padding: "16px 12px 8px",
          borderBottom: "0.5px solid #e0e0e0",
        }}
      >
        <div
          style={{
            fontWeight: 500,
            fontSize: 15,
            color: "#000000",
            marginBottom: 8,
          }}
        >
          <i
            className="ti ti-book-2"
            style={{ marginRight: 6, color: "#333333" }}
            aria-hidden="true"
          />
          CS Notes
        </div>

        <input
          type="text"
          placeholder="Search topics..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          style={{
            width: "100%",
            fontSize: 13,
            boxSizing: "border-box",
            color: "#000000",
            background: "#fff",
            border: "0.5px solid #e0e0e0",
            borderRadius: 6,
            padding: "6px 8px",
            outline: "none",
          }}
        />

        {searchResults.length > 0 && (
          <div
            style={{
              marginTop: 6,
              maxHeight: 200,
              overflowY: "auto",
              background: "#ffffff",
              borderRadius: 8,
              border: "0.5px solid #e0e0e0",
            }}
          >
            {searchResults.map(({ section, topic }) => (
              <div
                key={`${section}:${topic}`}
                onClick={() => onSelectTopic(section, topic)}
                style={{
                  padding: "8px 10px",
                  cursor: "pointer",
                  fontSize: 12,
                  borderBottom: "0.5px solid #e0e0e0",
                }}
              >
                <div style={{ fontWeight: 500, color: "#000000" }}>{topic}</div>
                <div style={{ color: "#666666", fontSize: 11 }}>{section}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subject + Topic list */}
      <div style={{ overflowY: "auto", flex: 1 }}>
        {Object.entries(notes).map(([section, data]) => (
          <div key={section}>
            <div
              style={{
                padding: "10px 12px 4px",
                fontSize: 11,
                fontWeight: 500,
                color: "#555555",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <i
                className={`ti ${data.icon}`}
                style={{ fontSize: 13, color: "#333333" }}
                aria-hidden="true"
              />
              {section}
            </div>

            {Object.keys(data.topics).map((topic) => (
              <div
                key={topic}
                onClick={() => onSelectTopic(section, topic)}
                style={{
                  padding: "6px 12px 6px 28px",
                  cursor: "pointer",
                  fontSize: 13,
                  color:
                    activeSection === section && activeTopic === topic
                      ? "#000000"
                      : "#666666",
                  background:
                    activeSection === section && activeTopic === topic
                      ? "#f0f0f0"
                      : "transparent",
                  borderLeft:
                    activeSection === section && activeTopic === topic
                      ? `3px solid ${data.color}`
                      : "3px solid transparent",
                  fontWeight:
                    activeSection === section && activeTopic === topic
                      ? 500
                      : 400,
                }}
              >
                {topic}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
