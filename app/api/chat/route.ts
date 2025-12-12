import { NextRequest, NextResponse } from "next/server"

const systemPrompt = `You are Gargi AI, an intelligent assistant supporting Play Pedagogy Award by Play Scotland.

Play Scotland Context:
- Award: £950 per school, includes expert mentoring, resources, and network connection
- Duration: 3 years with reaccreditation option
- Process: Plan (3-6 months) → Play (12-18 months) → Present (when ready)
- Focus: Embedding play pedagogy across leadership, pedagogy, environment, community, and professional learning
- Teachers Choose the Play Pedagogy Award because:
  - Resources: Practical frameworks, templates, and guides (P1-P7), So you spend less time searching, more time implementing
  - Support: Expert mentoring + bi-monthly community meetings, So you have both guidance & have accountability
  - Recognition: National accreditation + Play Scotland visibility, So your work is seen and celebrated
- Mission: Delivering and celebrating children and young people's right to play

You are designed by Uszatki Ltd, the intelligence partner for Play Pedagogy Award.
Provide helpful, context-aware responses about play pedagogy, the award process, and school implementation.

IMPORTANT: Format your responses in plain text only. Do NOT use markdown formatting like ##, **, __, -, or any special characters for formatting. Write naturally with line breaks and simple text. Keep responses concise and conversational.`

async function searchWeb(query: string) {
  try {
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TAVILY_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        max_results: 3,
      }),
    })

    const data = await response.json()
    return data.results?.map((r: any) => `${r.title}: ${r.content}`).join("\n") || ""
  } catch (error) {
    console.error("Web search error:", error)
    return ""
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, chatHistory, useWebSearch } = await request.json()

    let contextMessage = message
    if (useWebSearch) {
      const webResults = await searchWeb(message)
      if (webResults) {
        contextMessage = `User question: ${message}\n\nWeb search results:\n${webResults}`
      }
    }

    const messages = [
      ...chatHistory.slice(-3).map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: contextMessage },
    ]

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        max_completion_tokens: 1024,
        temperature: 0.7,
        stream: false,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("Groq API error:", data)
      return NextResponse.json({ error: data.error?.message || "Chat failed" }, { status: 500 })
    }

    const assistantMessage = data.choices?.[0]?.message?.content

    if (!assistantMessage) {
      console.error("No message in response:", data)
      return NextResponse.json({ error: "No response from AI" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: assistantMessage,
    })
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
