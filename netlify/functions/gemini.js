exports.handler = async (event) => {
  const { message } = JSON.parse(event.body || "{}");
  if (!message) return { statusCode: 400, body: JSON.stringify({ error: "لا يوجد سؤال" }) };
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
    });
    const d = await r.json();
    const reply = d.candidates?.[0]?.content?.parts?.[0]?.text || "لم أفهم، جرب مرة أخرى";
    return { statusCode: 200, body: JSON.stringify({ reply }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
