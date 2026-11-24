import type { Metadata } from "next";
import { Moved } from "@/components/moved";
import { projects } from "@/lib/content";
export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }
export const metadata: Metadata = { title: "Page moved", robots: { index: false, follow: true } };
export default function Page() { return <Moved to="/" />; }
