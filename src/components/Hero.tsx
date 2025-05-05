'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Hero() {
  const router = useRouter()
  return (
    <header className="relative w-full">
      {/* Top Navigation Bar */}
      <nav className="flex justify-between items-center px-10 py-6 bg-white/60 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-20 animate-fade-in">
        <div className="flex items-center gap-2">
          <Image src="/favicon.ico" alt="Logo" width={32} height={32} className="rounded-full" />
          <span className="text-2xl font-bold text-gray-900 tracking-tight">AI Meeting Assistant</span>
        </div>
        <div className="flex gap-8 text-lg font-medium">
          <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
          <span
            className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
            onClick={() => router.push('/support')}
          >
            Support
          </span>
          <a href="#plans" className="text-gray-700 hover:text-blue-600 transition-colors">Plans</a>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="pt-32 pb-20 text-center bg-gradient-to-br from-blue-50 via-white to-purple-100 shadow-xl rounded-b-3xl mb-8 animate-fade-in">
        <h1 className="text-6xl font-extrabold mb-6 text-gray-900 drop-shadow-lg tracking-tight">AI-Powered Meeting Minutes</h1>
        <p className="text-2xl text-gray-700 mb-8 max-w-3xl mx-auto font-light">
          Transcribe, summarize, and organize your meetings effortlessly with next-generation AI. Save time, boost productivity, and never miss a detail again.
        </p>
        <div className="flex justify-center gap-6">
          <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg text-2xl font-semibold hover:scale-105 transition-transform">
            Get Started Free
          </button>
          <button
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg text-2xl font-semibold hover:scale-105 transition-transform"
            onClick={() => router.push('/dashboard')}
          >
            Test for Yourself
          </button>
        </div>
      </section>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </header>
  )
}
  