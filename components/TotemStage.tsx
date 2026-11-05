"use client";

import { useEffect, useState } from "react";

/**
 * Palco fixo de 1080 × 1920 px — proporção do totem 53 × 94 cm (≈ 9:16, tela Full HD em pé).
 * O palco é escalado para caber na janela, então o layout fica idêntico
 * no navegador de desenvolvimento e na tela real do totem.
 */
export const STAGE_W = 1080;
export const STAGE_H = 1920;

export default function TotemStage({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fit = () =>
      setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div className="viewport" onContextMenu={(e) => e.preventDefault()}>
      <div
        className="stage"
        style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
