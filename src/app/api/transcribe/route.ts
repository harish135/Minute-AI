import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import FormData from 'form-data'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file: File | null = formData.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const uploadRes = await axios.post(
    'https://api.assemblyai.com/v2/upload',
    buffer,
    {
      headers: {
        authorization: process.env.ASSEMBLYAI_API_KEY!,
        'content-type': 'application/octet-stream',
      },
    }
  )

  const transcriptRes = await axios.post(
    'https://api.assemblyai.com/v2/transcript',
    {
      audio_url: uploadRes.data.upload_url,
      speaker_labels: true,
    },
    {
      headers: {
        authorization: process.env.ASSEMBLYAI_API_KEY!,
        'content-type': 'application/json',
      },
    }
  )

  const transcriptId = transcriptRes.data.id

  // Poll until transcription completes
  let transcriptData
  while (true) {
    const pollingRes = await axios.get(
      `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
      {
        headers: { authorization: process.env.ASSEMBLYAI_API_KEY! },
      }
    )
    transcriptData = pollingRes.data
    if (transcriptData.status === 'completed') break
    if (transcriptData.status === 'error') {
      return NextResponse.json({ error: transcriptData.error }, { status: 500 })
    }
    await new Promise((res) => setTimeout(res, 2000)) // wait 2 seconds
  }

  return NextResponse.json({ transcript: transcriptData.text })
}
