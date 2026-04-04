import React from "react";

function Footer({ studentName, studentId, githubUrl }) {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <p style={styles.text}>
          2026 © <span style={styles.bold}>Dawai | دَوَائي</span> • Organize
          your medications and stay healthy.
        </p>

        <p style={styles.text}>
          Developed by <span style={styles.bold}>{studentName}</span> | Student ID:{" "}
          <span style={styles.bold}>{studentId}</span>
        </p>

        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className="btn"
          style={{ background: "#2b6cb0", color: "#fff" }}
        >
          View GitHub Profile
        </a>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "20px",
    padding: "16px",
    borderTop: "1px solid #dbeafe",
    background: "linear-gradient(180deg, #f8fbff 0%, #eef6ff 100%)",
    textAlign: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
  },
  text: {
    margin: 0,
    fontSize: "14px",
    color: "#4b5563",
  },
  bold: {
    fontWeight: "600",
    color: "#1e3a8a",
  },
};

export default Footer;