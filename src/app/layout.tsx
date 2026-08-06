import type { Metadata } from "next";
import { Archivo, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shlokgoenka.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shlok Kumar Goenka — Technical Product Analyst",
    template: "%s — Shlok Kumar Goenka",
  },
  description:
    "From raw data to product decisions, through AI systems, analytics, and automation that turn ambiguous problems into measurable outcomes.",
  keywords: [
    "Technical Product Analyst",
    "Product Analyst",
    "Data Science",
    "AI",
    "Automation",
    "Fintech",
    "Shlok Kumar Goenka",
  ],
  authors: [{ name: "Shlok Kumar Goenka" }],
  openGraph: {
    title: "Shlok Kumar Goenka — Technical Product Analyst",
    description:
      "Product, AI & Automation, Fintech. AI systems, analytics, and automation that turn ambiguous problems into measurable outcomes.",
    url: SITE_URL,
    siteName: "Shlok Kumar Goenka",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shlok Kumar Goenka — Technical Product Analyst",
    description:
      "Product, AI & Automation, Fintech. Turning ambiguous problems into measurable outcomes.",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <Toaster position="bottom-right" theme="system" richColors closeButton />
      </body>
    </html>
  );
}
