import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Header, Footer } from "@/components/site";
import { I18nProvider } from "@/components/i18n-provider";
import { getLng, getT } from "@/lib/i18n/server";
import "./globals.css";
const head = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-head",
});
const body = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
});
export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    icons: {
      icon: "/favicon.ico", // Путь относительно папки public
    },
  };
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lng = await getLng();
  return (
    <html lang={lng}>
      <body className={`${head.variable} ${body.variable} antialiased`}>
        <I18nProvider lng={lng}>
          <Header />
          {children}
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
