import { NextRequest, NextResponse } from 'next/server';
import { generateCareerBotResponse } from '@/lib/aiEngine';

export async function POST(req: NextRequest) {
  try {
    const { message, profile, language } = await req.json();
    const reply = generateCareerBotResponse(message || "", profile, language || 'en');
    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to process chat" }, { status: 500 });
  }
}
