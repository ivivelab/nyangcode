import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "냥코드 (NyangCode)",
  description: "츄르주면 문제 해결해줄께.",
  keywords: ["냥코드", "NyangCode", "부분의뢰", "막힌곳만 쏙", "웹개발", "앱개발", "업무자동화", "유지보수", "Nextjs", "코딩하는고양이"],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "냥코드 (NyangCode) | 웹·앱 개발 & 업무 자동화 스튜디오",
    description: "간식보다 코드가 더 짜릿한 꾸꾸 함께하는 고성능 디지털 스튜디오",
    url: "https://nyangcode.com",
    siteName: "냥코드",
    locale: "ko_KR",
    type: "website",
  },
};

// Next.js App Router 표준 방식의 뷰포트 설정 (모바일 확대/축소 고정)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}