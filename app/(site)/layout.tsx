import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { redirect } from "next/navigation";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  redirect("/pt-br");
}
