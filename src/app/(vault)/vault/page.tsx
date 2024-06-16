import MaxWidth from "~/components/ui/max-width";
import VaultPage from "~/components/vaultpage/VaultPage";
import { serverOnly } from "~/server/queries";

export default async function Chat() {
  // fetch server-side data
  await serverOnly();
  
  return (
    <main>
      <MaxWidth>
        <VaultPage />
      </MaxWidth>
    </main>
  );
}
