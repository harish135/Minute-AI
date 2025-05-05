'use client'
import { HiCheckCircle } from 'react-icons/hi'
import { useRouter } from 'next/navigation'

const plans = [
  {
    title: 'Starter',
    price: '$7.99/mo',
    hours: '20hrs audio/week',
    features: ['AI summary', 'Full transcript'],
    highlight: false
  },
  {
    title: 'Pro',
    price: '$13.99/mo',
    hours: '40hrs audio/week',
    features: ['AI summary', 'Full transcript', 'Key takeaways'],
    highlight: true
  }
]

export default function PlansPage() {
  const router = useRouter()
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col items-center justify-center py-20 animate-fade-in">
      <h1 className="text-5xl font-extrabold mb-10 text-gray-900 drop-shadow-lg tracking-tight">Choose Your Plan</h1>
      <div className="flex flex-col md:flex-row gap-10">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 flex flex-col items-center w-96 border-2 ${plan.highlight ? 'border-purple-400 scale-105' : 'border-gray-200'} transition-transform hover:scale-105`}
          >
            {plan.highlight && (
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-1 rounded-full text-lg font-semibold shadow-lg">Most Popular</span>
            )}
            <h2 className="text-3xl font-bold mb-2 text-gray-900">{plan.title}</h2>
            <div className="text-4xl font-extrabold mb-2 text-purple-700">{plan.price}</div>
            <div className="text-lg text-gray-700 mb-6">{plan.hours}</div>
            <ul className="mb-8 space-y-3 w-full">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-center gap-3 text-lg text-gray-800">
                  <HiCheckCircle className="text-green-500 text-2xl" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg text-xl font-semibold hover:scale-105 transition-transform"
              onClick={() => router.push('/dashboard')}
            >
              Test for Yourself
            </button>
          </div>
        ))}
      </div>
    </main>
  )
} 