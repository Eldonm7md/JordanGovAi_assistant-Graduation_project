"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  Database,
  FileText,
  RefreshCw,
  Star,
  Upload,
  Users,
} from "lucide-react";
import { FeedbackItem, getFeedback, getHealth, HealthResult } from "@/lib/api";

const recentQuestions = [
  ["ما هي متطلبات تجديد جواز السفر؟", "Civil Status", "Arabic", "2 min ago"],
  ["How can I renew a vehicle license?", "Traffic", "English", "12 min ago"],
  ["هل أحتاج تصريح عمل جديد؟", "Labor", "Arabic", "24 min ago"],
  ["What documents are needed for social security?", "Social Security", "English", "41 min ago"],
];

const managedServices = [
  ["Civil Status and Passports", "دائرة الأحوال المدنية والجوازات", "Active", "42"],
  ["Traffic and Licensing", "إدارة السير والترخيص", "Active", "31"],
  ["Ministry of Labor", "وزارة العمل", "Draft", "18"],
  ["Social Security", "المؤسسة العامة للضمان الاجتماعي", "Active", "26"],
  ["Greater Amman Municipality", "أمانة عمان الكبرى", "Active", "21"],
];

const indexedDocuments = [
  ["jordan_services.txt", "Service requirements", "Indexed"],
  ["passport-renewal-guide.pdf", "Civil status", "Placeholder"],
  ["traffic-licensing-faq.pdf", "Traffic", "Placeholder"],
];

const fallbackReviews: FeedbackItem[] = [
  {
    id: "admin-review-1",
    name: "ليان",
    rating: 5,
    comment: "إجابة واضحة ومفيدة.",
    service_category: "Civil Status and Passports",
    created_at: "2026-04-12T08:00:00.000Z",
  },
  {
    id: "admin-review-2",
    name: "Omar",
    rating: 4,
    comment: "Good source display.",
    service_category: "Traffic and Licensing",
    created_at: "2026-04-14T10:30:00.000Z",
  },
];

function StatusDot({ status }: { status?: string }) {
  const label = status ?? "checking";
  const online =
    label === "online" ||
    label === "ready" ||
    label === "ok" ||
    label === "checking";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-xs font-black ${
        online ? "bg-gov-mint text-gov-green" : "bg-gov-red/10 text-gov-red"
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${online ? "bg-gov-teal" : "bg-gov-red"}`} />
      {label}
    </span>
  );
}

export function AdminDashboard() {
  const [health, setHealth] = useState<HealthResult | null>(null);
  const [reviews, setReviews] = useState<FeedbackItem[]>(fallbackReviews);

  useEffect(() => {
    getHealth()
      .then(setHealth)
      .catch(() =>
        setHealth({
          status: "offline",
          api: "offline",
          rag_status: "unknown",
          ollama_status: "unknown",
          vector_database: "chroma",
        }),
      );

    getFeedback()
      .then((items) => {
        if (items.length) {
          setReviews(items);
        }
      })
      .catch(() => undefined);
  }, []);

  const averageRating = useMemo(() => {
    if (!reviews.length) {
      return "0.0";
    }

    return (
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    ).toFixed(1);
  }, [reviews]);

  const overview = [
    ["Total questions", "1,248", "إجمالي الأسئلة", <Users key="users" size={22} />],
    ["Total reviews", String(reviews.length), "إجمالي التقييمات", <Star key="star" size={22} />],
    ["Average rating", averageRating, "متوسط الرضا", <BarChart3 key="chart" size={22} />],
    ["Indexed documents", "1", "وثائق مفهرسة", <Database key="db" size={22} />],
  ];

  return (
    <section className="bg-gov-soft py-10">
      <div className="page-shell">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-black text-gov-green">لوحة الإدارة</h1>
            <p className="mt-2 text-base leading-7 text-gov-black/64" dir="ltr">
              Monitor questions, reviews, services, indexed documents, and RAG readiness from one operational view.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-gov-line bg-white px-4 py-3 shadow-panel">
            <Activity size={18} className="text-gov-teal" />
            <span className="text-sm font-bold text-gov-black/70">System</span>
            <StatusDot status={health?.status ?? "checking"} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {overview.map(([title, value, label, icon]) => (
            <article key={String(title)} className="rounded-lg border border-gov-line bg-white p-5 shadow-panel">
              <div className="mb-4 flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-md bg-gov-mint text-gov-green">
                  {icon}
                </div>
                <span className="h-2 w-8 rounded-full bg-gov-red" />
              </div>
              <p className="text-sm font-bold text-gov-black/56">{label}</p>
              <p className="mt-2 text-3xl font-black text-gov-green" dir="ltr">
                {value}
              </p>
              <p className="mt-1 text-xs font-semibold text-gov-black/46" dir="ltr">
                {title}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[0.64fr_0.36fr]">
          <section className="rounded-lg border border-gov-line bg-white p-5 shadow-panel">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-black text-gov-green">أسئلة حديثة</h2>
              <span className="text-xs font-black text-gov-black/46" dir="ltr">
                Recent user questions
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gov-line text-right text-gov-black/52">
                    <th className="px-3 py-3 font-black">السؤال</th>
                    <th className="px-3 py-3 font-black">الخدمة</th>
                    <th className="px-3 py-3 font-black">اللغة</th>
                    <th className="px-3 py-3 font-black">الوقت</th>
                  </tr>
                </thead>
                <tbody>
                  {recentQuestions.map(([question, service, language, time]) => (
                    <tr key={question} className="border-b border-gov-line last:border-0">
                      <td
                        className="px-3 py-3 font-semibold text-gov-black"
                        dir={language === "English" ? "ltr" : "rtl"}
                      >
                        {question}
                      </td>
                      <td className="px-3 py-3 text-gov-black/62">{service}</td>
                      <td className="px-3 py-3 text-gov-black/62">{language}</td>
                      <td className="px-3 py-3 text-gov-black/48" dir="ltr">
                        {time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-lg border border-gov-line bg-white p-5 shadow-panel">
            <h2 className="text-xl font-black text-gov-green">حالة RAG</h2>
            <div className="mt-5 grid gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gov-black/62">Ollama</span>
                <StatusDot status={health?.ollama_status ?? "checking"} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gov-black/62">Vector database</span>
                <StatusDot status={health?.rag_status ?? "checking"} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gov-black/62">Last indexing</span>
                <span className="text-sm font-black text-gov-black/54">May 2026 placeholder</span>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <section className="rounded-lg border border-gov-line bg-white p-5 shadow-panel">
            <h2 className="text-xl font-black text-gov-green">إدارة التقييمات</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[580px] text-sm">
                <thead>
                  <tr className="border-b border-gov-line text-right text-gov-black/52">
                    <th className="px-3 py-3">الاسم</th>
                    <th className="px-3 py-3">الخدمة</th>
                    <th className="px-3 py-3">التقييم</th>
                    <th className="px-3 py-3">التعليق</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.slice(0, 5).map((review) => (
                    <tr key={review.id} className="border-b border-gov-line last:border-0">
                      <td className="px-3 py-3 font-bold">{review.name}</td>
                      <td className="px-3 py-3 text-gov-black/60">{review.service_category}</td>
                      <td className="px-3 py-3 text-gov-red" dir="ltr">
                        {review.rating}/5
                      </td>
                      <td className="max-w-[240px] px-3 py-3 text-gov-black/58" dir="auto">
                        {review.comment}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-lg border border-gov-line bg-white p-5 shadow-panel">
            <h2 className="text-xl font-black text-gov-green">إدارة الخدمات</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[580px] text-sm">
                <thead>
                  <tr className="border-b border-gov-line text-right text-gov-black/52">
                    <th className="py-3">الخدمة</th>
                    <th className="py-3">الاسم العربي</th>
                    <th className="py-3">الحالة</th>
                    <th className="py-3">الأسئلة</th>
                  </tr>
                </thead>
                <tbody>
                  {managedServices.map(([service, arabic, status, count]) => (
                    <tr key={service} className="border-b border-gov-line last:border-0">
                      <td className="py-3 font-bold" dir="ltr">
                        {service}
                      </td>
                      <td className="py-3 text-gov-black/60">{arabic}</td>
                      <td className="py-3">
                        <span className="rounded bg-gov-mint px-2 py-1 text-xs font-black text-gov-green">
                          {status}
                        </span>
                      </td>
                      <td className="py-3 text-gov-black/58" dir="ltr">
                        {count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[0.54fr_0.46fr]">
          <section className="rounded-lg border border-gov-line bg-white p-5 shadow-panel">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="text-xl font-black text-gov-green">قاعدة المعرفة</h2>
              <div className="flex gap-2">
                <button className="inline-flex items-center gap-2 rounded-md border border-gov-line px-3 py-2 text-sm font-bold text-gov-green hover:bg-gov-soft">
                  <Upload size={16} />
                  Upload Document
                </button>
                <button className="inline-flex items-center gap-2 rounded-md bg-gov-green px-3 py-2 text-sm font-bold text-white hover:bg-gov-emerald">
                  <RefreshCw size={16} />
                  Re-index
                </button>
              </div>
            </div>
            <div className="mt-4 grid gap-3">
              {indexedDocuments.map(([name, type, status]) => (
                <div key={name} className="flex items-center justify-between gap-3 rounded-md border border-gov-line px-3 py-3">
                  <span className="flex items-center gap-3 text-sm font-bold text-gov-black">
                    <FileText size={17} className="text-gov-green" />
                    {name}
                  </span>
                  <span className="text-xs font-semibold text-gov-black/52">{type}</span>
                  <span className="rounded bg-gov-soft px-2 py-1 text-xs font-black text-gov-green">
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-gov-line bg-white p-5 shadow-panel">
            <h2 className="text-xl font-black text-gov-green">التحليلات</h2>
            <div className="mt-5 grid gap-5">
              {[
                ["Civil Status and Passports", 78],
                ["Traffic and Licensing", 62],
                ["Ministry of Labor", 44],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-bold text-gov-black/70">{label}</span>
                    <span className="font-black text-gov-green" dir="ltr">
                      {value}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gov-soft">
                    <div className="metric-bar h-full rounded-full" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md bg-gov-soft p-4">
                  <p className="text-sm font-bold text-gov-black/58">Arabic usage</p>
                  <p className="mt-1 text-2xl font-black text-gov-green" dir="ltr">
                    72%
                  </p>
                </div>
                <div className="rounded-md bg-gov-soft p-4">
                  <p className="text-sm font-bold text-gov-black/58">English usage</p>
                  <p className="mt-1 text-2xl font-black text-gov-green" dir="ltr">
                    28%
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
