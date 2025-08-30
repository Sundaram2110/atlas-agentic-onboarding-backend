import { ChatOllama } from "@langchain/ollama";
import { HumanMessage } from "@langchain/core/messages";


export const runLangAgent = async (query: string) => {
  try {
    // Connect to Ollama with your chosen model (e.g., mistral, llama2, codellama, etc.)
    const model = new ChatOllama({
      baseUrl: "http://localhost:11434", // Ollama default
      model: "llama3", // change to "llama2" or any model you pulled
    });

    // Call Ollama
    const response = await model.invoke([new HumanMessage(query)]);

    return response.content.toString();
  } catch (error) {
    console.error("Error in runLangAgent:", error);
    return "⚠️ Failed to get response from agent.";
  }
};
