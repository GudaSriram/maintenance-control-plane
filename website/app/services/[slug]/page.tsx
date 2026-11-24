import type { Metadata } from "next";
import { Moved } from "@/components/moved";
import { services } from "@/lib/content";
export function generateStaticParams() { return services.map((s) => ({ slug: s.slug })); }
export const metadata: Metadata = { title: "Page moved", robots: { index: false, follow: true } };
export default function Page() { return <Moved to="/" />; }
