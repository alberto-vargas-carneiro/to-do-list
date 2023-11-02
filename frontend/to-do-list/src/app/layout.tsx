'use client'

import Header from './components/header/header'
import Footer from './components/footer/footer'
import './globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  const client = new QueryClient()

  return (
    <html lang="en">
      <head>
        <title>To-Do List</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <QueryClientProvider client={client}>
          <Header />
          {children}
          <Footer />
        </QueryClientProvider>
      </body>
    </html>
  )
}
