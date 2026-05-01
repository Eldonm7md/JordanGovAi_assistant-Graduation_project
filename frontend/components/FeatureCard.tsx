import type { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  titleAr: string;
  titleEn: string;
  description: string;
};

export function FeatureCard({
  icon,
  titleAr,
  titleEn,
  description,
}: FeatureCardProps) {
  return (
    <article className="rounded-lg border border-gov-line bg-white p-5 shadow-panel transition hover:-translate-y-1 hover:shadow-soft">
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-md bg-gov-mint text-gov-green">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gov-black">{titleAr}</h3>
      <p className="mt-1 text-sm font-semibold text-gov-green" dir="ltr">
        {titleEn}
      </p>
      <p className="mt-3 text-sm leading-7 text-gov-black/64">{description}</p>
    </article>
  );
}
