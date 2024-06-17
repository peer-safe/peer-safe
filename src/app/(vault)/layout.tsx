import BottomNav from "~/components/nav/bottom";

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
    <>
      {children}
      <BottomNav />
    </>
  );
}
