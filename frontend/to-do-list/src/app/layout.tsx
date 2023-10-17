'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import './globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'To-Do List',
  description: 'Suas tarefas em um só lugar',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  const client = new QueryClient()

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={client}>
          <Header />
          {children}
          <Footer />
        </QueryClientProvider>
      </body>
    </html>
  )
}
