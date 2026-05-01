"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import {
  FeedbackItem,
  FeedbackPayload,
  getFeedback,
  submitFeedback,
} from "@/lib/api";

const initialReviews: FeedbackItem[] = [
  {
    id: "mock-1",
    name: "ليان",
    rating: 5,
    comment: "التجربة واضحة وسريعة، خصوصاً عند السؤال عن الوثائق المطلوبة.",
    service_category: "Civil Status and Passports",
    created_at: "2026-04-12T08:00:00.000Z",
  },
  {
    id: "mock-2",
    name: "Omar",
    rating: 4,
    comment: "Good bilingual flow. Source display makes the answer feel trustworthy.",
    service_category: "Traffic and Licensing",
    created_at: "2026-04-14T10:30:00.000Z",
  },
  {
    id: "mock-3",
    name: "سارة",
    rating: 5,
    comment: "أعجبني أن النظام يوضح متى يحتاج الأمر إلى تحقق رسمي.",
    service_category: "Ministry of Labor",
    created_at: "2026-04-18T15:00:00.000Z",
  },
];

const categories = [
  "Civil Status and Passports",
  "Traffic and Licensing",
  "Ministry of Labor",
  "Social Security",
  "Ministry of Interior",
  "Telecommunications Regulatory Commission",
  "Greater Amman Municipality",
];

export function ReviewsSection() {
  const [reviews, setReviews] = useState<FeedbackItem[]>(initialReviews);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState<FeedbackPayload>({
    name: "",
    rating: 5,
    comment: "",
    service_category: categories[0],
  });

  useEffect(() => {
    getFeedback()
      .then((remoteReviews) => {
        if (remoteReviews.length) {
          setReviews((current) => [...remoteReviews, ...current]);
        }
      })
      .catch(() => {
        setStatus("تعمل التقييمات حالياً ببيانات مؤقتة داخل الواجهة.");
      });
  }, []);

  const metrics = useMemo(() => {
    const total = reviews.length;
    const average =
      total === 0
        ? 0
        : reviews.reduce((sum, review) => sum + review.rating, 0) / total;
    const helpful = total === 0 ? 0 : Math.round((reviews.filter((review) => review.rating >= 4).length / total) * 100);

    return {
      total,
      average: average.toFixed(1),
      helpful,
    };
  }, [reviews]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.comment.trim()) {
      setStatus("يرجى تعبئة الاسم والتعليق قبل الإرسال.");
      return;
    }

    try {
      const saved = await submitFeedback(form);
      setReviews((current) => [saved, ...current]);
      setStatus("تم استلام تقييمك بنجاح.");
    } catch {
      const localReview: FeedbackItem = {
        ...form,
        id: `local-${Date.now()}`,
        created_at: new Date().toISOString(),
      };
      setReviews((current) => [localReview, ...current]);
      setStatus("تم حفظ التقييم مؤقتاً في الواجهة.");
    }

    setForm({
      name: "",
      rating: 5,
      comment: "",
      service_category: categories[0],
    });
  }

  return (
    <section className="bg-gov-soft py-12">
      <div className="page-shell">
        <div className="mb-8 max-w-3xl">
          <h1 className="text-4xl font-black text-gov-green">التقييمات وردود الفعل</h1>
          <p className="mt-3 text-base leading-8 text-gov-black/68" dir="ltr">
            Share service feedback and help improve the clarity of JordanGov AI answers.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["متوسط التقييم", metrics.average, "Average rating"],
            ["عدد التقييمات", String(metrics.total), "Number of reviews"],
            ["إجابات مفيدة", `${metrics.helpful}%`, "Helpful answers"],
          ].map(([label, value, sub]) => (
            <div key={label} className="rounded-lg border border-gov-line bg-white p-5 shadow-panel">
              <p className="text-sm font-bold text-gov-black/56">{label}</p>
              <p className="mt-2 text-4xl font-black text-gov-green" dir="ltr">
                {value}
              </p>
              <p className="mt-1 text-xs font-semibold text-gov-black/48" dir="ltr">
                {sub}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.62fr_0.38fr]">
          <div className="grid gap-4">
            {reviews.map((review) => (
              <article key={review.id} className="rounded-lg border border-gov-line bg-white p-5 shadow-panel">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-black text-gov-black">{review.name}</h2>
                    <p className="mt-1 text-sm font-semibold text-gov-green" dir="ltr">
                      {review.service_category}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-gov-red" aria-label={`${review.rating} stars`}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={`${review.id}-${index}`}
                        size={17}
                        fill={index < review.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-gov-black/68" dir="auto">
                  {review.comment}
                </p>
              </article>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="rounded-lg border border-gov-line bg-white p-5 shadow-soft">
            <h2 className="text-2xl font-black text-gov-green">أضف تقييمك</h2>
            <p className="mt-1 text-sm font-semibold text-gov-black/54" dir="ltr">
              Add review
            </p>

            <label className="mt-5 block text-sm font-bold text-gov-black/72">
              الاسم / Name
              <input
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                className="mt-2 w-full rounded-md border border-gov-line bg-gov-soft px-3 py-3 text-sm outline-none focus:border-gov-teal focus:bg-white"
              />
            </label>

            <label className="mt-4 block text-sm font-bold text-gov-black/72">
              فئة الخدمة / Service category
              <select
                value={form.service_category}
                onChange={(event) =>
                  setForm((current) => ({ ...current, service_category: event.target.value }))
                }
                className="mt-2 w-full rounded-md border border-gov-line bg-gov-soft px-3 py-3 text-sm outline-none focus:border-gov-teal focus:bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <div className="mt-4">
              <p className="text-sm font-bold text-gov-black/72">التقييم / Rating</p>
              <div className="mt-2 flex gap-1 text-gov-red">
                {Array.from({ length: 5 }).map((_, index) => {
                  const rating = index + 1;
                  return (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setForm((current) => ({ ...current, rating }))}
                      className="grid h-9 w-9 place-items-center rounded-md hover:bg-gov-soft"
                      aria-label={`${rating} star rating`}
                    >
                      <Star size={21} fill={rating <= form.rating ? "currentColor" : "none"} />
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="mt-4 block text-sm font-bold text-gov-black/72">
              التعليق / Comment
              <textarea
                value={form.comment}
                onChange={(event) => setForm((current) => ({ ...current, comment: event.target.value }))}
                rows={5}
                className="mt-2 w-full resize-none rounded-md border border-gov-line bg-gov-soft px-3 py-3 text-sm leading-6 outline-none focus:border-gov-teal focus:bg-white"
              />
            </label>

            {status ? <p className="mt-4 text-sm font-semibold text-gov-green">{status}</p> : null}

            <button
              type="submit"
              className="mt-5 w-full rounded-md bg-gov-green px-4 py-3 text-sm font-black text-white shadow-panel transition hover:bg-gov-emerald"
            >
              إرسال التقييم
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
