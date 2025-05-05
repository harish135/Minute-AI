import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import Footer from '@/components/Footer'
import Reviews from '@/components/Reviews'
import FAQ from '@/components/FAQ'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <Hero />
      <section id="about"><Features /></section>
      <section id="support"><HowItWorks /></section>
      <Reviews />
      <FAQ />
      <section className="flex justify-center py-12" id="plans">
        <Link href="/plans">
          <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg text-2xl font-semibold hover:scale-105 transition-transform">
            View Plans
          </button>
        </Link>
      </section>
      <Footer />
    </main>
  )
}
