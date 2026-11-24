import type { Metadata } from "next";
import { Moved } from "@/components/moved";
export const metadata: Metadata = { title: "Page moved", robots: { index: false, follow: true } };
export default function Page() { return <Moved to="/" />; }
