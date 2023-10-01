import './globals.css'
import { Inter } from 'next/font/google'
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PCUnion',
  description: 'PCUnion - Tienda de computadoras',
}


export default function RootLayout({ children } ) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ResponsiveAppBar />
        <div className="p-4">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}


