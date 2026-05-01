import Link from "next/link";
import {
  Bot,
  FileCheck2,
  Languages,
  Landmark,
  MessageCircle,
  Search,
  ShieldCheck,
} from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { HeroSection } from "@/components/HeroSection";
import { WorkflowSection } from "@/components/WorkflowSection";

const features = [
  {
    icon: <MessageCircle size={22} />,
    titleAr: "محادثة ذكية",
    titleEn: "AI Chat",
    description: "واجهة محادثة واضحة تساعد المستخدم على صياغة الأسئلة والحصول على إجابات منظمة.",
  },
  {
    icon: <Search size={22} />,
    titleAr: "إجابات مبنية على RAG",
    titleEn: "RAG-based official answers",
    description: "البحث في قاعدة معرفة محلية قبل توليد الرد، لتقليل التخمين وتحسين الصلة بالخدمة.",
  },
  {
    icon: <Languages size={22} />,
    titleAr: "دعم عربي وإنجليزي",
    titleEn: "Arabic / English support",
    description: "تصميم عربي أولاً مع تجربة إنجليزية واضحة للمواطنين والمقيمين والطلاب.",
  },
  {
    icon: <FileCheck2 size={22} />,
    titleAr: "إظهار المصادر",
    titleEn: "Source-based responses",
    description: "عرض المراجع المستخدمة تحت الإجابة عندما يوفّرها مسار RAG في الخادم.",
  },
  {
    icon: <Landmark size={22} />,
    titleAr: "إرشاد للخدمات الحكومية",
    titleEn: "Government service guidance",
    description: "بطاقات خدمات ومداخل مباشرة للأسئلة المتكررة حول الجهات الحكومية الأردنية.",
  },
];

const entities = [
  "دائرة الأحوال المدنية والجوازات",
  "إدارة السير والترخيص",
  "وزارة العمل",
  "المؤسسة العامة للضمان الاجتماعي",
  "وزارة الداخلية",
  "هيئة تنظيم قطاع الاتصالات",
  "أمانة عمان الكبرى",
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="bg-white py-16">
        <div className="page-shell">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-black text-gov-green">قدرات المنتج</h2>
              <p className="mt-3 max-w-2xl text-base leading-8 text-gov-black/64">
                تجربة متكاملة تجمع المحادثة، البحث المعزز، ودعم المصادر ضمن واجهة
                مناسبة لمنتج حكومي حديث.
              </p>
            </div>
            <Bot className="hidden text-gov-teal md:block" size={42} />
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {features.map((feature) => (
              <FeatureCard key={feature.titleEn} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <WorkflowSection />

      <section className="bg-white py-16">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          <div>
            <h2 className="text-3xl font-black text-gov-green">جهات حكومية مدعومة</h2>
            <p className="mt-4 text-base leading-8 text-gov-black/64">
              تم تجهيز الواجهة لتوسيع قاعدة المعرفة تدريجياً وربط كل خدمة بمصادرها
              الرسمية وبياناتها الإدارية لاحقاً.
            </p>
            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-gov-green px-4 py-3 text-sm font-black text-white shadow-panel hover:bg-gov-emerald"
            >
              استعرض الخدمات
              <Landmark size={17} />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {entities.map((entity) => (
              <div key={entity} className="flex items-center gap-3 rounded-lg border border-gov-line bg-gov-soft p-4">
                <ShieldCheck size={20} className="text-gov-green" />
                <span className="text-sm font-bold text-gov-black/72">{entity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-gov-line bg-gov-soft py-16">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.45fr_0.55fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-black text-gov-green">آراء المستخدمين</h2>
            <p className="mt-4 text-base leading-8 text-gov-black/64">
              صفحة التقييمات جاهزة لاستقبال الملاحظات الآن، ويمكن ربطها لاحقاً
              بقاعدة بيانات PostgreSQL عند بدء مرحلة التخزين الدائم.
            </p>
            <Link
              href="/reviews"
              className="mt-6 inline-flex items-center gap-2 rounded-md border border-gov-green/20 bg-white px-4 py-3 text-sm font-black text-gov-green shadow-panel hover:bg-gov-mint"
            >
              افتح التقييمات
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["ليان", "التجربة واضحة وسريعة، والمصادر تجعل الرد أكثر ثقة."],
              ["Omar", "The bilingual interface already feels like a real public-service product."],
            ].map(([name, quote]) => (
              <article key={name} className="rounded-lg border border-gov-line bg-white p-5 shadow-panel">
                <p className="text-sm leading-7 text-gov-black/68">{quote}</p>
                <p className="mt-4 font-black text-gov-green">{name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
