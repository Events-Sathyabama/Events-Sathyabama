export const metadata = {
  title: 'Events@Sathyabama',
  description:
    'Event@Sathyabama is useful for planning, implementing, and carrying out effective events.',
}
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <div className='flex flex-col'>{children}</div>
      </body>
    </html>
  )
}
