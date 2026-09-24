import type { Metadata, Viewport } from "next";
import { Nunito, Fredoka, Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";
import StarField from "@/components/ui/StarField";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const zenMaruGothic = Zen_Maru_Gothic({
  variable: "--font-zen-maru-gothic",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  preload: false,
});

export const metadata: Metadata = {
  title: "MIRROR GRAPH — 今日の私をプロデュース",
  description: "AIスタイリング × Y2Kトレカコレクション",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${nunito.variable} ${fredoka.variable} ${zenMaruGothic.variable} h-full`}>
      <body className="min-h-full flex flex-col fancy-bg relative">
        <StarField />
        <div className="relative z-10 flex flex-col min-h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
