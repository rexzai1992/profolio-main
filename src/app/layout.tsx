import type { Metadata } from "next";
import type { ReactNode } from "react";

import { GlobalSystemDebug } from "@/components/debug/global-system-debug";
import { Navbar } from "@/components/layout/navbar";
import { PerformanceModeProvider } from "@/components/providers/performance-mode-provider";
import { PortfolioContentProvider } from "@/components/providers/portfolio-content-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { defaultPortfolioContent } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  title: `${defaultPortfolioContent.site.name} | Custom App Development`,
  description: defaultPortfolioContent.site.description,
  metadataBase: new URL("https://izzulfitree.com"),
  openGraph: {
    title: `${defaultPortfolioContent.site.name} | Custom App Development`,
    description: defaultPortfolioContent.site.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${defaultPortfolioContent.site.name} | Custom App Development`,
    description: defaultPortfolioContent.site.description,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a href="#content" className="skip-link">
          Skip to content
        </a>

        <PortfolioContentProvider>
          <ThemeProvider>
            <PerformanceModeProvider>
              <div className="min-h-screen overflow-x-clip transition-colors duration-300">
                <Navbar />
                {children}
                <GlobalSystemDebug />
              </div>
            </PerformanceModeProvider>
          </ThemeProvider>
        </PortfolioContentProvider>
      </body>
    </html>
  );
}
