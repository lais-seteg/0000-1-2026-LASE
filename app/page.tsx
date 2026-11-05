import Image from "next/image";
import TotemStage from "@/components/TotemStage";
import AppButton from "@/components/AppButton";
import Clock from "@/components/Clock";
import { APPS } from "@/config/apps";

export default function Home() {
  return (
    <TotemStage>
      <div className="bg-grid" aria-hidden />
      <div className="bg-orb orb-1" aria-hidden />
      <div className="bg-orb orb-2" aria-hidden />

      <main className="totem">
        <Clock />

        <header className="totem-header">
          <div className="logo-halo" aria-hidden />
          <Image
            src="/seteg-logo.png"
            alt="Seteg"
            width={2000}
            height={900}
            priority
            className="brand-logo"
          />
          <div className="divider" aria-hidden />
          <h1 className="welcome">Bem-vindo!</h1>
          <p className="subtitle">Selecione um aplicativo para começar</p>
        </header>

        <section className="app-grid">
          {APPS.map((app, i) => (
            <AppButton key={app.id} app={app} index={i} />
          ))}
        </section>

        <footer className="totem-footer">
          <span className="pulse-dot" aria-hidden />
          Toque em um aplicativo para acessar
        </footer>
      </main>
    </TotemStage>
  );
}
