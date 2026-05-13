import React from "react";

function Footer({ studentName, studentId, githubUrl }) {
  return (
    <footer className="team-footer">
      <div className="team-footer-content">
        <p className="mb-0">
          2026 © <span className="fw-semibold">Dawai</span> • Organize your medications and stay healthy.
        </p>

        <p className="mb-0">
          Developed by <span className="fw-semibold">{studentName}</span> | {studentId}
        </p>

        <a href={githubUrl} target="_blank" rel="noreferrer" className="btn btn-sm app-primary-button">
          View GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;
