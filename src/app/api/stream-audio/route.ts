import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const sessionId = formData.get('sessionId')
  const audio = formData.get('audio') as File

  if (!audio) {
    return NextResponse.json({ success: false, error: 'No audio file provided' }, { status: 400 })
  }

  // Send audio chunk to OpenAI Whisper API
  const openaiRes = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: (() => {
      const fd = new FormData()
      fd.append('file', audio, 'audio.webm')
      fd.append('model', 'whisper-1')
      fd.append('response_format', 'text')
      return fd
    })()
  })

  if (!openaiRes.ok) {
    const err = await openaiRes.text()
    return NextResponse.json({ success: false, error: err }, { status: 500 })
  }

  const transcript = await openaiRes.text()
  console.log('Transcript for session', sessionId, ':', transcript)
  return NextResponse.json({ success: true, transcript })
} 