export default function TopBar({ activeSection, activeTopic, onToggleSidebar }) {
  return (
    <div
      style={{
        padding: "12px 20px",
        background: "#ffffff",
        borderBottom: "0.5px solid #e0e0e0",
        display: "flex",
        alignItems: "center",
        gap: 12,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <button
        onClick={onToggleSidebar}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 4,
          color: "#666666",
        }}
      >
        <i
          className="ti ti-menu-2"
          style={{ fontSize: 18, color: "#333333" }}
          aria-hidden="true"
        />
      </button>

      <span style={{ fontSize: 13, color: "#666666" }}>{activeSection}</span>

      <i
        className="ti ti-chevron-right"
        style={{ fontSize: 12, color: "#999999" }}
        aria-hidden="true"
      />

      <span style={{ fontSize: 13, fontWeight: 500, color: "#000000" }}>
        {activeTopic}
      </span>
    </div>
  );
}
