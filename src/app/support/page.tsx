'use client'
import { useState } from 'react'

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', subject: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/support', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col items-center justify-center py-20 animate-fade-in">
      <h1 className="text-5xl font-extrabold mb-10 text-black drop-shadow-lg tracking-tight">Support</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-full max-w-xl flex flex-col gap-6">
          <label className="flex flex-col text-left">
            <span className="mb-2 font-semibold text-black">Your Email</span>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 outline-none bg-white text-black"
              placeholder="you@email.com"
            />
          </label>
          <label className="flex flex-col text-left">
            <span className="mb-2 font-semibold text-black">Subject</span>
            <input
              type="text"
              name="subject"
              required
              value={form.subject}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 outline-none bg-white text-black"
              placeholder="Short summary of your problem"
            />
          </label>
          <label className="flex flex-col text-left">
            <span className="mb-2 font-semibold text-black">Describe your problem</span>
            <textarea
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 outline-none bg-white min-h-[120px] text-black"
              placeholder="Please describe your issue in detail..."
            />
          </label>
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg text-xl font-semibold hover:scale-105 transition-transform disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      ) : (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-full max-w-xl text-center text-2xl text-black">
          Your query has been received. We will revert back within a couple of days.
        </div>
      )}
    </main>
  )
} 