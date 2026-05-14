import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentMesh — Multi-Agent Orchestration",
  description: "Autonomous AI agents coordinating, debating, and reaching verdicts using Gemini 2.0 Flash.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
