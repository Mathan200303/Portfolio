import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jeyakumar Namrmathan - Software Developer',
  description: 'Portfolio of Jeyakumar Namrmathan - Software Developer specializing in MERN stack',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
