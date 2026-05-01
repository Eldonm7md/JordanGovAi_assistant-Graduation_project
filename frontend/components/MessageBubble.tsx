import { Bot, UserRound } from "lucide-react";
import { SourcesPanel } from "@/components/SourcesPanel";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  isError?: boolean;
};

type MessageBubbleProps = {
  message: ChatMessage;
  language: "ar" | "en";
};

export function MessageBubble({ message, language }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[86%] rounded-lg px-4 py-3 shadow-panel ${
          isUser
            ? "bg-gov-green text-white"
            : message.isError
              ? "border border-gov-red/30 bg-white text-gov-red"
              : "border border-gov-line bg-white text-gov-black"
        }`}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="mb-2 flex items-center gap-2 text-xs font-bold opacity-75">
          {isUser ? <UserRound size={14} /> : <Bot size={14} />}
          {isUser ? "أنت" : "JordanGov AI"}
        </div>
        <p className="whitespace-pre-wrap text-sm leading-7">{message.content}</p>
        {!isUser ? <SourcesPanel sources={message.sources} /> : null}
      </div>
    </div>
  );
}
