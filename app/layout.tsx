import Navbar from '@/components/layout/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Suspense } from 'react'



export const metadata: Metadata = {
  title: 'Open Fashion',
  description: 'Lets do it',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="">
        <Navbar/>
        <Suspense>
          <main className="container">
            {children}
          </main>
        </Suspense>
      </body>
    </html>
  )
}
