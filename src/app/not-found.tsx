import Link from 'next/link'
import Navbar from '@/components/navigation/navbar'
import Footer from '@/components/sections/footer'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-sm-surface-primary flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 pt-16">
        <div className="text-center max-w-lg">
          <p className="text-8xl font-bold text-sm-accent-primary mb-4">404</p>
          <h1 className="text-3xl font-bold text-sm-text-primary mb-3">
            Page Not Found
          </h1>
          <p className="text-lg text-sm-text-secondary mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="bg-sm-accent-primary hover:bg-sm-accent-primary/90 text-white font-semibold px-8 py-3">
              <Link href="/">Go Home</Link>
            </Button>
            <Button asChild variant="outline" className="border-sm-border-default text-sm-text-primary hover:border-sm-accent-primary/30 font-semibold px-8 py-3">
              <Link href="/#contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
