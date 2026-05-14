import React, { useEffect, useState } from "react";

const START_MESSAGE = [
  {
    sender: "bot",
    text: "Hello! I am your Dawai assistant 👋",
  },
];

function Chat() {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : START_MESSAGE;
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const clearChat = () => {
    setMessages(START_MESSAGE);
    localStorage.removeItem("chatMessages");
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;

    const userMessage = {
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();

      const botMessage = {
        sender: "bot",
        text: data.reply || "I could not understand your question.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I could not connect to the server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Dawai Assistant</h1>
        <p className="text-muted">Your smart medication helper</p>
      </div>

      <div
        className="card border-0 shadow-sm rounded-4 mx-auto"
        style={{ maxWidth: "900px", height: "700px" }}
      >
        <div className="card-header bg-white border-0 py-4 px-4 d-flex justify-content-between align-items-center">
          <div>
            <h4 className="fw-bold mb-1">Assistant Chat</h4>
            <small className="text-success">● Online</small>
          </div>

          <button
            className="btn btn-outline-danger btn-sm rounded-pill px-3"
            onClick={clearChat}
          >
            Clear Chat
          </button>
        </div>

        <div
          className="card-body overflow-auto px-4"
          style={{ background: "#f8fafc" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`d-flex mb-3 ${
                msg.sender === "user"
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <div
                className={`p-3 rounded-4 ${
                  msg.sender === "user"
                    ? "bg-primary text-white"
                    : "bg-white shadow-sm"
                }`}
                style={{ maxWidth: "75%" }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="d-flex mb-3 justify-content-start">
              <div className="p-3 rounded-4 bg-white shadow-sm">
                Typing...
              </div>
            </div>
          )}
        </div>

        <div className="card-footer bg-white border-0 p-4">
          <div className="d-flex gap-3">
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button
              className="btn btn-primary rounded-pill px-4"
              onClick={sendMessage}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;