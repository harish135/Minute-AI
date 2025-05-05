'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { saveAs } from 'file-saver'
import { Document, Packer, Paragraph, TextRun } from 'docx'
import jsPDF from 'jspdf'

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null)
  const [transcript, setTranscript] = useState('')
  const [summary, setSummary] = useState('')
  const [keyTakeaways, setKeyTakeaways] = useState('')
  const [loading, setLoading] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [recording, setRecording] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recordedChunks = useRef<Blob[]>([])

  const hiddenFileInput = useRef<HTMLInputElement | null>(null)

  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const triggerUpload = () => {
    hiddenFileInput.current?.click()
  }

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const recorder = new MediaRecorder(stream)
    recordedChunks.current = []

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunks.current.push(e.data)
    }

    recorder.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: 'audio/webm' })
      const recordedFile = new File([blob], 'recording.webm', { type: 'audio/webm' })
      setFile(recordedFile)
    }

    recorder.start()
    mediaRecorderRef.current = recorder
    setRecording(true)
    setDropdownOpen(false)
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setRecording(false)
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/transcribe', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    setTranscript(data.transcript)

    const sumRes = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: data.transcript }),
    })
    const sumData = await sumRes.json()
    setSummary(sumData.summary)
    setKeyTakeaways(sumData.keyTakeaways || 'Key takeaways will appear here.')
    setLoading(false)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (recording) {
      setRecordingSeconds(0)
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1)
      }, 1000)
    } else if (!recording && recordingSeconds !== 0) {
      setRecordingSeconds(0)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [recording])

  function downloadAsWord(title: string, content: string) {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun({ text: title, bold: true, size: 32 })],
            }),
            new Paragraph({ text: '' }),
            ...content.split('\n').map(line => new Paragraph(line)),
          ],
        },
      ],
    })
    Packer.toBlob(doc).then(blob => {
      saveAs(blob, `${title.replace(/\s+/g, '_')}.docx`)
    })
  }

  function downloadAsPDF(title: string, content: string) {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text(title, 10, 20)
    doc.setFontSize(12)
    const pageWidth = doc.internal.pageSize.getWidth() - 20
    doc.text(content, 10, 35, { maxWidth: pageWidth })
    doc.save(`${title.replace(/\s+/g, '_')}.pdf`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white flex flex-col items-center justify-start pt-10 animate-fade-in">
      <h1 className="text-5xl font-extrabold mb-10 tracking-tight drop-shadow-lg">Dashboard</h1>

      <div className="flex flex-row gap-6 mb-10">
        <div className="relative">
          <button
            className="p-4 px-8 bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-lg hover:bg-white/20 focus:bg-white/20 transition-all duration-200 min-w-[220px] font-semibold text-lg border border-white/20"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            Upload or record audio
          </button>
          {dropdownOpen && (
            <div className="absolute z-10 mt-2 w-56 left-1/2 -translate-x-1/2 bg-white/90 border border-gray-200 rounded-2xl shadow-xl text-gray-900 backdrop-blur-md animate-fade-in">
              <button
                onClick={triggerUpload}
                className="block w-full text-left px-6 py-3 hover:bg-gray-100 rounded-t-2xl transition-colors"
              >
                Upload File
              </button>
              <button
                onClick={startRecording}
                className="block w-full text-left px-6 py-3 hover:bg-gray-100 rounded-b-2xl transition-colors"
              >
                Record
              </button>
            </div>
          )}
          <input
            type="file"
            accept="audio/*"
            ref={hiddenFileInput}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <button
          onClick={handleUpload}
          className="p-4 px-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg hover:scale-105 focus:scale-105 transition-transform duration-200 min-w-[200px] font-semibold text-lg border border-green-400/30"
          disabled={!file || loading}
        >
          {loading ? 'Processing...' : 'Upload & Transcribe'}
        </button>
      </div>

      {recording && (
        <div className="flex flex-col items-center mb-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <span className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-red-600"></span>
            </span>
            <span className="text-red-400 font-semibold text-lg tracking-wide">Recording... {recordingSeconds}s</span>
          </div>
          <button
            onClick={stopRecording}
            className="px-6 py-2 bg-red-600 text-white rounded-2xl shadow-lg hover:bg-red-700 focus:bg-red-700 transition-all text-lg font-semibold"
          >
            ⏹ Stop Recording
          </button>
        </div>
      )}

      {file && (
        <p className="text-sm mt-2 text-gray-300 animate-fade-in">
          Selected file: <strong>{file.name}</strong>
        </p>
      )}

      {summary && (
        <div className="mt-12 w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl animate-fade-in border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-bold text-green-300 tracking-tight drop-shadow">Summary</h2>
            <div className="flex gap-2">
              <button onClick={() => downloadAsWord('Summary', summary)} className="px-3 py-1 bg-white/80 text-green-700 rounded shadow hover:bg-green-100">Word</button>
              <button onClick={() => downloadAsPDF('Summary', summary)} className="px-3 py-1 bg-white/80 text-green-700 rounded shadow hover:bg-green-100">PDF</button>
            </div>
          </div>
          <p className="p-4 bg-white/80 border border-green-200 rounded-xl mb-8 text-gray-900 text-lg shadow-inner transition-colors duration-200">
            {summary}
          </p>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-blue-300 tracking-tight drop-shadow">Key Takeaways</h2>
            <div className="flex gap-2">
              <button onClick={() => downloadAsWord('Key Takeaways', keyTakeaways)} className="px-3 py-1 bg-white/80 text-blue-700 rounded shadow hover:bg-blue-100">Word</button>
              <button onClick={() => downloadAsPDF('Key Takeaways', keyTakeaways)} className="px-3 py-1 bg-white/80 text-blue-700 rounded shadow hover:bg-blue-100">PDF</button>
            </div>
          </div>
          <div className="p-4 bg-white/80 border border-blue-200 rounded-xl mb-8 text-gray-900 text-lg shadow-inner transition-colors duration-200">
            {keyTakeaways && keyTakeaways !== 'Key takeaways will appear here.'
              ? keyTakeaways
              : summary
                ? summary.split(/\s*-\s+/).filter(Boolean).map((point, i) => <div key={i}>• {point.trim()}</div>)
                : 'Key takeaways will appear here.'}
          </div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-yellow-300 tracking-tight drop-shadow">Transcript</h2>
            <div className="flex gap-2">
              <button onClick={() => downloadAsWord('Transcript', transcript)} className="px-3 py-1 bg-white/80 text-yellow-700 rounded shadow hover:bg-yellow-100">Word</button>
              <button onClick={() => downloadAsPDF('Transcript', transcript)} className="px-3 py-1 bg-white/80 text-yellow-700 rounded shadow hover:bg-yellow-100">PDF</button>
            </div>
          </div>
          <pre className="p-4 bg-white/80 border border-yellow-200 rounded-xl whitespace-pre-wrap text-gray-900 text-base shadow-inner transition-colors duration-200">
            {transcript}
          </pre>
        </div>
      )}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </main>
  )
}
