import { notFound } from "next/navigation";
import AppViewer from "@/components/AppViewer";
import { APPS, getApp } from "@/config/apps";

export function generateStaticParams() {
  return APPS.map((app) => ({ id: app.id }));
}

export default async function AbrirAppPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const app = getApp(id);
  if (!app) notFound();

  return <AppViewer app={app} />;
}
