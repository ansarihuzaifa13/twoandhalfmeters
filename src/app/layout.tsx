import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";

export const metadata: Metadata = {
  title: {
    default: "Two And Half Meters | Where Heritage Meets Luxury",
    template: "%s | Two And Half Meters",
  },
  description:
    "Handcrafted custom clothing and artisanal jewelry. Where heritage meets luxury - every piece made with love, precision, and years of artisanal expertise.",
  keywords: [
    "handcrafted clothing",
    "luxury fashion",
    "custom tailoring",
    "artisanal jewelry",
    "heritage craftsmanship",
    "premium fabrics",
    "bespoke clothing",
  ],
  authors: [{ name: "Two And Half Meters" }],
  creator: "Two And Half Meters",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://twoandhalfmeters.com",
    title: "Two And Half Meters | Where Heritage Meets Luxury",
    description:
      "Handcrafted custom clothing and artisanal jewelry. Where heritage meets luxury.",
    siteName: "Two And Half Meters",
  },
  twitter: {
    card: "summary_large_image",
    title: "Two And Half Meters | Where Heritage Meets Luxury",
    description:
      "Handcrafted custom clothing and artisanal jewelry.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
