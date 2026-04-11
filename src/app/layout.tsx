import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Navbar } from "@/components/layout/navbar";
import { PortfolioContentProvider } from "@/components/providers/portfolio-content-provider";
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
      <body className="bg-ink text-white antialiased">
        <a href="#content" className="skip-link">
          Skip to content
        </a>

        <PortfolioContentProvider>
          <div className="min-h-screen overflow-x-clip bg-ink">
            <Navbar />
            {children}
          </div>
        </PortfolioContentProvider>
      </body>
    </html>
  );
}
