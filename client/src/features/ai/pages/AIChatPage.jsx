import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Bot,
  Send,
  User,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { chatWithAI } from "../services/aiService";

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Hi! I'm BuildOps AI. Ask me about your projects, attendance, inventory, or daily operations.",
};

const SUGGESTED_QUESTIONS = [
  "How many projects do I have?",
  "Which materials are low in stock?",
  "Who was absent today?",
  "Give me a summary of my company.",
];

function AIChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    INITIAL_MESSAGE,
  ]);
  const [isLoading, setIsLoading] =
    useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const handleClearChat = () => {
    if (isLoading) {
      return;
    }

    setMessages([{ ...INITIAL_MESSAGE }]);
    setMessage("");
  };

  const sendMessage = async (text) => {
    const trimmedMessage = text.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    const conversation = messages.map(
      (item) => ({
        role: item.role,
        content: item.content,
      })
    );

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
        trimmedMessage,
        conversation
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
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendMessage(message);
  };

  const handleSuggestedQuestion = async (
    question
  ) => {
    if (isLoading) {
      return;
    }

    await sendMessage(question);
  };

  const showSuggestions =
    messages.length === 1 &&
    !isLoading;

  return (
    <div className="flex min-h-[calc(100vh-7rem)] flex-col gap-6">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1C1D1F] text-white">
              <Sparkles className="h-3.5 w-3.5 text-[#D8C17D]" />
            </span>

            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B9073]">
              BuildOps AI
            </p>
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#191A1C] sm:text-[34px]">
            AI Assistant
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#77736B]">
            Ask questions about projects, attendance, inventory,
            and daily construction operations.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={
            isLoading ||
            messages.length <= 1
          }
          onClick={handleClearChat}
          className="w-fit rounded-lg border-[#D8DDD9] bg-white text-[#55524D] shadow-none hover:bg-[#EEF1ED] hover:text-[#191A1C]"
        >
          <RotateCcw className="mr-2 h-3.5 w-3.5" />
          New Chat
        </Button>
      </section>

      {/* Chat shell */}
      <Card className="flex min-h-[620px] flex-1 flex-col overflow-hidden rounded-2xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_18px_45px_rgba(25,26,28,0.06)]">
        <CardContent className="flex min-h-0 flex-1 flex-col p-0">
          {/* Chat top bar */}
          <div className="flex items-center justify-between border-b border-[#D8E0DB] bg-white/50 px-5 py-3">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#5D7D68]" />

              <div>
                <p className="text-xs font-semibold text-[#191A1C]">
                  BuildOps AI
                </p>

                <p className="text-[10px] text-[#A49F95]">
                  Connected to your workspace
                </p>
              </div>
            </div>

            <span className="hidden rounded-full border border-[#D9E1DC] bg-white px-2.5 py-1 text-[10px] font-medium text-[#77736B] sm:block">
              Workspace context enabled
            </span>
          </div>

          {/* Messages */}
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="mx-auto w-full max-w-4xl space-y-5">
              {messages.map(
                (item, index) => {
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
                      {/* AI avatar */}
                      {!isUser && (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1C1D1F] text-white shadow-[0_5px_14px_rgba(25,26,28,0.08)]">
                          <Bot className="h-4 w-4 text-[#D8C17D]" />
                        </div>
                      )}

                      {/* Message bubble */}
                      <div
                        className={
                          isUser
                            ? "max-w-[82%] rounded-2xl rounded-br-md border border-[#222326] bg-[#1C1D1F] px-4 py-3.5 text-sm leading-6 text-white shadow-[0_7px_18px_rgba(25,26,28,0.08)]"
                            : "max-w-[82%] rounded-2xl rounded-bl-md border border-[#D8DDD8] bg-white px-4 py-3.5 text-sm leading-6 text-[#55524D] shadow-[0_6px_18px_rgba(25,26,28,0.035)]"
                        }
                      >
                        {isUser ? (
                          item.content
                        ) : (
                          <div className="prose prose-sm max-w-none prose-slate prose-headings:text-[#191A1C] prose-p:leading-6 prose-strong:text-[#191A1C] prose-a:text-[#7E845E] prose-li:leading-6">
                            <ReactMarkdown
                              remarkPlugins={[
                                remarkGfm,
                              ]}
                            >
                              {item.content}
                            </ReactMarkdown>

                            {item.isError && (
                              <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#EAD3D0] bg-[#FDF8F7] px-3 py-2 text-xs text-[#A9605B]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#A9605B]" />
                                Please try your question again.
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* User avatar */}
                      {isUser && (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#55524D] shadow-[0_5px_14px_rgba(25,26,28,0.05)]">
                          <User className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  );
                }
              )}

              {/* Suggested questions */}
              {showSuggestions && (
                <div className="ml-0 pt-2 sm:ml-12">
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-[#C9952E]" />

                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8E8A81]">
                      Try asking
                    </p>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {SUGGESTED_QUESTIONS.map(
                      (question) => (
                        <button
                          key={question}
                          type="button"
                          disabled={isLoading}
                          onClick={() =>
                            handleSuggestedQuestion(
                              question
                            )
                          }
                          className="group flex items-center justify-between rounded-xl border border-[#D9E1DC] bg-white/80 px-4 py-3 text-left text-xs font-medium text-[#55524D] shadow-[0_5px_14px_rgba(25,26,28,0.025)] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#CFCFBD] hover:bg-white hover:text-[#191A1C] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <span>{question}</span>

                          <Send className="h-3.5 w-3.5 text-[#C9952E] opacity-50 transition-all duration-150 group-hover:translate-x-0.5 group-hover:opacity-100" />
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Loading */}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1C1D1F] text-white shadow-[0_5px_14px_rgba(25,26,28,0.08)]">
                    <Bot className="h-4 w-4 text-[#D8C17D]" />
                  </div>

                  <div className="rounded-2xl rounded-bl-md border border-[#D8DDD8] bg-white px-4 py-3.5 shadow-[0_6px_18px_rgba(25,26,28,0.035)]">
                    <div className="flex items-center gap-2">
                      <span className="flex gap-1">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8B9073]" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8B9073] [animation-delay:150ms]" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8B9073] [animation-delay:300ms]" />
                      </span>

                      <span className="text-xs text-[#77736B]">
                        BuildOps AI is thinking
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Composer */}
          <div className="border-t border-[#D8E0DB] bg-white/65 p-4 sm:p-5">
            <div className="mx-auto max-w-4xl">
              <form
                onSubmit={handleSubmit}
                className="flex items-end gap-2 rounded-xl border border-[#D5DDD8] bg-white p-2 shadow-[0_8px_22px_rgba(25,26,28,0.04)] transition-shadow focus-within:shadow-[0_12px_28px_rgba(25,26,28,0.065)]"
              >
                <input
                  value={message}
                  onChange={(event) =>
                    setMessage(
                      event.target.value
                    )
                  }
                  placeholder="Ask BuildOps AI anything about your operations..."
                  disabled={isLoading}
                  className="h-10 min-w-0 flex-1 bg-transparent px-2 text-sm text-[#191A1C] outline-none placeholder:text-[#A49F95] disabled:cursor-not-allowed disabled:opacity-60"
                />

                <Button
                  type="submit"
                  disabled={
                    isLoading ||
                    !message.trim()
                  }
                  size="icon"
                  className="h-10 w-10 shrink-0 rounded-lg bg-[#1C1D1F] text-white shadow-none hover:bg-[#2A2B2D] disabled:bg-[#D8D6D0]"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>

              <div className="mt-2.5 flex flex-col gap-1 text-[10px] text-[#A49F95] sm:flex-row sm:items-center sm:justify-between">
                <span>
                  BuildOps AI uses your authorized workspace context.
                </span>

                <span>
                  Verify important operational information.
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AIChatPage;
