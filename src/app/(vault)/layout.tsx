import Protected from "~/components/Protected";
import BottomNav from "~/components/nav/vault/bottom";
import SideNav from "~/components/nav/vault/side";

export const metadata = {
  title: "Peersafe - Vault",
  description: "Your vault. Login to view.",
};

export default function VaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Protected>
      <div className="flex h-screen flex-col md:flex-row">
        <SideNav />
        <div className="flex-1 flex-col overflow-y-auto">{children}</div>
        <BottomNav />
      </div>
    </Protected>
  );
}
