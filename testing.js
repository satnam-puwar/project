import axios from "axios";

export const webhookHandler= async(event)=> {
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const apiKey = "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";

  try {
    const userMessage = event.body?.message || "Test message: Is the webhook working?";

    const response = await axios.post(
      apiUrl,
      {
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        }
      }
    );

    console.log("API Response:", response.data);

    return {
      status: 200,
      body: {
        success: true,
        message: "Webhook tested successfully!",
        reply: response.data.choices[0]?.message?.content || "No response from ChatGPT",
      },
    };
  } catch (error) {
    console.error("Error with OpenAI API call:", error.response?.data || error.message);

    return {
      status: 500,
      body: {
        success: false,
        error: error.message,
        details: error.response?.data || null,
      },
    };
  }
}
