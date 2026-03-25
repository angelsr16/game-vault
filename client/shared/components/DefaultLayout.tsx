"use client";

import { ReactNode } from "react";

export const DefaultLayout = ({
  opacity,
  children,
}: {
  opacity?: number;
  children: ReactNode;
}) => {
  return (
    <div className="w-full min-h-screen relative">
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 bg-cover bg-center`}
          style={{
            backgroundImage: "url('/background.png')",
            opacity: opacity ? opacity / 100 : 0.9,
          }}
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/90" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(108,99,255,0.25),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(0,212,170,0.18),transparent_40%)]" />

        <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};
