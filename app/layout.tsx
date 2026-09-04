import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hameez Cambal | Cybersecurity Analyst & Specialist Portfolio",
  description:
    "Professional portfolio of Hameez Cambal, a Cybersecurity Analyst, SOC Enthusiast, and Network Security Specialist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
