import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark py-6 border-t border-foreground-light/10 dark:border-foreground-dark/10">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-2 px-4">
        <div className="flex space-x-4">
          <Link href="https://www.linkedin.com/in/hameez-cambal" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            LinkedIn
          </Link>
          <Link href="https://github.com/hameezcam" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            GitHub
          </Link>
          <Link href="mailto:hameez.cambal@example.com" className="hover:text-primary">
            Email
          </Link>
        </div>
        <p className="text-sm">© {new Date().getFullYear()} Hameez Cambal. All rights reserved.</p>
      </div>
    </footer>
  );
}
