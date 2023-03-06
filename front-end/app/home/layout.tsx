"use client"
export const metadata = {
  title: 'Home | Events@Sathyabama',
}
import '../globals.css'
import Navbar from './navbar'
import Footer from '../footer'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <div className='flex flex-col min-h-screen'>
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
        </div>
      </body>
    </html>
  )
}
