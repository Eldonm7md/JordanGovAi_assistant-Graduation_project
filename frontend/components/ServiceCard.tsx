import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

type ServiceCardProps = {
  icon: ReactNode;
  titleAr: string;
  titleEn: string;
  description: string;
};

export function ServiceCard({
  icon,
  titleAr,
  titleEn,
  description,
}: ServiceCardProps) {
  const query = encodeURIComponent(titleEn);

  return (
    <article className="flex h-full flex-col rounded-lg border border-gov-line bg-white p-5 shadow-panel transition hover:-translate-y-1 hover:shadow-soft">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-md bg-gov-mint text-gov-green">
          {icon}
        </div>
        <span className="h-2 w-8 rounded-full bg-gov-red" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-black text-gov-black">{titleAr}</h3>
      <p className="mt-1 text-sm font-semibold text-gov-green" dir="ltr">
        {titleEn}
      </p>
      <p className="mt-4 flex-1 text-sm leading-7 text-gov-black/64">{description}</p>
      <Link
        href={`/chat?service=${query}`}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-md border border-gov-green/18 px-4 py-2.5 text-sm font-bold text-gov-green transition hover:bg-gov-mint"
      >
        اسأل عن هذه الخدمة
        <ArrowLeft size={16} />
      </Link>
    </article>
  );
}
