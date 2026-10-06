import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hameez Cambal | Cybersecurity Analyst",
  description:
    "Cybersecurity Analyst specializing in security operations, SIEM, threat detection, incident response, vulnerability assessment, Microsoft security, and cybersecurity tooling.",
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
