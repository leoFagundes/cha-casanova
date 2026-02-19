"use client";

import { useEffect, useState } from "react";

export interface ToastData {
  id: number;
  message: string;
  type: "success" | "error";
}

export default function Toast({
  toast,
  onRemove,
}: {
  toast: ToastData;
  onRemove: (id: number) => void;
}) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 2700);
    const t2 = setTimeout(() => onRemove(toast.id), 3100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [toast.id, onRemove]);

  return (
    <div
      className={`flex items-center gap-3 bg-brand-dark text-rose font-semibold backdrop-blur-[4px] text-[0.82rem] tracking-wide px-5 py-3.5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] min-w-[240px] transition-all duration-300 ${
        leaving
          ? "opacity-0 translate-y-2 scale-95"
          : "opacity-100 translate-y-0 scale-100"
      }`}
      style={{ animation: "toastIn .35s ease" }}
    >
      <span
        className={`w-2 h-2 rounded-full shrink-0 ${
          toast.type === "success" ? "bg-[#7fc47f]" : "bg-rose"
        }`}
      />
      {toast.message}
    </div>
  );
}
