import { Clock } from "./Clock";

const GITHUB = "https://github.com/shlokDS16";
const LINKEDIN = "https://www.linkedin.com/in/shlokgoenka/";
const EMAIL = "shlokgoenka77@gmail.com";

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div>© 2026 SHLOK KUMAR GOENKA</div>
        <div className="l">
          <a href={GITHUB} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${EMAIL}`}>Email</a>
        </div>
        <div className="tnum">
          <Clock prefix="SYS " />
        </div>
      </div>
    </footer>
  );
}
