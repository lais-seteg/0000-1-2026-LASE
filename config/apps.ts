/**
 * Configuração dos 4 aplicativos do totem.
 *
 * Para definir um app:
 *  - id:   identificador usado no endereço (ex.: /abrir/fieldnote). Sem espaços/acentos.
 *  - name: nome exibido abaixo da logo
 *  - url:  endereço do aplicativo. Ele abre dentro do totem, em tela cheia,
 *          com o botão flutuante "⟵ Início" por cima.
 *          Enquanto for null, aparece a tela "Em breve".
 *  - logo: caminho da imagem dentro de /public (ex.: "/logos/fieldnote.png").
 *          Enquanto for null, aparece o espaço reservado com as dimensões.
 *
 * Tamanho das logos: 220 × 220 px (quadrada, PNG com fundo transparente),
 * exibida dentro de um anel circular de 280 px. Para ficar nítida, exporte em 440 × 440 px.
 */
export type TotemApp = {
  id: string;
  name: string;
  url: string | null;
  logo: string | null;
  /** Tamanho da logo em px dentro do anel (padrão 220). Ajuste fino por logo. */
  logoSize?: number;
  /** Desloca a logo na horizontal, em px (positivo = direita). Ajuste fino de centralização. */
  logoOffsetX?: number;
  /**
   * true  (padrão) = abre dentro do totem, com o botão "⟵ Início" por cima.
   * false = abre o site direto na tela inteira. Use quando o site bloqueia ser
   *         exibido dentro de outra página (X-Frame-Options / frame-ancestors).
   */
  embed?: boolean;
};

export const APPS: TotemApp[] = [
  {
    id: "fieldnote",
    name: "FieldNote",
    url: "https://field-note-one.vercel.app/",
    logo: "/logos/fieldnote.png",
    logoSize: 250,
    logoOffsetX: 13, // centraliza o círculo da logo (a seta à direita puxava o desenho para a esquerda)
  },
  {
    id: "gaia",
    name: "Gaia",
    url: "https://projeto-gaia-omega.vercel.app/",
    logo: "/logos/gaia.png",
    embed: false, // o site do Gaia bloqueia iframe (X-Frame-Options: DENY)
  },
  {
    id: "myesg",
    name: "MyEsg",
    url: "https://myesg.setegce.com/",
    logo: "/logos/esg-icon.png",
    logoSize: 210,
    embed: false, // o site do MyEsg bloqueia iframe (X-Frame-Options: SAMEORIGIN)
  },
  {
    id: "aura",
    name: "Aura",
    url: "https://ruido-seteg.hub.arcgis.com/",
    logo: "/logos/aura.png",
    logoSize: 260,
  },
];

export function getApp(id: string): TotemApp | undefined {
  return APPS.find((app) => app.id === id);
}
