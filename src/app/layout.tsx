import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader, SiteFooter } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "PYDP | Pakistan Youth Diplomacy & Policy Pathways",
  description: "Pakistan Youth Diplomacy & Policy Pathways.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('pydp_theme');document.documentElement.dataset.theme=t==='dark'||t==='light'?t:window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}})();` }} /></head>
      <body className="antialiased"><Providers><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><main id="main-content" className="main-container" tabIndex={-1}>{children}</main><SiteFooter /></Providers></body>
    </html>
  );
}
