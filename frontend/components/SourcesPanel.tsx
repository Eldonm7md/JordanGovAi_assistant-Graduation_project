import { FileText } from "lucide-react";

type SourcesPanelProps = {
  sources?: string[];
};

export function SourcesPanel({ sources = [] }: SourcesPanelProps) {
  if (!sources.length) {
    return null;
  }

  return (
    <div className="mt-4 border-t border-gov-line pt-3">
      <p className="mb-2 flex items-center gap-2 text-xs font-black uppercase text-gov-green" dir="ltr">
        <FileText size={14} />
        Sources
      </p>
      <ul className="grid gap-2 text-xs leading-6 text-gov-black/64">
        {sources.map((source) => (
          <li key={source} className="rounded-md bg-gov-soft px-3 py-2">
            {source}
          </li>
        ))}
      </ul>
    </div>
  );
}
