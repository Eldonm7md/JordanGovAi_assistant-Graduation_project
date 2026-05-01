import Link from "next/link";
import { ArrowLeft, MessageCircle, Search } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-[34%_center] lg:bg-left"
        style={{
          backgroundImage:
            "linear-gradient(270deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 40%, rgba(255,255,255,0.46) 70%, rgba(255,255,255,0.16) 100%), url('/images/jordangov-ai-hero.png')",
        }}
      />
      <div className="page-shell flex min-h-[74svh] items-center py-16 lg:py-20">
        <div className="max-w-3xl">
          <h1 className="text-balance text-3xl font-black leading-[1.18] text-gov-green md:text-6xl">
            مساعد الحكومة الأردنية الذكي
            <span className="mt-3 block text-2xl font-black text-gov-black md:text-5xl" dir="ltr">
              JordanGov AI Assistant
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-gov-black/72 md:text-xl md:leading-9">
            إجابات رسمية التوجه، مدعومة بالمصادر، ومصممة لمساعدة المواطنين
            والمقيمين على فهم الخدمات الحكومية الأردنية بسرعة وثقة.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-gov-black/58" dir="ltr">
            Arabic-first AI guidance for Jordanian public services, with English support and source-aware RAG answers.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/chat"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gov-green px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-gov-emerald"
            >
              <MessageCircle size={18} />
              Start Chat
              <span className="text-white/72">اسأل الآن</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-gov-green/20 bg-white px-5 py-3 text-sm font-bold text-gov-green shadow-panel transition hover:border-gov-green/40 hover:bg-gov-soft"
            >
              <Search size={18} />
              Explore Services
              <ArrowLeft size={17} />
            </Link>
          </div>

          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              ["RAG", "بحث في قاعدة المعرفة"],
              ["Gemma", "تشغيل محلي"],
              ["Chroma", "مصادر قابلة للتتبع"],
            ].map(([label, value]) => (
              <div key={label} className="border-r-2 border-gov-teal bg-white/74 px-4 py-3 shadow-panel backdrop-blur">
                <p className="text-sm font-black text-gov-green" dir="ltr">
                  {label}
                </p>
                <p className="mt-1 text-xs font-semibold text-gov-black/62">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
