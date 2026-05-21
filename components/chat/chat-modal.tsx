"use client";

import * as React from "react";
import Image from "next/image";
import { useChat as useAIChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useChat } from "./chat-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import posthog from "posthog-js";
import { X, User, Send, Loader2, Sparkles, AlertTriangle } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Markdown } from "../ui/Markdown";
import portfolioData from "@/data/portfolio.json";

const suggestedQuestions = [
  "What technologies do you work with?",
  "Tell me about your experience",
  "Are you available for work?",
  "What projects have you built?",
];

const welcomeMessage: UIMessage = {
  id: "welcome",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Hey there! I'm Chirag's AI assistant. Ask me anything about his skills, experience, or projects. How can I help you today?",
    },
  ],
};

// Helper to extract text content from message parts
function getMessageText(message: UIMessage): string {
  return message.parts
    .filter(
      (part): part is { type: "text"; text: string } => part.type === "text",
    )
    .map((part) => part.text)
    .join("");
}

interface ChatMessagesProps {
  messages: UIMessage[];
  isLoading: boolean;
  rateLimitError: string | null;
  error: Error | undefined;
  onSuggestionClick: (q: string) => void;
}

const ChatMessages = React.memo(function ChatMessages({
  messages,
  isLoading,
  rateLimitError,
  error,
  onSuggestionClick,
}: ChatMessagesProps) {
  return (
    <Conversation className="flex-1 overflow-hidden">
      <ConversationContent className="p-4 gap-4">
        {messages.map((message) => {
          const messageText = getMessageText(message);
          if (!messageText.trim()) {
            if (message.role === "assistant") {
              return (
                <div key={message.id} className="flex gap-3">
                  <div className="relative shrink-0 w-8 h-8 rounded-full overflow-hidden ">
                    <Image
                      src="/assistent_bot.webp"
                      alt="AI Assistant"
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                  <div className="bg-muted px-4 py-2.5 rounded-2xl rounded-bl-md">
                    <span className="text-sm text-muted-foreground animate-pulse">
                      Thinking...
                    </span>
                  </div>
                </div>
              );
            }
            return null;
          }

          return (
            <Message key={message.id} from={message.role}>
              <div
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "flex-row-reverse" : "flex-row",
                )}
              >
                {message.role === "user" ? (
                  <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
                    <User className="h-4 w-4" />
                  </div>
                ) : (
                  <div className="relative shrink-0 w-8 h-8 rounded-full overflow-hidden ">
                    <Image
                      src="/assistent_bot.webp"
                      alt="AI Assistant"
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                )}
                <MessageContent
                  className={cn(
                    "max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted rounded-bl-md",
                  )}
                >
                  <Markdown content={messageText} />
                </MessageContent>
              </div>
            </Message>
          );
        })}

        {messages.length === 1 && (
          <div className="pt-2">
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Suggested questions
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => onSuggestionClick(question)}
                  className="text-xs px-3 py-1.5 rounded-full border bg-background hover:bg-muted transition-colors text-left"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center">
            <div className="bg-muted p-3 rounded-full">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </div>
        )}

        {(rateLimitError || error) && (
          <div className="flex gap-3">
            <div className="relative shrink-0 w-8 h-8 rounded-full overflow-hidden">
              <Image
                src="/assistent_bot.webp"
                alt="AI Assistant"
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-bl-md bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium text-sm">Limit Reached</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {rateLimitError || "Something went wrong. Please try again later."}
              </p>
              <div className="text-sm space-y-1">
                <p className="font-medium text-foreground">Reach Chirag directly:</p>
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="block text-primary hover:underline"
                >
                  📧 {portfolioData.personal.email}
                </a>
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary hover:underline"
                >
                  💼 LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        )}
      </ConversationContent>
      <ConversationScrollButton className="bg-background border" />
    </Conversation>
  );
});

export function ChatModal() {
  const { isOpen, closeChat } = useChat();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = React.useState("");
  const [rateLimitError, setRateLimitError] = React.useState<string | null>(null);

  const { messages, sendMessage, status, error } = useAIChat({
    id: "portfolio-chat",
    messages: [welcomeMessage],
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    onError: (err) => {
      // err.message contains the raw response body text from the API
      try {
        const parsed = JSON.parse(err.message);
        if (parsed.error === "user_limit" || parsed.error === "rate_limit") {
          setRateLimitError(parsed.message);
          return;
        }
      } catch {
        // Not JSON — fall through
      }
      // Fallback for unexpected error formats
      setRateLimitError("Something went wrong. Please try again later.");
    },
  });

  const isLoading = status === "submitted";
  const isStreaming = status === "streaming";

  // Reset rate limit error when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setRateLimitError(null);
    }
  }, [isOpen]);

  // Focus input when modal opens + track open event
  React.useEffect(() => {
    if (isOpen) {
      posthog.capture("chat_opened");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Refocus input after response finishes (textarea was disabled during streaming)
  React.useEffect(() => {
    if (status === "ready") {
      inputRef.current?.focus();
    }
  }, [status]);

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeChat();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeChat]);

  const handleSubmit = React.useCallback(
    async (message: PromptInputMessage) => {
      if (!message.text?.trim()) return;
      posthog.capture("chatbot_question", { question: message.text.slice(0, 200), type: "typed" });
      await sendMessage({
        text: message.text,
      });
      setInput("");
    },
    [sendMessage],
  );

  const handleSuggestionClick = React.useCallback((question: string) => {
    posthog.capture("chatbot_question", { question, type: "suggestion" });
    sendMessage({ text: question });
  }, [sendMessage]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={closeChat}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-title"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100%-2rem)] sm:w-105 h-150 max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] bg-background border rounded-2xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-4 duration-300 overflow-hidden"
      >
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-500/50">
              <Image
                src="/assistent_bot.webp"
                alt="AI Assistant"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div>
              <h2 id="chat-title" className="font-semibold text-sm">
                Chirag&apos;s AI Assistant
              </h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Online
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeChat}
            className="h-8 w-8 rounded-full"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </Button>
        </header>

        {/* Messages */}
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          rateLimitError={rateLimitError}
          error={error}
          onSuggestionClick={handleSuggestionClick}
        />

        {/* Input */}
        <div
          className="p-4 border-t bg-background/95 backdrop-blur-sm"
          onClick={() => inputRef.current?.focus()}
        >
          <PromptInput
            onSubmit={handleSubmit}
            className="rounded-2xl focus-visible:outline-none"
          >
            <PromptInputBody>
              <PromptInputTextarea
                ref={inputRef}
                placeholder="Ask me anything about Chirag..."
                className="min-h-10 max-h-24 py-2.5 px-4 text-sm resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading || isStreaming}
              />
            </PromptInputBody>
            <PromptInputFooter className="pr-2 pb-1.5">
              <div />
              <PromptInputSubmit
                className="rounded-full h-8 w-8 bg-linear-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                disabled={isLoading || isStreaming || !input.trim()}
                status={status}
              >
                <Send className="h-4 w-4" />
              </PromptInputSubmit>
            </PromptInputFooter>
          </PromptInput>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send
          </p>
        </div>
      </div>
    </>
  );
}
