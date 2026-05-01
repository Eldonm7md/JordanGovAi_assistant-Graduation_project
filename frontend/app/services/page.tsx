import {
  Briefcase,
  Building2,
  Car,
  HeartHandshake,
  Home,
  Landmark,
  RadioTower,
} from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";

const services = [
  {
    icon: <Home size={24} />,
    titleAr: "الأحوال المدنية والجوازات",
    titleEn: "Civil Status and Passports",
    description: "إرشاد حول جوازات السفر، الهوية الشخصية، الوثائق المدنية، والمتطلبات الأساسية.",
  },
  {
    icon: <Car size={24} />,
    titleAr: "السير والترخيص",
    titleEn: "Traffic and Licensing",
    description: "أسئلة حول ترخيص المركبات، رخص القيادة، المخالفات، والإجراءات المرورية.",
  },
  {
    icon: <Briefcase size={24} />,
    titleAr: "وزارة العمل",
    titleEn: "Ministry of Labor",
    description: "معلومات إرشادية حول تصاريح العمل، حقوق العاملين، والإجراءات الخاصة بالعمل.",
  },
  {
    icon: <HeartHandshake size={24} />,
    titleAr: "الضمان الاجتماعي",
    titleEn: "Social Security",
    description: "مساعدة أولية في فهم الاشتراكات، المنافع، التأمينات، والخدمات الإلكترونية.",
  },
  {
    icon: <Landmark size={24} />,
    titleAr: "وزارة الداخلية",
    titleEn: "Ministry of Interior",
    description: "إرشاد عام للخدمات والمعاملات المرتبطة بالإقامة والتصاريح والإجراءات الرسمية.",
  },
  {
    icon: <RadioTower size={24} />,
    titleAr: "هيئة تنظيم قطاع الاتصالات",
    titleEn: "Telecommunications Regulatory Commission",
    description: "أسئلة حول شكاوى الاتصالات، الخدمات الرقمية، وتنظيم القطاع.",
  },
  {
    icon: <Building2 size={24} />,
    titleAr: "أمانة عمان الكبرى",
    titleEn: "Greater Amman Municipality",
    description: "إرشاد حول الخدمات البلدية، الرخص المهنية، المخالفات، وخدمات المدينة.",
  },
];

export default function ServicesPage() {
  return (
    <section className="bg-white py-12">
      <div className="page-shell">
        <div className="mb-8 max-w-3xl">
          <h1 className="text-4xl font-black text-gov-green">الخدمات الحكومية</h1>
          <p className="mt-3 text-base leading-8 text-gov-black/66" dir="ltr">
            Browse supported public-service categories and start a source-aware question directly from each card.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.titleEn} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
