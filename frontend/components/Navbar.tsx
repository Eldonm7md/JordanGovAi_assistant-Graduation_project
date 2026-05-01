"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", labelAr: "الرئيسية", labelEn: "Home" },
  { href: "/chat", labelAr: "المحادثة", labelEn: "Chat" },
  { href: "/services", labelAr: "الخدمات", labelEn: "Services" },
  { href: "/reviews", labelAr: "التقييمات", labelEn: "Reviews" },
  { href: "/admin", labelAr: "الإدارة", labelEn: "Admin" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gov-line bg-white/94 backdrop-blur-xl">
      <div className="page-shell flex h-20 items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3" aria-label="JordanGov AI Assistant">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-gov-green text-white shadow-panel">
            <Bot size={24} strokeWidth={2.2} />
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-bold text-gov-green">
              مساعد الحكومة الأردنية
            </span>
            <span className="block text-xs font-semibold uppercase text-gov-black/62" dir="ltr">
              JordanGov AI
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-gov-mint text-gov-green"
                    : "text-gov-black/68 hover:bg-gov-soft hover:text-gov-green"
                }`}
              >
                <span>{item.labelAr}</span>
                <span className="mr-1 text-[11px] text-current/55" dir="ltr">
                  {item.labelEn}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 rounded-md bg-gov-green px-4 py-2.5 text-sm font-bold text-white shadow-panel transition hover:bg-gov-emerald"
          >
            <MessageCircle size={17} />
            ابدأ المحادثة
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-md border border-gov-line text-gov-green lg:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-gov-line bg-white lg:hidden">
          <div className="page-shell grid gap-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-bold text-gov-black/75 hover:bg-gov-soft"
              >
                {item.labelAr}
                <span className="mr-2 text-xs text-gov-black/48" dir="ltr">
                  {item.labelEn}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
