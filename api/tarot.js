import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  console.log("Tarot API hit:", req.method, req.url);

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is missing");
    res.status(500).json({
      error: "Server misconfiguration",
      details: "OPENAI_API_KEY environment variable is not set",
    });
    return;
  }

  try {
    const { cards, question, history } = req.body || {};

    if (!cards || !Array.isArray(cards) || cards.length === 0) {
      res.status(400).json({ error: "cards[] are required" });
      return;
    }

  const safeQuestion =
  question && question.trim().length > 0
    ? question
    : "Give a general tarot fate reading based only on these cards.";

    const cardList = cards
      .map(
        (c, idx) =>
          `${idx + 1}. ${c.name}${c.reversed ? " (reversed)" : ""}${
            c.position ? ` – position: ${c.position}` : ""
          }`
      )
      .join("\n");

    // Build history section for the prompt (optional)
    let historySection = "";
    if (Array.isArray(history) && history.length > 0) {
      const limitedHistory = history.slice(0, 5); // last 5 questions max
      const historyList = limitedHistory
        .map((q, idx) => `${idx + 1}. ${q}`)
        .join("\n");

      historySection = `
    Previous questions from this same querent (most recent first):
    ${historyList}

    Use these only to notice recurring themes or emotional patterns.
    Do NOT answer those old questions directly; only use them as background context.
    `;
    }

    const systemPrompt = `
    You are a mystical but kind-hearted gypsy-style tarot reader.
    You speak in a warm, narrative way, but you are also clear and grounded.
    You read fate and possibilities from the cards but avoid giving medical, legal or financial advice.

    If previous questions are provided, treat them as background:
    - Look for repeated worries, themes, or emotional patterns.
    - Reflect gently on these patterns, but do not re-answer old questions directly.

    Step 1: Validate user question.
    Analyze the user question.
    If it is less than 3 words, or contains mostly gibberish or punctuation, or lacks a clear subject/verb,
    adresse that it's not a god question and explicitly invite the user to ask a better question
    Examples of invalid questions:
    - "asdf"
    - "!!!"
    - "hello"
    Examples of valid questions:
    - "Should I take the new job?"
    - "What should I focus on this month?"

    Only perform Step 2 if the question passes validation.
    
    Step 2: Interpret the cards and valid question
    Guidelines:
    - Address the user directly ("you").
    - First briefly describe the cards and their symbolic meaning.
    - Then interpret how they relate to the user's question.
    - Phrase advice as gentle guidance, not absolute destiny.
    - Keep it a maximum of 3 sentances.`;

    const userPrompt = `
User question:
"${safeQuestion}"

Cards drawn (${cards.length}):
${cardList}
${historySection}

Please give an interpretation.
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const text =
      completion.choices?.[0]?.message?.content ||
      "I sense something, but the vision is unclear…";

    res.status(200).json({ interpretation: text });
  } catch (err) {
    console.error("Tarot API error:", err);

    const details =
      err?.response?.data?.error?.message ||
      err?.error?.message ||
      err?.message ||
      "Unknown error";

    res.status(500).json({
      error: "Internal server error",
      details,
    });
  }
}
