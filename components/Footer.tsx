"use client";

export default function Footer() {
  return (
    <footer className="border-t border-primary-light dark:border-primary-dark py-6 text-center text-sm text-foreground-light dark:text-foreground-dark">
      <p>
        © {new Date().getFullYear()} Hameez Cambal · SOC Analyst & Cybersecurity Professional
      </p>
      <p className="mt-1">
        <a
          href="https://linkedin.com/in/hameezcambal"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          LinkedIn
        </a>
        {" · "}
        <a
          href="https://github.com/hameezcam"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          GitHub
        </a>
        {" · "}
        <a href="mailto:hameez.cambal@example.com" className="hover:underline">
          Email
        </a>
      </p>
    </footer>
  );
}
