import type { Metadata } from "next"
import { Syne, Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google"
import { PostHogProvider } from "@/components/PostHogProvider"
import "./globals.css"

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Tempo — Ship at the speed of Tempo",
  description: "Turn screenshots into Apple-style product videos in 60 seconds",
  openGraph: {
    title: "Tempo — Ship at the speed of Tempo",
    description: "Turn screenshots into Apple-style product videos in 60 seconds. No editing skills required.",
    type: "website",
    siteName: "Tempo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tempo — Ship at the speed of Tempo",
    description: "Turn screenshots into Apple-style product videos in 60 seconds",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}
