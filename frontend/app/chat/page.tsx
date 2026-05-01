import { Suspense } from "react";
import { ChatInterface } from "@/components/ChatInterface";

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <section className="bg-gov-soft py-12">
          <div className="page-shell rounded-lg border border-gov-line bg-white p-6 text-gov-green">
            Loading chat...
          </div>
        </section>
      }
    >
      <ChatInterface />
    </Suspense>
  );
}
