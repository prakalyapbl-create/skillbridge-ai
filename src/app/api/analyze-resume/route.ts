import { NextRequest, NextResponse } from 'next/server';
import { analyzeResume } from '@/lib/aiEngine';

export async function POST(req: NextRequest) {
  try {
    const { resumeText } = await req.json();
    if (!resumeText) {
      return NextResponse.json({ error: "No resume text provided" }, { status: 400 });
    }

    const result = analyzeResume(resumeText);
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to analyze resume" }, { status: 500 });
  }
}
