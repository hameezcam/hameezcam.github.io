"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#docs", label: "Docs" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark border-b border-primary-light dark:border-primary-dark">
      <motion.nav
        className="container mx-auto flex items-center justify-between py-4 px-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-2xl font-bold">Hameez Cambal</div>
        <ul className="flex space-x-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-foreground-light dark:text-foreground-dark hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </motion.nav>
    </header>
  );
}
