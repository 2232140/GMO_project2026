import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import StarField from "@/components/ui/StarField";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MIRROR GRAPH — 今日の私をプロデュース",
  description: "AIスタイリング × Y2Kトレカコレクション",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${nunito.variable} h-full`}>
      <body className="min-h-full flex flex-col aurora-bg relative">
        <StarField />
        <div className="relative z-10 flex flex-col min-h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
