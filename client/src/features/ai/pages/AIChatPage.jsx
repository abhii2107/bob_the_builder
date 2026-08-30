import { useState } from "react";
import { Bot, Send, User } from "lucide-react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { chatWithAI } from "../services/aiService";

function AIChatPage() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm BuildOps AI. Ask me about your projects, attendance, inventory, or daily operations.",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: trimmedMessage,
      },
    ]);

    setMessage("");
    setIsLoading(true);

    try {
      const response = await chatWithAI(
        trimmedMessage
      );

      const aiMessage =
        response?.data?.response ||
        "I couldn't generate a response.";

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: aiMessage,
        },
      ]);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to get AI response.";

      toast.error(errorMessage);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't process that request right now.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-3rem)] min-h-[600px] flex-col gap-4">
      {/* Header */}
      <section>
        <p className="text-sm font-medium text-blue-600">
          BuildOps AI
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
          AI Assistant
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Ask questions about your construction operations.
        </p>
      </section>

      {/* Chat */}
      <Card className="flex min-h-0 flex-1 flex-col border-slate-200 bg-white shadow-none">
        <CardContent className="flex min-h-0 flex-1 flex-col p-0">
          {/* Messages */}
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((item, index) => {
              const isUser =
                item.role === "user";

              return (
                <div
                  key={`${item.role}-${index}`}
                  className={`flex gap-3 ${
                    isUser
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {!isUser && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={
                      isUser
                        ? "max-w-[80%] rounded-2xl rounded-br-md bg-blue-600 px-4 py-3 text-sm text-white"
                        : "max-w-[80%] rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3 text-sm text-slate-700"
                    }
                  >
                    {isUser ? (
                      item.content
                    ) : (
                      <div className="prose prose-sm max-w-none prose-slate">
                        <ReactMarkdown>
                          {item.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading */}
            {isLoading && (
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
                  <Bot className="h-4 w-4" />
                </div>

                <div className="rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3 text-sm text-slate-500">
                  BuildOps AI is thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-slate-100 p-4">
            <form
              onSubmit={handleSubmit}
              className="flex gap-2"
            >
              <input
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                placeholder="Ask BuildOps AI..."
                disabled={isLoading}
                className="h-11 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500"
              />

              <Button
                type="submit"
                disabled={
                  isLoading ||
                  !message.trim()
                }
                className="h-11 bg-blue-600 px-4 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>

            <p className="mt-2 text-[11px] text-slate-400">
              AI responses may occasionally be inaccurate. Verify
              important operational information.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AIChatPage;