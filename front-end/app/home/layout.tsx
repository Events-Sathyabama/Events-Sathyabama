'use client'
export const metadata = {
  title: 'Home | Events@Sathyabama',
}
import '../globals.css'
import Navbar from '../navbar'
import Footer from '../footer'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </section>
  )
}
