"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Mic, Send } from "lucide-react";
import { sendChatMessage } from "@/lib/api";
import { ChatMessage, MessageBubble } from "@/components/MessageBubble";

const starterMessages: Record<"ar" | "en", string> = {
  ar: "مرحباً، أنا مساعد JordanGov. اسألني عن خدمة حكومية أردنية وسأحاول الإجابة اعتماداً على قاعدة المعرفة والمصادر المتاحة.",
  en: "Hello, I am JordanGov AI. Ask me about a Jordanian government service and I will answer using the available knowledge base and sources.",
};

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function ChatInterface() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: starterMessages.ar,
      sources: ["backend/data/jordan_services.txt"],
    },
  ]);

  useEffect(() => {
    const service = searchParams.get("service");

    if (service && !input) {
      setInput(
        language === "ar"
          ? `أريد الاستفسار عن خدمة ${service}.`
          : `I want to ask about ${service}.`,
      );
    }
  }, [input, language, searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();

    if (!text || isLoading) {
      return;
    }

    setError("");
    setInput("");
    setIsLoading(true);
    setMessages((current) => [
      ...current,
      {
        id: createId(),
        role: "user",
        content: text,
      },
    ]);

    try {
      const result = await sendChatMessage(text);
      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          content:
            result.response ||
            (language === "ar"
              ? "لم يصل رد واضح من النموذج. يرجى إعادة صياغة السؤال."
              : "The model did not return a clear response. Please rephrase the question."),
          sources: result.sources,
        },
      ]);
    } catch (requestError) {
      const message =
        language === "ar"
          ? "تعذر الاتصال بالخادم المحلي. تأكد من تشغيل FastAPI و Ollama ثم حاول مرة أخرى."
          : "Could not reach the local backend. Make sure FastAPI and Ollama are running, then try again.";

      setError(message);
      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          content: message,
          isError: true,
        },
      ]);
      console.error(requestError);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="bg-gov-soft py-10">
      <div className="page-shell">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_0.28fr]">
          <div className="overflow-hidden rounded-lg border border-gov-line bg-white shadow-soft">
            <div className="flex flex-col gap-4 border-b border-gov-line bg-white px-5 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-black text-gov-green">محادثة JordanGov AI</h1>
                <p className="mt-1 text-sm text-gov-black/58" dir="ltr">
                  Source-aware chat connected to the local FastAPI backend
                </p>
              </div>

              <div className="inline-flex w-fit rounded-md border border-gov-line bg-gov-soft p-1">
                {(["ar", "en"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setLanguage(value)}
                    className={`rounded px-4 py-2 text-sm font-bold transition ${
                      language === value
                        ? "bg-gov-green text-white shadow-panel"
                        : "text-gov-black/62 hover:text-gov-green"
                    }`}
                  >
                    {value === "ar" ? "العربية" : "English"}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex h-[58vh] min-h-[440px] flex-col gap-4 overflow-y-auto bg-gradient-to-b from-white to-gov-soft px-5 py-6">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} language={language} />
              ))}

              {isLoading ? (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-3 rounded-lg border border-gov-line bg-white px-4 py-3 text-sm font-bold text-gov-green shadow-panel">
                    <Loader2 size={17} className="animate-spin" />
                    {language === "ar" ? "جاري توليد الإجابة..." : "Generating answer..."}
                  </div>
                </div>
              ) : null}
            </div>

            {error ? (
              <div className="border-t border-gov-red/20 bg-gov-red/5 px-5 py-3 text-sm font-semibold text-gov-red">
                {error}
              </div>
            ) : null}

            <form ref={formRef} onSubmit={handleSubmit} className="border-t border-gov-line bg-white p-4">
              <div className="flex items-end gap-3">
                <button
                  type="button"
                  disabled
                  title="Voice placeholder"
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-gov-line text-gov-black/38"
                  aria-label="Voice input placeholder"
                >
                  <Mic size={20} />
                </button>
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      formRef.current?.requestSubmit();
                    }
                  }}
                  dir={language === "ar" ? "rtl" : "ltr"}
                  rows={2}
                  placeholder={
                    language === "ar"
                      ? "اكتب سؤالك عن خدمة حكومية أردنية..."
                      : "Ask about a Jordanian government service..."
                  }
                  className="min-h-12 flex-1 resize-none rounded-md border border-gov-line bg-gov-soft px-4 py-3 text-sm leading-6 text-gov-black outline-none transition placeholder:text-gov-black/42 focus:border-gov-teal focus:bg-white"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-gov-green text-white shadow-panel transition hover:bg-gov-emerald disabled:cursor-not-allowed disabled:bg-gov-black/24"
                  aria-label="Send message"
                >
                  {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
              </div>
            </form>
          </div>

          <aside className="grid content-start gap-4">
            <div className="rounded-lg border border-gov-line bg-white p-5 shadow-panel">
              <h2 className="text-lg font-black text-gov-green">حالة التكامل</h2>
              <div className="mt-4 grid gap-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gov-black/62">Backend</span>
                  <span className="rounded bg-gov-mint px-2 py-1 font-bold text-gov-green">FastAPI</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gov-black/62">Model</span>
                  <span className="rounded bg-gov-mint px-2 py-1 font-bold text-gov-green">Gemma</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gov-black/62">Vector DB</span>
                  <span className="rounded bg-gov-mint px-2 py-1 font-bold text-gov-green">Chroma</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gov-line bg-white p-5 shadow-panel">
              <h2 className="text-lg font-black text-gov-green">أمثلة سريعة</h2>
              <div className="mt-4 grid gap-2">
                {[
                  "ما هي متطلبات تجديد جواز السفر؟",
                  "How do I renew a passport?",
                  "ما هي الوثائق المطلوبة للترخيص؟",
                ].map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => setInput(example)}
                    className="rounded-md border border-gov-line px-3 py-2 text-right text-sm font-semibold text-gov-black/68 transition hover:border-gov-teal hover:text-gov-green"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
