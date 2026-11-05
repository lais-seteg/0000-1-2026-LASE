import Image from "next/image";
import Link from "next/link";
import type { TotemApp } from "@/config/apps";

export default function AppButton({ app, index }: { app: TotemApp; index: number }) {
  return (
    <Link
      href={app.url && app.embed === false ? app.url : `/abrir/${app.id}`}
      className="app-card"
      aria-label={`Abrir ${app.name}`}
      style={{ "--i": index } as React.CSSProperties}
    >
      <div className="app-ring">
        <div
          className="app-logo"
          style={{
            ...(app.logoSize ? { width: app.logoSize, height: app.logoSize } : {}),
            ...(app.logoOffsetX ? { transform: `translateX(${app.logoOffsetX}px)` } : {}),
          }}
        >
          {app.logo ? (
            <Image src={app.logo} alt={app.name} width={440} height={440} />
          ) : (
            <div className="logo-placeholder">
              <span className="ph-title">Logo</span>
              <span className="ph-size">220 × 220 px</span>
            </div>
          )}
        </div>
      </div>

      <span className="app-cta">
        Acessar <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
