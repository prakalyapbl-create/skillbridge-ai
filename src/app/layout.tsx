import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SkillBridge AI - From Skill Gaps to Career Opportunities',
  description: 'AI-powered multilingual career-readiness platform for college students.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 antialiased">{children}</body>
    </html>
  );
}
