export default function NoteContent({
  notes,
  activeSection,
  activeTopic,
  currentNote,
  onSetTopic,
}) {
  if (!currentNote) return null;

  const topics = Object.keys(notes[activeSection].topics);
  const idx = topics.indexOf(activeTopic);
  const prev = idx > 0 ? topics[idx - 1] : null;
  const next = idx < topics.length - 1 ? topics[idx + 1] : null;
  const sectionColor = notes[activeSection].color;
  const sectionIcon = notes[activeSection].icon;

  return (
    <div style={{ padding: "24px 32px", maxWidth: 860 }}>
      {/* Section tag */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "#f5f5f5",
          padding: "4px 12px",
          borderRadius: 100,
          fontSize: 12,
          color: "#666666",
          marginBottom: 12,
        }}
      >
        <i
          className={`ti ${sectionIcon}`}
          style={{ color: "#333333", fontSize: 13 }}
          aria-hidden="true"
        />
        {activeSection}
      </div>

      {/* Title */}
      <h1
        style={{
          margin: 0,
          fontSize: 26,
          fontWeight: 500,
          color: "#000000",
          marginBottom: 12,
        }}
      >
        {activeTopic}
      </h1>

      {/* Explanation */}
      <p
        style={{
          margin: 0,
          fontSize: 15,
          color: "#555555",
          lineHeight: 1.7,
          marginBottom: 20,
        }}
      >
        {currentNote.explanation}
      </p>

      {/* Key Points */}
      {currentNote.details && (
        <div
          style={{
            background: "#f5f5f5",
            borderRadius: 10,
            padding: "16px 20px",
            marginBottom: 20,
            borderLeft: `3px solid ${sectionColor}`,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "#666666",
              marginBottom: 10,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Key Points
          </div>
          {currentNote.details.map((d, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 6,
                fontSize: 13,
                color: "#000000",
                lineHeight: 1.6,
              }}
            >
              <span
                style={{
                  color: sectionColor,
                  fontWeight: 500,
                  minWidth: 16,
                }}
              >
                •
              </span>
              {d}
            </div>
          ))}
        </div>
      )}

      {/* Code Example */}
      {currentNote.example && (
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "#666666",
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Syntax & Examples
          </div>
          <div
            style={{
              background: "#f5f5f5",
              borderRadius: 10,
              padding: "20px 24px",
              overflowX: "auto",
            }}
          >
            <pre
              style={{
                margin: 0,
                fontFamily: "monospace",
                fontSize: 13,
                lineHeight: 1.7,
                color: "#000000",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {currentNote.example}
            </pre>
          </div>
        </div>
      )}

      {/* Prev / Next navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 32,
          paddingTop: 20,
          borderTop: "0.5px solid #e0e0e0",
        }}
      >
        {prev ? (
          <button
            onClick={() => onSetTopic(prev)}
            style={{
              fontSize: 13,
              color: "#666666",
              cursor: "pointer",
              background: "none",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <i className="ti ti-arrow-left" aria-hidden="true" />
            {prev}
          </button>
        ) : (
          <span />
        )}

        {next ? (
          <button
            onClick={() => onSetTopic(next)}
            style={{
              fontSize: 13,
              color: "#666666",
              cursor: "pointer",
              background: "none",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {next}
            <i className="ti ti-arrow-right" aria-hidden="true" />
          </button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
