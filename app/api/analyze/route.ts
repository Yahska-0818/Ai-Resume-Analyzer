import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { resume, jobDescription } = await request.json()

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: `
        You are a resume analyzer. Compare the resume with the job description and return ONLY raw JSON like this:
        {
          "missingKeywords": [...],
          "suggestions": [...],
          "matchScore": number
        }
        No formatting, no code blocks, no explanation — just pure JSON.
      `,
      prompt: `Resume:\n${resume}\n\nJob Description:\n${jobDescription}`,
    })

    // 🔥 Strip backticks and leading/trailing junk
    const cleaned = text.trim().replace(/```json|```/g, "").trim()

    const analysis = JSON.parse(cleaned)
    console.log("AI raw output:", text)

    return NextResponse.json(analysis)
  } catch (_error) {
    console.error("Resume analysis error:", _error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}