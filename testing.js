const axios = require("axios");

 const webhookHandler= async(event)=> {
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const apiKey = "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"
  try {
    console.log( event,"test..")
    const userMessage = event?.message|| "Test message: Is the webhook working?";

    const response = await axios.post(
      apiUrl,
      {
        model: "gpt-4o-mini",
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
module.exports=webhookHandler