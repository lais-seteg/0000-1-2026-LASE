"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { TotemApp } from "@/config/apps";

/** Tempo máximo mostrando "Abrindo…" caso o site não avise que carregou. */
const LOADING_TIMEOUT_MS = 10_000;

/**
 * Abre o aplicativo dentro do totem, em tela cheia, com o botão flutuante
 * "⟵ Início" sempre visível por cima.
 */
export default function AppViewer({ app }: { app: TotemApp }) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  // O iframe só é criado depois que o React assumiu a página; assim o aviso
  // de "carregou" (onLoad) nunca é perdido.
  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setLoading(false), LOADING_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="viewer" onContextMenu={(e) => e.preventDefault()}>
      {app.url ? (
        <>
          {mounted && <iframe
            className="viewer-frame"
            src={app.url}
            title={app.name}
            onLoad={() => setLoading(false)}
            allow="camera; microphone; geolocation; fullscreen; clipboard-write"
          />}
          {loading && (
            <div className="viewer-loading">
              <div className="spinner" aria-hidden />
              <span>Abrindo {app.name}…</span>
            </div>
          )}
        </>
      ) : (
        <div className="viewer-soon">
          <span className="soon-name">{app.name}</span>
          <span className="soon-text">Em breve disponível neste totem</span>
        </div>
      )}

      <Link href="/" className="home-button" aria-label="Voltar ao início">
        <span className="home-arrow" aria-hidden>⟵</span>
        Início
      </Link>
    </div>
  );
}
