import { GoogleGenerativeAI } from "@google/generative-ai";

const googleai = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);

export class Assistant {
  #chat;
  constructor(model = "gemini-1.5-flash") {
    const gemini = googleai.getGenerativeModel({ model });
    this.#chat = gemini.startChat({ history: [] });
  }

  //   async sendMessage(content) {
  //     const result = await this.chat.sendMessage(content);
  //     return result;
  //   }

  async chat(content) {
    try {
      const result = await this.#chat.sendMessage(content);
      return result.response.text();
    } catch (error) {
      console.error("Error in getting response:", error);
      throw error;
    }
  }
}
