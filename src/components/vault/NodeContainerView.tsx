"use client";

export default function GridContainerView({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-4">
      {children}
    </div>
  );
}
