'use client'

import { HiMicrophone, HiUserGroup, HiDocumentText } from 'react-icons/hi'

export default function Features() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-white via-blue-50 to-purple-50 text-center animate-fade-in">
      <h2 className="text-4xl font-bold mb-12 text-gray-900 tracking-tight drop-shadow">Core Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform">
          <HiMicrophone className="text-blue-600 text-5xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Upload or Record Audio</h3>
          <p className="text-gray-600">Easily upload or record your meeting audio for instant processing.</p>
        </div>
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform">
          <HiUserGroup className="text-purple-600 text-5xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">AI Transcription & Speaker ID</h3>
          <p className="text-gray-600">Accurate transcription with automatic speaker identification for clarity.</p>
        </div>
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform">
          <HiDocumentText className="text-green-600 text-5xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Smart Summaries & Export</h3>
          <p className="text-gray-600">Get concise summaries and export your notes in multiple formats.</p>
        </div>
      </div>
    </section>
  )
}
  