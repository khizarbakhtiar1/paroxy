"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickPrompts = [
  "Help me write a business plan",
  "Review my cash flow strategy",
  "Generate a marketing campaign idea",
  "What legal documents do I need?",
  "How can I find a co-founder?",
  "Tips for fundraising",
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm your AI Founder Twin. I'm here to help you with everything from legal compliance to fundraising, marketing, and more. What would you like to work on today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return;

    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Founder Twin</h1>
        <p className="mt-1 text-gray-600">
          Your intelligent assistant for everything startup-related
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Chat Interface */}
        <Card className="lg:col-span-3">
          <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>
                  Powered by GPT-4 with your business context
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-[500px] overflow-y-auto p-6">
              <div className="space-y-4">
                {messages.map((message, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex max-w-[80%] space-x-3 ${
                        message.role === "user"
                          ? "flex-row-reverse space-x-reverse"
                          : ""
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          message.role === "user"
                            ? "bg-blue-600"
                            : "bg-gradient-to-br from-blue-600 to-purple-600"
                        }`}
                      >
                        {message.role === "user" ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div
                        className={`rounded-lg px-4 py-3 ${
                          message.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="flex space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="rounded-lg bg-gray-100 px-4 py-3">
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.2s]"></div>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.4s]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about your startup..."
                  disabled={loading}
                  className="flex-1"
                />
                <Button type="submit" disabled={loading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                <span>Quick Prompts</span>
              </CardTitle>
              <CardDescription>
                Start a conversation with these suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickPrompt(prompt)}
                    disabled={loading}
                    className="w-full rounded-lg border border-gray-200 p-3 text-left text-sm transition-colors hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle className="text-sm">🎯 Pro Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">
                The more context you provide, the better I can help. Tell me
                about your startup, goals, and challenges!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

