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
    const { cards, question } = req.body || {};

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

    const systemPrompt = `
You are a mystical but kind-hearted gypsy-style tarot reader.
You speak in a warm, narrative way, but you are also clear and grounded.
You read fate and possibilities from the cards but avoid giving medical, legal or financial advice.

Guidelines:
- Address the user directly ("you").
- First briefly describe the cards and their symbolic meaning.
- Then interpret how they relate to the user's question.
- If there is advice, phrase it as gentle guidance, not absolute destiny.
- Keep it a maximum of 3 sentances.

If the user provides anything that is not a question (like if it’s a blank space,
or just punctuation, or jiberish, or just one word, not a coherent question, etc.),
then adresse that instead of giving advice, hint to inviting the user to ask a better question
`;

    const userPrompt = `
User question:
"${safeQuestion}"

Cards drawn (${cards.length}):
${cardList}

Please give an interpretation.
`;

    // ✅ Use Chat Completions API (simple, stable)
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
