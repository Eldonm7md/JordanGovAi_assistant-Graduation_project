import { Bot, Database, FileText, MessageSquare, Search } from "lucide-react";

const steps = [
  {
    title: "سؤال المستخدم",
    subtitle: "User question",
    icon: <MessageSquare size={22} />,
  },
  {
    title: "بحث RAG",
    subtitle: "Knowledge retrieval",
    icon: <Search size={22} />,
  },
  {
    title: "إجابة Gemma",
    subtitle: "Local LLM answer",
    icon: <Bot size={22} />,
  },
  {
    title: "المصادر",
    subtitle: "Source references",
    icon: <FileText size={22} />,
  },
];

export function WorkflowSection() {
  return (
    <section className="bg-gov-green py-16 text-white">
      <div className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-black leading-tight md:text-4xl">
              كيف يعمل المساعد؟
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-white/72">
              يحوّل السؤال إلى بحث في قاعدة المعرفة، ثم يرسل السياق المناسب إلى
              Gemma لإنتاج إجابة واضحة مع المصادر المستخدمة.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="relative rounded-lg border border-white/14 bg-white/8 p-4">
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-md bg-white text-gov-green">
                  {step.icon}
                </div>
                <p className="font-bold">{step.title}</p>
                <p className="mt-1 text-xs font-semibold text-white/58" dir="ltr">
                  {step.subtitle}
                </p>
                {index === 1 ? (
                  <Database className="absolute left-4 top-4 text-gov-teal/60" size={18} />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
