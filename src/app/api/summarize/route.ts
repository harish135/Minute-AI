import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  const { text } = await req.json()

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant that summarizes meeting transcripts into clear bullet points, including decisions made and action items.',
      },
      {
        role: 'user',
        content: `Summarize this meeting transcript:\n\n${text}`,
      },
    ],
    temperature: 0.4,
  })

  const summary = response.choices[0].message.content
  return NextResponse.json({ summary })
}
