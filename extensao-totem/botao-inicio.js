/*
 * Totem Seteg – Botão Início
 *
 * - Na tela do totem (página com <meta name="totem-home">): memoriza o endereço
 *   do totem como "Início". Funciona tanto local quanto publicado na Vercel.
 * - Em qualquer outro site (Gaia, Aura...): mostra o botão "⟵ Início" fixo
 *   no canto inferior esquerdo. Um toque volta para a tela inicial do totem.
 */
(() => {
  const PADRAO = "http://localhost:3001/"; // usado até o totem ser aberto uma vez
  const CHAVE = "totemHome";

  // 1) Estamos no próprio totem? Só memoriza o endereço e não mostra o botão.
  if (document.querySelector('meta[name="totem-home"]')) {
    chrome.storage.local.set({ [CHAVE]: location.origin + "/" });
    return;
  }

  // 2) Outro site: desenha o botão.
  const ID = "totem-seteg-inicio";
  if (document.getElementById(ID)) return;

  const host = document.createElement("div");
  host.id = ID;
  const shadow = host.attachShadow({ mode: "closed" }); // isola do CSS do site

  shadow.innerHTML = `
    <style>
      :host { all: initial; }
      a {
        position: fixed;
        left: 2.4vw;
        bottom: 2.4vw;
        z-index: 2147483647;
        display: inline-flex;
        align-items: center;
        gap: 0.8vw;
        padding: 1vw 2vw 1vw 1.6vw;
        border-radius: 99px;
        font: 600 1.8vw/1 "Segoe UI Variable Display", "Segoe UI", system-ui, -apple-system, Roboto, sans-serif;
        color: rgba(255, 255, 255, 0.95);
        text-decoration: none;
        background: rgba(10, 31, 74, 0.38);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.25);
        box-shadow: 0 0.6vw 1.6vw -0.6vw rgba(10, 31, 74, 0.35);
        opacity: 0.75;
        cursor: pointer;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        transition: transform 0.12s ease, opacity 0.2s ease, background 0.2s ease;
      }
      a:active { transform: scale(0.94); opacity: 1; background: rgba(29, 58, 122, 0.85); }
      span { font-size: 2vw; line-height: 1; }
    </style>
    <a href="${PADRAO}" aria-label="Voltar ao início do totem"><span aria-hidden="true">⟵</span>Início</a>
  `;

  const link = shadow.querySelector("a");
  chrome.storage.local.get(CHAVE, (dados) => {
    if (dados && dados[CHAVE]) link.href = dados[CHAVE];
  });
  link.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = link.href;
  });

  const fixar = () => {
    if (!document.documentElement.contains(host)) document.documentElement.appendChild(host);
  };
  fixar();
  // alguns sites recriam a página ao trocar de tela; recoloca o botão se sumir
  new MutationObserver(fixar).observe(document.documentElement, { childList: true });
})();
