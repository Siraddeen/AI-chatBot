import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true, // This is only for development purposes
});

export class Assistant {
  #model;
  constructor(model = "gpt-4o-mini") {
    this.#model = model;
  }

  async chat(content, history) {
    try {
      const result = await openai.chat.completions.create({
        model: this.#model,
        messages: [...history, { role: "user", content }],
      });
      return result.choices[0].message.content;
    } catch (error) {
      console.error("Error in chat completion:", error);
      throw error;
    }
  }
}
