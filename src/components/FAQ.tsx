'use client'

import { useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'

const faqs = [
  {
    q: 'Is my meeting data secure?',
    a: 'Absolutely. All your data is encrypted and never shared with third parties.'
  },
  {
    q: 'Can I export my meeting notes?',
    a: 'Yes! You can export your notes in multiple formats including PDF and DOCX.'
  },
  {
    q: 'How accurate is the transcription?',
    a: 'Our AI achieves industry-leading accuracy, even with multiple speakers.'
  },
  {
    q: 'Do I need to install anything?',
    a: 'No installation required. Everything works right in your browser.'
  }
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-purple-50 via-white to-blue-50 animate-fade-in">
      <h2 className="text-4xl font-bold mb-12 text-gray-900 tracking-tight drop-shadow text-center">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
            <button
              className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-900 focus:outline-none"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span>{faq.q}</span>
              <HiChevronDown className={`ml-2 text-2xl transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-gray-700 text-base">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
} 