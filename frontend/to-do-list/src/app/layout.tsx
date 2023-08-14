import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'To-Do List',
  description: 'Suas tarefas em um só lugar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
