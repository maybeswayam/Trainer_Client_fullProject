import type { Metadata, Viewport } from "next"
import { Bebas_Neue, DM_Sans, DM_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "sonner"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
})

const bebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "Transform OS - Professional Fitness Management Platform",
  description:
    "The ultimate fitness management platform for trainers and clients. Track workouts, monitor progress, and achieve transformation goals with precision."
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark bg-background ${dmSans.variable} ${dmMono.variable} ${bebas.variable}`}>
      <body className="font-sans antialiased h-[100dvh] overflow-hidden bg-background text-foreground">
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#111",
              border: "1px solid rgba(184,245,160,0.3)",
              color: "#f0ede8",
              fontFamily: "var(--font-dm-mono)",
              fontSize: "12px",
            },
          }}
        />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
