import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  const data = await req.json()

  // Configure transporter using environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: `Support Form <${process.env.SMTP_USER}>`,
      to: process.env.SUPPORT_RECEIVER_EMAIL, // your email
      subject: `[Support] ${data.subject}`,
      text: `From: ${data.email}\n\n${data.message}`,
      html: `<p><strong>From:</strong> ${data.email}</p><p><strong>Subject:</strong> ${data.subject}</p><p>${data.message.replace(/\n/g, '<br/>')}</p>`
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Support email error:', error)
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 })
  }
} 