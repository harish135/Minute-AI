import { HiStar } from 'react-icons/hi'

const reviews = [
  {
    name: 'Priya S.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    text: 'Absolutely love how easy it is to get meeting summaries. The speaker ID is a game changer!'
  },
  {
    name: 'James L.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'The best tool for keeping my team on the same page. The summaries are spot on.'
  },
  {
    name: 'Ava R.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'I save so much time after every meeting. The export options are super useful.'
  },
  {
    name: 'Michael T.',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    text: 'The UI is beautiful and the AI is very accurate. Highly recommended!'
  }
]

export default function Reviews() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-fade-in">
      <h2 className="text-4xl font-bold mb-12 text-gray-900 tracking-tight drop-shadow text-center">What Users Say</h2>
      <div className="flex flex-wrap justify-center gap-10 max-w-5xl mx-auto">
        {reviews.map((review, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 flex flex-col items-center w-80 hover:scale-105 transition-transform">
            <img src={review.avatar} alt={review.name} className="w-16 h-16 rounded-full mb-4 shadow-lg border-2 border-white" />
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, j) => <HiStar key={j} className="text-yellow-400 text-xl" />)}
            </div>
            <p className="text-gray-700 italic mb-3">"{review.text}"</p>
            <span className="text-gray-900 font-semibold">{review.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
} 