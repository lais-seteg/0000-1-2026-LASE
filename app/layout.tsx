import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Totem Seteg",
  description: "Totem de acesso aos aplicativos Seteg",
  // marca esta página como "Início" para a extensão do botão (pasta extensao-totem)
  other: { "totem-home": "1" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        {/* aplica o tema salvo antes de desenhar a página (evita piscar claro→escuro) */}
        <Script id="totem-theme" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem("totem-theme");if(t==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`}
        </Script>
        {children}
      </body>
    </html>
  );
}
