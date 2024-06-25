"use client";

export default function NodeContainerView({
  children,
  isGridView,
}: {
  children: React.ReactNode;
  isGridView: boolean;
}) {
  return (
    <div
      className={
        isGridView
          ? "grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-4"
          : "flex flex-col gap-2"
      }
    >
      {children}
    </div>
  );
}
