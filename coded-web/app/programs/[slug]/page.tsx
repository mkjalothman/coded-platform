import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Tables } from "@/lib/supabase/types";
import { bootcamps } from "@/data/programs";
import ProgramDetail from "./ProgramDetail";

async function getProgram(slug: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (url && key) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!error && data) {
        const row = data as Tables<"programs">;
        return {
          name: row.name,
          slug: row.slug,
          description: row.description,
          accent_color: row.accent_color,
        };
      }
    } catch (err) {
      console.error("[programs] Supabase fetch failed:", err);
    }
  }

  const fallback = bootcamps.find((b) => b.slug === slug);
  if (fallback) {
    return {
      name: fallback.title,
      slug: fallback.slug,
      description: fallback.desc,
      accent_color: fallback.color,
    };
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgram(slug);

  if (!program) {
    return { title: "Program Not Found | CODED" };
  }

  return {
    title: `${program.name} Bootcamp | CODED`,
    description: program.description,
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = await getProgram(slug);

  if (!program) {
    notFound();
  }

  return <ProgramDetail program={program} />;
}
