import { MouseEventHandler } from "react";

export const singleMousePosSetter: MouseEventHandler<HTMLDivElement> = (
  event
) => {
  const { currentTarget: target } = event;
  if (!target) return;
  const rect = target.getBoundingClientRect(),
    x = event.clientX - rect.left,
    y = event.clientY - rect.top;
  target.style.setProperty("--mouse-x", `${x}px`);
  target.style.setProperty("--mouse-y", `${y}px`);
};
