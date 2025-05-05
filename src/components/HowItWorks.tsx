import { HiUpload, HiOutlineSparkles, HiDownload } from 'react-icons/hi'

export default function HowItWorks() {
  return (
    <section className="py-20 px-6 text-center bg-gradient-to-br from-purple-50 via-white to-blue-50 animate-fade-in">
      <h2 className="text-4xl font-bold mb-12 text-gray-900 tracking-tight drop-shadow">How It Works</h2>
      <ol className="flex flex-col md:flex-row justify-center gap-10 max-w-5xl mx-auto">
        <li className="flex-1 bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 flex flex-col items-center">
          <HiUpload className="text-blue-500 text-5xl mb-4" />
          <span className="text-xl font-semibold mb-2">Upload your meeting audio file</span>
          <span className="text-gray-600">Start by uploading or recording your meeting audio.</span>
        </li>
        <li className="flex-1 bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 flex flex-col items-center">
          <HiOutlineSparkles className="text-purple-500 text-5xl mb-4" />
          <span className="text-xl font-semibold mb-2">AI transcribes & summarizes</span>
          <span className="text-gray-600">Our AI transcribes and summarizes your meeting in seconds.</span>
        </li>
        <li className="flex-1 bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 flex flex-col items-center">
          <HiDownload className="text-green-500 text-5xl mb-4" />
          <span className="text-xl font-semibold mb-2">Download or share notes</span>
          <span className="text-gray-600">Export or share your clean, organized meeting notes.</span>
        </li>
      </ol>
    </section>
  )
}
  