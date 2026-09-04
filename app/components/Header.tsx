import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.remove('dark');
    } else {
      html.classList.add('dark');
    }
    setDarkMode(!darkMode);
  };

  return (
    <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark bg-opacity-70 backdrop-blur-lg border-b border-foreground-light/10 dark:border-foreground-dark/10">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
          Hameez Cambal
        </div>
        <ul className="flex space-x-6 text-sm font-medium">
          <li><Link href="#hero" className="hover:text-primary">Home</Link></li>
          <li><Link href="#about" className="hover:text-primary">About</Link></li>
          <li><Link href="#skills" className="hover:text-primary">Skills</Link></li>
          <li><Link href="#projects" className="hover:text-primary">Projects</Link></li>
          <li><Link href="#experience" className="hover:text-primary">Experience</Link></li>
          <li><Link href="#docs" className="hover:text-primary">Docs</Link></li>
          <li><Link href="#contact" className="hover:text-primary">Contact</Link></li>
        </ul>
        <button onClick={toggleTheme} aria-label="Toggle dark mode" className="ml-4 p-2 rounded-full hover:bg-primary/10">
          {darkMode ? '🌙' : '☀️'}
        </button>
      </nav>
    </header>
  );
}
