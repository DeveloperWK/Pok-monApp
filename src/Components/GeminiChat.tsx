import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
const GeminiChat = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const generateText = async () => {
    if (prompt.trim() === "") return;
    try {
      setLoading(true);
      const response = await model.generateContent(prompt);
      setPrompt("");
      setResponse(response.response.text());
      setLoading(false);
    } catch (error) {
      console.error("Error generating text:", error);
      setResponse("Error generating text");
    } finally {
      setLoading(false);
    }
  };
  console.log(genAI);

  return (
    <>
      <section style={{ textAlign: "center" }}>
        <p
          style={{
            color: "rgb(159, 172, 185)",
            fontSize: "40px",
            fontStyle: "italic",
            textDecoration: "underline",
          }}
        >
          Send a message to Ai And Know About Your Pokemon Deeply...{" "}
        </p>
      </section>
      <div className="gemini-chat">
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Generating Pokemon Details, Please wait...</p>
          </div>
        )}
        <div className="response-area">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
        <div className="input-area">
          <TextField
            id="outlined-basic"
            label="Message"
            variant="outlined"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your Pokemon Name..."
            fullWidth
          />

          <Button
            variant="contained"
            endIcon={<FaPaperPlane />}
            onClick={generateText}
            style={{ marginTop: "10px" }}
            disabled={loading}
          >
            Send
          </Button>
        </div>
      </div>
    </>

    // <div className="gemini-chat">
    //   <div className="response-area">
    //     <ReactMarkdown>{response}</ReactMarkdown>
    //   </div>
    //   <div className="input-area">
    //     <input
    //       type="text"
    //       value={prompt}
    //       onChange={(e) => setPrompt(e.target.value)}
    //       placeholder="Enter your prompt..."
    //     />
    //     <button onClick={generateText}>
    //       <FaPaperPlane />
    //     </button>
    //   </div>
    // </div>
  );
};

export default GeminiChat;
