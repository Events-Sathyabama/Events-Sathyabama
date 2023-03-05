export const metadata = {
  title: 'Sign-in | Events@Sathyabama',
  description:
    'Event Hub is helpful to organize, apply and execute successful events.',
}
import './globals.css'
import LandingNav from './landingNav'
import Footer from './footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <div className='flex flex-col min-h-screen'>
          <LandingNav></LandingNav>
          {children}
          <Footer></Footer>
        </div>
      </body>
    </html>
  )
}
