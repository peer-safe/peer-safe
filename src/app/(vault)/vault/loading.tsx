import MaxWidth from "~/components/ui/max-width";
import { Spinner } from "~/components/ui/spinner";

export default function ChatSkeleton() {
  return (
    <main className="grow">
      <MaxWidth className="h-[calc(100vh-64.000px)] items-center py-8">
        <Spinner className="h-full grow" />
      </MaxWidth>
    </main>
  );
}
