import Link from "next/link";
import { Bot, Code2, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gov-line bg-gov-black text-white">
      <div className="page-shell grid gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-gov-green">
              <Bot size={22} />
            </span>
            <div>
              <p className="font-bold">JordanGov AI Assistant</p>
              <p className="text-sm text-white/62">مساعد حكومي ذكي للخدمات العامة في الأردن</p>
            </div>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/68">
            منصة إرشاد رقمية تعتمد على البحث المعزز بالمصادر لتقديم إجابات واضحة
            حول الخدمات الحكومية الأردنية باللغتين العربية والإنجليزية.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold">الصفحات</h2>
          <div className="grid gap-2 text-sm text-white/68">
            <Link href="/chat">المحادثة</Link>
            <Link href="/services">الخدمات</Link>
            <Link href="/reviews">التقييمات</Link>
            <Link href="/admin">لوحة الإدارة</Link>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold">جاهز للتطوير</h2>
          <div className="grid gap-3 text-sm text-white/68">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={16} className="text-gov-teal" />
              API-ready feedback and health endpoints
            </span>
            <span className="inline-flex items-center gap-2">
              <Code2 size={16} className="text-gov-teal" />
              Local Gemma + Chroma RAG workflow
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
